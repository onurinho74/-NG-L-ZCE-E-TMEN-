/**
 * Turkish Phonetic Transliteration Utility for English
 * Converts English words and sentences to their easy-to-read Turkish phonetic representation.
 * Example: "Introduce" -> "İntro-dyus", "Pleasure" -> "Plejır", "Nice to meet you" -> "Nays tu miit yu"
 */

export const WORD_PRONUNCIATION_MAP: Record<string, string> = {
  // Common greetings & essentials
  'hello': 'Helo',
  'hi': 'Hay',
  'welcome': 'Velkım',
  'name': 'Neym',
  'meet': 'Miit',
  'pleasure': 'Plejır',
  'introduce': 'İntro-dyus',
  'colleague': 'Koliig',
  'hometown': 'Hom-tavn',
  'currently': 'Körıntli',
  'routine': 'Rutiin',
  'usually': 'Yujıli',
  'commute': 'Komyuut',
  'schedule': 'Skejıl',
  'habit': 'Hebit',
  'supportive': 'Saportiv',
  'generous': 'Cenırıs',
  'sibling': 'Sibling',
  'personality': 'Pörsıneliti',
  'resemble': 'Rizembıl',
  'breakfast': 'Brekfıst',
  'dinner': 'Dinır',
  'lunch': 'Lanç',
  'coffee': 'Kofi',
  'water': 'Votır',
  'morning': 'Mornink',
  'night': 'Nayt',
  'today': 'Tudey',
  'yesterday': 'Yestırdey',
  'tomorrow': 'Tumoro',
  'work': 'Vörk',
  'study': 'Stadi',
  'student': 'Stüyudınt',
  'teacher': 'Tiiçır',
  'doctor': 'Doktır',
  'engineer': 'Enciniyır',
  'software': 'Softveyır',
  'company': 'Kompıni',
  'family': 'Femıli',
  'friend': 'Frend',
  'brother': 'Bradır',
  'sister': 'Sistır',
  'father': 'Fadır',
  'mother': 'Madır',
  'travel': 'Trevıl',
  'airport': 'Eyrport',
  'ticket': 'Tikıt',
  'hotel': 'Hotel',
  'reservation': 'Rezırveyşın',
  'restaurant': 'Restorant',
  'order': 'Ordır',
  'delicious': 'Dilişıs',
  'recommend': 'Rekomend',
  'price': 'Prays',
  'expensive': 'İkspensiv',
  'cheap': 'Çiip',
  'weather': 'Vedır',
  'sunny': 'Sani',
  'rainy': 'Reyni',
  'cold': 'Kold',
  'warm': 'Vorm',
  'exercise': 'Eksırsayz',
  'healthy': 'Helti',
  'lifestyle': 'Layf-stayl',
  'experience': 'İkspiriyıns',
  'opportunity': 'Opırtuniti',
  'success': 'Sakses',
  'challenge': 'Çelınç',
  'improve': 'İmpruuv',
  'practice': 'Prektis',
  'fluent': 'Fluınt',
  'vocabulary': 'Vokebyuleri',
  'grammar': 'Gremır',
  'pronunciation': 'Pıronansi-yeyşın',
  'conversation': 'Konvırzeyşın',
  'language': 'Lengviç',
  'english': 'İngliş',
  'listen': 'Lisın',
  'speak': 'Spiik',
  'read': 'Riid',
  'write': 'Rayt',
};

export const COMMON_PHRASE_PRONUNCIATION_MAP: Record<string, string> = {
  'nice to meet you': 'Nays tu miit yu',
  'it is a pleasure to meet you': 'İt iz e plejır tu miit yu',
  'hello, my name is': 'Helo, may neym iz',
  'what is your name': 'Vat iz yor neym',
  'where are you from': 'Ver ar yu from',
  'i am from': 'Ay em from',
  'i currently live in': 'Ay körıntli liv in',
  'what do you do': 'Vat du yu du',
  'i am a software engineer': 'Ay em e softveyır enciniyır',
  'good morning': 'Gud mornink',
  'good evening': 'Gud ivnink',
  'how are you': 'Hav ar yu',
  'i am fine, thank you': 'Ay em fayn, tenk yu',
  'see you later': 'Sii yu leytır',
  'have a good day': 'Hev e gud dey',
  'thank you very much': 'Tenk yu veri maç',
  'you are welcome': 'Yu ar velkım',
  'excuse me': 'Ekskyuz mi',
  'how much is this': 'Hav maç iz dis',
  'can you help me': 'Ken yu help mi',
};

/**
 * Phonetically transcribes a single English word into easily readable Turkish characters
 */
function transcribeWordToTurkish(word: string): string {
  const clean = word.toLowerCase().replace(/[^a-z']/g, '');
  if (!clean) return word;

  if (WORD_PRONUNCIATION_MAP[clean]) {
    return WORD_PRONUNCIATION_MAP[clean];
  }

  // Smart heuristic rule-based transliteration
  let t = clean;

  // Replacements
  t = t.replace(/tion\b/g, 'şın');
  t = t.replace(/sion\b/g, 'jın');
  t = t.replace(/ture\b/g, 'çır');
  t = t.replace(/ous\b/g, 'ıs');
  t = t.replace(/ough/g, 'of');
  t = t.replace(/ight\b/g, 'ayt');
  t = t.replace(/alk\b/g, 'ook');
  t = t.replace(/all\b/g, 'ool');
  t = t.replace(/ph/g, 'f');
  t = t.replace(/th/g, 't');
  t = t.replace(/sh/g, 'ş');
  t = t.replace(/ch/g, 'ç');
  t = t.replace(/ee/g, 'ii');
  t = t.replace(/ea/g, 'ii');
  t = t.replace(/oo/g, 'uu');
  t = t.replace(/qu/g, 'kv');
  t = t.replace(/wh/g, 'v');
  t = t.replace(/w/g, 'v');
  t = t.replace(/c(?=[eiy])/g, 's');
  t = t.replace(/c/g, 'k');
  t = t.replace(/x/g, 'ks');
  t = t.replace(/j/g, 'c');
  t = t.replace(/y\b/g, 'i');

  // Capitalize first letter
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Converts any English text or phrase into readable Turkish pronunciation
 * Example: "Hello! Welcome to the company." -> "Helo! Velkım tu dı kompıni."
 */
export function getTurkishPronunciation(text: string): string {
  if (!text) return '';

  const cleanLower = text.trim().toLowerCase().replace(/[.,!?;:"]/g, '');
  if (COMMON_PHRASE_PRONUNCIATION_MAP[cleanLower]) {
    return COMMON_PHRASE_PRONUNCIATION_MAP[cleanLower];
  }

  // Process word by word preserving punctuation
  const tokens = text.split(/(\s+|[.,!?;:"]+)/);
  const result = tokens.map((tok) => {
    if (!tok || !/[a-zA-Z]/.test(tok)) {
      return tok;
    }
    return transcribeWordToTurkish(tok);
  });

  return result.join('');
}
