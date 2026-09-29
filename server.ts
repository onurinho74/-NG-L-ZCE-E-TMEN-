import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Evaluator endpoint for LinguaAcademy AI
  app.post('/api/evaluate', async (req, res) => {
    try {
      const user_message = req.body.user_message || req.body.userMessage;
      const current_day = req.body.current_day || req.body.dayNumber || 1;
      const day_title = req.body.day_title || req.body.titleTr || 'Kendini Tanıtma & Selamlaşma';
      const target_words = req.body.target_words || req.body.targetWords || [];
      const expected_pattern = req.body.expected_pattern || req.body.expectedPattern || 'Hello, my name is...';
      const step_context = req.body.step_context || req.body.challengeInstruction || '';
      const conversation_history = req.body.conversation_history || req.body.conversationHistory || [];

      if (!user_message || typeof user_message !== 'string') {
        return res.status(400).json({
          error: 'user_message is required',
        });
      }

      // Format words list
      const wordsFormatted = Array.isArray(target_words)
        ? target_words
            .map((w: any) => (typeof w === 'string' ? w : `${w.word} (${w.turkish || ''})`))
            .join(', ')
        : String(target_words);

      // System instruction as required by the prompt
      const systemInstruction = `Sen, "EnglishMaster AI" (veya "LinguaAcademy AI") isimli 4 haftalık interaktif İngilizce öğrenme uygulamasının arkasında çalışan, JSON formatında kararlı çıktılar üreten bir dil öğretmeni motorusun.

Giriş Verisi Yapısı:
Sana kullanıcıdan gelen mesaj ve uygulamanın o anki durum değişkenleri (Mevcut Gün, Günün Kelimeleri, Beklenen Kalıp) gönderilecektir.

Çıktı Kuralları:
Gelen girdiyi analiz et ve kullanıcının arayüzde hiçbir hata almaması için SADECE aşağıdaki şemaya sahip bir JSON nesnesi döndür. Açıklamaların her zaman Türkçe olmalıdır.

{
  "is_correct": true,
  "score_earned": 50,
  "feedback_message": "Harika bir deneme! Cümlen gramer olarak tamamen doğru. 🎉",
  "next_prompt": "Let's move to the next step. Can you say 'I am ready'?"
}

Öğretmenlik ve Değerlendirme Kuralları:
1. is_correct: Kullanıcının cevabı beklenen kalıbı ve genel İngilizce dilbilgisini makul ölçüde doğru yansıtıyorsa true; ciddi gramer bozukluğu, anlamsızlık veya sorudan tamamen kopukluk varsa false olmalıdır.
2. score_earned: Başarı derecesine göre 10 ile 100 arasında bir tam sayı puanı ver:
   - 90-100: Mükemmel, hatasız, günün kelimelerini ve kalıbını ustaca kullanmış.
   - 70-85: Çok iyi, ufak bir yazım veya edat hatası olabilir ama anlam tam.
   - 45-65: Anlaşılır ancak gramer veya kelime kullanımında açık düzeltmeler gerekiyor.
   - 10-40: Çok eksik, yanlış veya Türkçe yazılmış cevaplar.
3. feedback_message: Kesinlikle TÜRKÇE olmalı. Samimi, teşvik edici, pedagojik olmalı. Varsa yapılan hatanın doğrusunu net bir örnekle göster (Örn: "'I go to yesterday' yerine geçmiş zaman olduğu için 'I went yesterday' demeliyiz").
4. next_prompt: Kesinlikle İNGİLİZCE olmalı. Kullanıcıyı bir sonraki göreve yönlendirmeli veya konuşmayı akıcı bir şekilde devam ettirecek doğal bir soru sormalı.`;

      const promptContent = `DURUM DEĞİŞKENLERİ:
- Mevcut Gün: ${current_day} (${day_title})
- Günün Kelimeleri: ${wordsFormatted || 'Belirtilmedi'}
- Beklenen Kalıp: ${expected_pattern}
- Adım / Alıştırma Bağlamı: ${step_context || 'Genel Konuşma Pratiği'}

KULLANICININ MESAJI:
"${user_message}"

${conversation_history.length > 0 ? `SON SOHBET GEÇMİŞİ:\n${JSON.stringify(conversation_history.slice(-3))}` : ''}

Lütfen bu girdiyi incele ve kurallara uygun olarak SADECE belirtilen JSON nesnesini üret.`;

      // Call Gemini API server-side with fallback
      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptContent,
          config: {
            systemInstruction,
            temperature: 0.3,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                is_correct: {
                  type: Type.BOOLEAN,
                  description: "Kullanıcının cevabının kabul edilebilir ve doğru olup olmadığı",
                },
                score_earned: {
                  type: Type.INTEGER,
                  description: "Kazanılan puan (10-100 arası)",
                },
                feedback_message: {
                  type: Type.STRING,
                  description: "Kullanıcıya Türkçe geri bildirim ve öğretici açıklama",
                },
                next_prompt: {
                  type: Type.STRING,
                  description: "İngilizce olarak bir sonraki pratik sorusu veya devam yönergesi",
                },
              },
              required: ['is_correct', 'score_earned', 'feedback_message', 'next_prompt'],
            },
          },
        });
      } catch (err: any) {
        console.warn('gemini-3.8-flash unavailable, trying gemini-3.1-flash-lite:', err?.message || err);
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: promptContent,
          config: {
            systemInstruction,
            temperature: 0.3,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                is_correct: {
                  type: Type.BOOLEAN,
                  description: "Kullanıcının cevabının kabul edilebilir ve doğru olup olmadığı",
                },
                score_earned: {
                  type: Type.INTEGER,
                  description: "Kazanılan puan (10-100 arası)",
                },
                feedback_message: {
                  type: Type.STRING,
                  description: "Kullanıcıya Türkçe geri bildirim ve öğretici açıklama",
                },
                next_prompt: {
                  type: Type.STRING,
                  description: "İngilizce olarak bir sonraki pratik sorusu veya devam yönergesi",
                },
              },
              required: ['is_correct', 'score_earned', 'feedback_message', 'next_prompt'],
            },
          },
        });
      }

      const responseText = response.text || '';
      let parsedOutput;
      try {
        parsedOutput = JSON.parse(responseText.trim());
      } catch (e) {
        // Fallback parsing if JSON has extra wrapper
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedOutput = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('JSON parsing failed');
        }
      }

      // Guarantee clean output matching contract
      const result = {
        is_correct: Boolean(parsedOutput.is_correct),
        score_earned: Number.isInteger(parsedOutput.score_earned)
          ? Math.max(10, Math.min(100, parsedOutput.score_earned))
          : 50,
        feedback_message:
          parsedOutput.feedback_message ||
          'Harika bir deneme! Cümlen gramer olarak tamamen doğru. 🎉',
        next_prompt:
          parsedOutput.next_prompt ||
          "Great job! Let's continue with the next sentence.",
      };

      return res.json(result);
    } catch (error: any) {
      console.error('Error during teacher evaluation:', error);

      // Graceful pedagogical fallback so user never gets broken UI
      const userText = (req.body?.user_message || '').trim().toLowerCase();
      const hasLength = userText.length > 5;
      const isEnglish = /[a-z]/i.test(userText);

      return res.json({
        is_correct: hasLength && isEnglish,
        score_earned: hasLength ? 60 : 35,
        feedback_message: hasLength
          ? 'Tebrikler! Pratiğin başarıyla kaydedildi. Cümle kurma çaban çok değerli. 🎉'
          : 'Lütfen günün kalıbını kullanarak tam bir İngilizce cümle kurmayı deneyin.',
        next_prompt: "Can you elaborate a bit more on that using today's target words?",
      });
    }
  });

  // Text-to-Speech endpoint using gemini-3.8-flash-lite-tts
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voice = 'Kore' } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'text is required' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: text.slice(0, 300), // Clean clip
                speechMetadata: {
                  style: 'Clear, natural, encouraging native English teacher',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice as any },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        return res.status(502).json({ error: 'No audio generated' });
      }

      // Unary response is a complete WAV file (audio/wav)
      return res.json({
        audioBase64: base64Audio,
        format: 'audio/wav',
      });
    } catch (error: any) {
      console.warn('TTS generation failed, frontend will fallback to Web Speech API:', error?.message);
      return res.status(500).json({ error: 'TTS failed' });
    }
  });

  // Set up Vite or static serving
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LinguaAcademy AI Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
