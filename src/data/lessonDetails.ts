import { DayLesson, LessonTeachingData } from '../types';

export const LESSON_TEACHING_MAP: Record<number, LessonTeachingData> = {
  1: {
    summaryTr: 'İngilizcede tanışırken en çok yapılan hata sadece adını söyleyip susmaktır. Doğal bir tanışma 3 adımdan oluşur: 1) Samimi bir selamlama (Hello/Hi), 2) Adını ve nereden geldiğini belirtme (I am... / I am from...), 3) Nezaket cümlesi (Nice to meet you).',
    keyRuleTr: '“I am [İsim]” veya “My name is [İsim]” kalıbını kullanırız. Nereli olduğumuzu söylerken “I am from [Şehir/Ülke]” deriz. Şimdiki mesleğimiz veya yaptığımız iş için “Currently, I work as...” veya “I am a student” diyebiliriz.',
    dialogue: [
      { speaker: 'Sarah', en: 'Hello! Welcome to the company. My name is Sarah.', tr: 'Merhaba! Şirkete hoş geldiniz. Benim adım Sarah.' },
      { speaker: 'Ali', en: 'Hi Sarah! Nice to meet you. I am Ali, and I am from Istanbul.', tr: 'Selam Sarah! Tanıştığıma memnun oldum. Ben Ali, İstanbul’dan geliyorum.' },
      { speaker: 'Sarah', en: 'It is a pleasure to meet you, Ali! What do you currently do here?', tr: 'Seninle tanışmak bir zevk Ali! Şu anda burada ne iş yapıyorsun?' },
      { speaker: 'Ali', en: 'I currently work as a software engineer with your colleague David.', tr: 'Şu anda iş arkadaşın David ile birlikte yazılım mühendisi olarak çalışıyorum.' },
    ],
    commonMistakes: [
      { wrong: 'I am come from Turkey.', correct: 'I come from Turkey. VEYA I am from Turkey.', explanation: '“Am” ile “come” aynı anda kullanılmaz.' },
      { wrong: 'Nice to meet you (2. kez görüşürken)', correct: 'Nice to see you again!', explanation: '“Nice to meet you” sadece İLK tanışmada söylenir. Tanıdığınız birini tekrar gördüğünüzde “Nice to see you” demelisiniz.' },
    ],
    proTipTr: 'Amerikan ve İngiliz kültüründe tanışırken karşınızdaki kişinin adını tekrar etmek (“Nice to meet you, Sarah”) son derece kibar ve profesyonel kabul edilir.',
  },
  2: {
    summaryTr: 'Geniş Zaman (Simple Present) günlük rutinlerimizi, alışkanlıklarımızı ve değişmeyen gerçekleri anlatmak için kullanılır. Bu derste sıklık zarflarıyla (always, usually, sometimes, never) gününüzü nasıl anlatacağınızı öğreneceksiniz.',
    keyRuleTr: 'Sıklık zarfları daima ÖZNE ile FİİL arasına girer: Örnek: "I always drink coffee." (Asla "I drink always coffee" denmez!). Saatlerden önce mutlaka "at" edatı kullanılır: "at 7:00 AM".',
    dialogue: [
      { speaker: 'Emma', en: 'Good morning! What time do you usually wake up?', tr: 'Günaydın! Genellikle saat kaçta uyanırsın?' },
      { speaker: 'Murat', en: 'I usually wake up at 7 AM. Then I always have a healthy breakfast.', tr: 'Genellikle sabah 7’de uyanırım. Sonra her zaman sağlıklı bir kahvaltı yaparım.' },
      { speaker: 'Emma', en: 'How do you commute to work?', tr: 'İşe nasıl gidip geliyorsun?' },
      { speaker: 'Murat', en: 'My daily commute takes about thirty minutes by metro.', tr: 'Günlük gidiş gelişim metroyla yaklaşık otuz dakika sürüyor.' },
    ],
    commonMistakes: [
      { wrong: 'I wake up always at 8.', correct: 'I always wake up at 8.', explanation: 'Sıklık zarfı fiilden önce gelmelidir.' },
      { wrong: 'He wake up early.', correct: 'He wakes up early.', explanation: 'He/She/It öznelerinde fiilin sonuna -s takısı gelir.' },
    ],
    proTipTr: 'Günlük rutinleri anlatırken sırayı belirtmek için "First (Önce), Then (Sonra), After that (Ondan sonra), Finally (Son olarak)" bağlaçlarını kullanmak İngilizcenizi anında akıcı gösterir.',
  },
  3: {
    summaryTr: 'İnsanları tanımlarken iki temel yapı kullanırız: 1) Karakter ve fiziksel özellikler için "He/She is + sıfat" (He is generous). 2) Sahip olunan fiziksel özellikler için "He/She has + isim" (She has blue eyes).',
    keyRuleTr: 'Kişilik özelliklerinde "am/is/are" kullanılır: "My brother is supportive." Saç, göz, sakal gibi fiziki özelliklerde "have/has" kullanılır: "He has short curly hair."',
    dialogue: [
      { speaker: 'David', en: 'Do you have any siblings, Ayşe?', tr: 'Hiç kardeşin var mı Ayşe?' },
      { speaker: 'Ayşe', en: 'Yes, I have an older brother. We strongly resemble our father.', tr: 'Evet, bir ağabeyim var. Babamıza çok benzeriz.' },
      { speaker: 'David', en: 'What is his personality like?', tr: 'Kişiliği nasıldır?' },
      { speaker: 'Ayşe', en: 'He is very generous and supportive. He always helps everyone.', tr: 'Çok cömert ve destekleyicidir. Herkese daima yardım eder.' },
    ],
    commonMistakes: [
      { wrong: 'She is brown hair.', correct: 'She has brown hair.', explanation: 'Kişi saçın kendisi değildir, saça sahiptir (has).' },
      { wrong: 'He is like his father.', correct: 'He looks like his father / He resembles his father.', explanation: 'Fiziksel benzerlik için "looks like" veya "resembles" kullanılır.' },
    ],
    proTipTr: '"Sibling" kelimesi hem kız hem erkek kardeşi kapsayan harika bir kelimedir. "Do you have any siblings?" sorusu en doğal sorudur.',
  },
};

/**
 * Returns full educational teaching data for any day in the 28-day curriculum.
 * If specific data isn't hardcoded in map, dynamically synthesizes high quality
 * pedagogical instruction, dialogue, grammar rule, and tips from the DayLesson metadata.
 */
export function getLessonTeaching(lesson: DayLesson): LessonTeachingData {
  if (LESSON_TEACHING_MAP[lesson.day]) {
    return LESSON_TEACHING_MAP[lesson.day];
  }

  // Synthesize rich pedagogical explanation
  const word1 = lesson.targetWords[0]?.word || 'Target word';
  const word2 = lesson.targetWords[1]?.word || 'Key concept';
  const example1 = lesson.patternExamples[0] || {
    en: lesson.expectedPattern,
    tr: 'Bu kalıpla günlük hayatta kendinizi ifade edebilirsiniz.',
  };

  return {
    summaryTr: `Bu derste "${lesson.titleTr}" konusunu öğreniyoruz. Amacımız: ${lesson.objective} Günlük ve profesyonel hayatta bu kalıpları ezberlemeden, mantığını kavrayarak konuşacaksınız.`,
    keyRuleTr: `${lesson.patternExplanation} Temel kalıp: "${lesson.expectedPattern}". Cümle kurarken "${word1}" ve "${word2}" gibi hedef kelimeleri bu kalıbın içine yerleştirerek konuşabilirsiniz.`,
    dialogue: [
      {
        speaker: 'Teacher',
        en: lesson.initialPrompt,
        tr: lesson.initialPromptTr,
      },
      {
        speaker: 'Student',
        en: example1.en,
        tr: example1.tr,
      },
      {
        speaker: 'Teacher',
        en: `Excellent! Using "${word1}" and "${word2}" makes your English sound very natural and fluent.`,
        tr: `Harika! "${word1}" ve "${word2}" kelimelerini kullanmak İngilizceni çok doğal ve akıcı kılıyor.`,
      },
    ],
    commonMistakes: [
      {
        wrong: 'Kelime kelime Türkçeden çeviri yapmak (Doğrudan Türkçe mantık)',
        correct: `İngilizce düşünerek "${lesson.expectedPattern.split('/')[0]}" kalıbını bütün olarak kullanmak`,
        explanation: 'İngilizcede kelimeleri tek tek çevirmek yerine hazır kalıplarla cümle kurmak konuşmanızı hızlandırır.',
      },
    ],
    proTipTr: `Bu konuyu pekiştirmek için sol taraftaki kelimelerin üzerine tıklayıp telaffuzlarını dinleyin ve yüksek sesle en az 3 kez tekrar edin.`,
  };
}
