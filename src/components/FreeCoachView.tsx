import React, { useState, useRef, useEffect } from 'react';
import { UserProgress } from '../types';
import { speakEnglish, getSpeechRecognition } from '../utils/speech';
import { sounds } from '../utils/sound';
import {
  Sparkles,
  Send,
  Volume2,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  Award,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

interface FreeCoachViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  academyName?: string;
}

interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  evaluation?: {
    is_correct: boolean;
    score_earned: number;
    feedback_message: string;
    next_prompt: string;
  };
}

export const FreeCoachView: React.FC<FreeCoachViewProps> = ({
  progress,
  onUpdateProgress,
  academyName = 'EnglishMaster AI',
}) => {
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'init_coach',
      sender: 'coach',
      text: `Hello! I am your personal ${academyName} Coach. We can talk about anything you want, practice role-plays (like ordering food, an interview, or travel), or you can ask me how to say something naturally in English. What would you like to practice today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scenarioTopic, setScenarioTopic] = useState('Genel Sohbet');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleMic = () => {
    const recognition = getSpeechRecognition();
    if (!recognition) {
      alert('Tarayıcınız ses tanımayı desteklemiyor.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${text}` : text));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    setInput('');
    const userMsg: CoachMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: textToSend,
          current_day: progress.currentDay,
          day_title: `Serbest Koç Pratiği (${scenarioTopic})`,
          target_words: ['Fluency', 'Express', 'Grammar', 'Confidence', 'Conversation'],
          expected_pattern: 'Natural conversational English, accurate tense usage, polite phrasing',
          step_context: `Öğrenci serbest konuşma modunda: "${scenarioTopic}" konusunu çalışıyor.`,
          conversation_history: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.is_correct) {
        sounds.playSuccess();
      } else {
        sounds.playHint();
      }

      const coachMsg: CoachMessage = {
        id: `coach_${Date.now()}`,
        sender: 'coach',
        text: data.next_prompt,
        evaluation: data,
      };

      setMessages((prev) => [...prev, coachMsg]);

      // Add points
      if (data.score_earned) {
        onUpdateProgress({
          ...progress,
          totalScore: progress.totalScore + data.score_earned,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const scenarios = [
    { label: 'Genel Sohbet & Günlük Hayat', prompt: "Let's talk about our hobbies and weekend plans." },
    { label: 'İş Mülakatı Simülasyonu', prompt: "Could you interview me for a project manager position?" },
    { label: 'Havalimanında Pasaport & Bagaj', prompt: "Let's roleplay that I just arrived at the airport customs." },
    { label: 'Kafede Sipariş & Muhabbet', prompt: "Imagine I am at a coffee shop in London ordering breakfast." },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <span>Serbest Pratik Stüdyosu</span>
            <span aria-hidden="true">·</span>
            <span>Konu Sınırlaması Yok</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display mt-1">
            Yapay Zeka İngilizce Koçu
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            İstediğiniz senaryoyu seçin veya aklınıza gelen herhangi bir konuyu konuşun. Her cevabınız değerlendirilir.
          </p>
        </div>

        {/* Reset Chat */}
        <button
          onClick={() => {
            setMessages([
              {
                id: 'init_reset',
                sender: 'coach',
                text: "Chat refreshed! What new scenario would you like to explore?",
              },
            ]);
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors self-start sm:self-auto"
          title="Sohbeti Temizle"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Scenario Presets Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-1">Örnek Senaryo Seç:</span>
        {scenarios.map((sc) => (
          <button
            key={sc.label}
            onClick={() => {
              setScenarioTopic(sc.label);
              handleSend(sc.prompt);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              scenarioTopic === sc.label
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[650px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => {
            const isCoach = m.sender === 'coach';

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isCoach ? 'items-start' : 'items-end'}`}
              >
                <span className="text-[11px] text-slate-400 mb-1 px-1">
                  {isCoach ? `${academyName} Koç` : 'Sen'}
                </span>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isCoach
                      ? 'bg-slate-100 text-slate-900 rounded-tl-xs'
                      : 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {isCoach && (
                      <button
                        onClick={() => speakEnglish(m.text)}
                        title="Dinle"
                        className="shrink-0 p-1 text-slate-500 hover:text-indigo-600 rounded-md"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Evaluation Card if present */}
                {m.evaluation && (
                  <div className="mt-2.5 max-w-[85%] w-full bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 font-bold">
                        {m.evaluation.is_correct ? (
                          <div className="flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Gramer & Anlam Başarılı</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-700">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Düzeltme & Öneri</span>
                          </div>
                        )}
                      </div>

                      <div className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold">
                        +{m.evaluation.score_earned} Puan
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {m.evaluation.feedback_message}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>Koçunuz cevabınızı inceliyor...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-600" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Dinleniyor... İngilizce konuşun...' : 'Mesajınızı İngilizce olarak yazın...'}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <span>Gönder</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
