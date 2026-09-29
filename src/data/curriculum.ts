import { DayLesson } from '../types';

export const CURRICULUM: DayLesson[] = [
  // ==================== HAFTA 1: TEMELLER & GÜNLÜK YAŞAM ====================
  {
    day: 1,
    week: 1,
    titleTr: 'Kendini Tanıtma & Selamlaşma',
    titleEn: 'Self-Introduction & Greetings',
    category: 'Temel İletişim',
    level: 'Başlangıç (A1-A2)',
    objective: 'İngilizce olarak adını, mesleğini ve nereden geldiğini doğal bir şekilde ifade edebilme.',
    expectedPattern: 'Hello, my name is [Name] / I am from [City/Country] / Nice to meet you.',
    patternExplanation: 'Kendini tanıtırken "I am" veya "My name is" kullanılır. Birisiyle ilk kez tanışırken "Nice to meet you" kalıbı nezaket bildirir.',
    patternExamples: [
      { en: "Hello! My name is Alex, and I am from London. Nice to meet you.", tr: "Merhaba! Benim adım Alex ve Londra'dan geliyorum. Tanıştığımıza memnun oldum." },
      { en: "Hi everyone, I am a software designer from Istanbul.", tr: "Herkese merhaba, ben İstanbul'dan bir yazılım tasarımcısıyım." }
    ],
    targetWords: [
      { word: 'Introduce', phonetic: '/ˌɪn.trəˈdʒuːs/', turkish: 'Tanıtmak / Takdim etmek', exampleEn: 'Let me introduce myself.', exampleTr: 'İzin verin kendimi tanıtayım.' },
      { word: 'Pleasure', phonetic: '/ˈpleʒ.ər/', turkish: 'Memnuniyet / Zevk', exampleEn: 'It is a pleasure to meet you.', exampleTr: 'Sizinle tanışmak bir zevk.' },
      { word: 'Colleague', phonetic: '/ˈkɒl.iːɡ/', turkish: 'İş arkadaşı', exampleEn: 'This is my colleague Sarah.', exampleTr: 'Bu benim iş arkadaşım Sarah.' },
      { word: 'Hometown', phonetic: '/ˈhəʊm.taʊn/', turkish: 'Memleket', exampleEn: 'My hometown is famous for its beaches.', exampleTr: 'Memleketim plajlarıyla ünlüdür.' },
      { word: 'Currently', phonetic: '/ˈkʌr.ənt.li/', turkish: 'Şu anda / Halihazırda', exampleEn: 'I currently live and work here.', exampleTr: 'Şu anda burada yaşıyor ve çalışıyorum.' }
    ],
    initialPrompt: "Welcome to Day 1 of EnglishMaster AI! Let's start with something friendly. Could you please introduce yourself? Tell me your name, where you are from, and what you do.",
    initialPromptTr: "EnglishMaster AI 1. Güne hoş geldiniz! Dostça bir adımla başlayalım. Lütfen kendinizi tanıtır mısınız? Adınızı, nereden olduğunuzu ve ne iş yaptığınızı söyleyin.",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd1_c1',
        type: 'warmup',
        instructionTr: 'Günün kalıbını kullanarak adını ve memleketini belirterek selam ver.',
        promptEn: "Hello! Can you greet me and introduce yourself with your name and where you are from?",
        expectedConcept: "My name is ... / I am from ...",
        hintTr: "İpucu: 'Hello, my name is ... and I am from ...' kalıbını dene."
      },
      {
        id: 'd1_c2',
        type: 'vocab',
        instructionTr: "'Pleasure' veya 'Introduce' kelimesini içeren kibar bir tanışma cümlesi kur.",
        promptEn: "Great! Now, try to use the word 'pleasure' or 'introduce' in a polite greeting sentence.",
        expectedConcept: "It is a pleasure to meet you / Let me introduce myself",
        hintTr: "İpucu: 'It is a pleasure to meet you!' harika bir kalıptır."
      },
      {
        id: 'd1_c3',
        type: 'dialogue',
        instructionTr: "Yapay zeka öğretmenin 'What do you do currently?' sorusuna tam bir İngilizce cümleyle cevap ver.",
        promptEn: "What is your profession or hobby? What do you currently do every day?",
        expectedConcept: "I currently work as / I am currently studying ...",
        hintTr: "İpucu: 'Currently, I work as...' veya 'I am currently a student' diyebilirsin."
      }
    ]
  },
  {
    day: 2,
    week: 1,
    titleTr: 'Günlük Rutinler & Geniş Zaman',
    titleEn: 'Daily Routines & Simple Present',
    category: 'Gramer & Rutin',
    level: 'Başlangıç (A1-A2)',
    objective: 'Sıklık zarflarını (always, usually, sometimes) ve Geniş Zaman (Simple Present) kuralını doğru kullanma.',
    expectedPattern: 'I usually [verb] at [time] / In the morning, I always...',
    patternExplanation: 'Geniş zaman alışkanlıkları anlatır. Sıklık zarfları (always, usually, often, rarely, never) özne ile fiil arasına gelir (örn: I always drink coffee). 3. tekil şahıslarda fiile -s/es takısı gelir.',
    patternExamples: [
      { en: "I usually wake up at 7 AM and have breakfast.", tr: "Genellikle sabah 7'de uyanır ve kahvaltı yaparım." },
      { en: "She rarely goes to bed before midnight.", tr: "O nadiren gece yarısından önce yatar." }
    ],
    targetWords: [
      { word: 'Routine', phonetic: '/ruːˈtiːn/', turkish: 'Rutin / Günlük düzen', exampleEn: 'My morning routine keeps me productive.', exampleTr: 'Sabah rutinim beni üretken tutar.' },
      { word: 'Usually', phonetic: '/ˈjuː.ʒu.ə.li/', turkish: 'Genellikle', exampleEn: 'I usually take a walk after dinner.', exampleTr: 'Akşam yemeğinden sonra genellikle yürüyüş yaparım.' },
      { word: 'Commute', phonetic: '/kəˈmjuːt/', turkish: 'İşe/okula gidip gelmek', exampleEn: 'My daily commute takes 30 minutes.', exampleTr: 'Günlük işe gidiş gelişim 30 dakika sürer.' },
      { word: 'Schedule', phonetic: '/ˈʃedʒ.uːl/', turkish: 'Program / Zaman planı', exampleEn: 'I have a busy schedule today.', exampleTr: 'Bugün yoğun bir programım var.' },
      { word: 'Habit', phonetic: '/ˈhæb.ɪt/', turkish: 'Alışkanlık', exampleEn: 'Reading before sleeping is a healthy habit.', exampleTr: 'Uyumadan önce okumak sağlıklı bir alışkanlıktır.' }
    ],
    initialPrompt: "Good day! Today we focus on your daily habits. What does a typical morning look like for you? What time do you wake up?",
    initialPromptTr: "İyi günler! Bugün günlük alışkanlıklarınıza odaklanıyoruz. Tipik bir sabahınız nasıl geçer? Kaçta uyanırsınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd2_c1',
        type: 'pattern',
        instructionTr: "'usually' veya 'always' sıklık zarfını kullanarak sabah kaçta uyandığını söyle.",
        promptEn: "Can you tell me what time you wake up and what you usually do first?",
        expectedConcept: "I usually wake up at ... and ...",
        hintTr: "Örnek: 'I usually wake up at 7:30 AM and drink a glass of water.'"
      },
      {
        id: 'd2_c2',
        type: 'vocab',
        instructionTr: "'commute' veya 'routine' kelimesini kullanarak işe veya okula gidişini açıkla.",
        promptEn: "How do you commute to work or school? Or describe your commute routine.",
        expectedConcept: "I commute by bus/train / My daily commute takes...",
        hintTr: "Örnek: 'My daily commute takes about 40 minutes by metro.'"
      },
      {
        id: 'd2_c3',
        type: 'dialogue',
        instructionTr: "Öğretmenin 'What is one healthy habit you do every day?' sorusuna yanıt ver.",
        promptEn: "What is one healthy habit that you practice regularly?",
        expectedConcept: "A healthy habit I have is ... / I always exercise...",
        hintTr: "Örnek: 'I always drink at least two liters of water every day.'"
      }
    ]
  },
  {
    day: 3,
    week: 1,
    titleTr: 'Aile, Arkadaşlar & Tanımlamalar',
    titleEn: 'Family, Friends & Descriptions',
    category: 'Sosyal Çevre',
    level: 'Başlangıç (A1-A2)',
    objective: 'Kişilerin fiziksel özelliklerini, karakterlerini ve akrabalık ilişkilerini tanımlayabilme.',
    expectedPattern: 'He/She is [adjective] / They have [feature] / He likes to...',
    patternExplanation: 'Kişileri tanımlarken "to be" (am/is/are) ile sıfatlar, "have/has" ile sahiplikler ifade edilir (He has brown eyes, she is very kind).',
    patternExamples: [
      { en: "My older brother is very supportive and energetic.", tr: "Ağabeyim çok destekleyici ve enerjiktir." },
      { en: "She has curly dark hair and a warm smile.", tr: "Kıvırcık koyu saçları ve sıcak bir gülümsemesi var." }
    ],
    targetWords: [
      { word: 'Supportive', phonetic: '/səˈpɔː.tɪv/', turkish: 'Destekleyici', exampleEn: 'My family is always very supportive.', exampleTr: 'Ailem her zaman çok destekleyicidir.' },
      { word: 'Generous', phonetic: '/ˈdʒen.ər.əs/', turkish: 'Cömert', exampleEn: 'He is known as a generous friend.', exampleTr: 'O cömert bir arkadaş olarak bilinir.' },
      { word: 'Sibling', phonetic: '/ˈsɪb.lɪŋ/', turkish: 'Kardeş', exampleEn: 'Do you have any siblings?', exampleTr: 'Hiç kardeşin var mı?' },
      { word: 'Personality', phonetic: '/ˌpɜː.sənˈæl.ə.ti/', turkish: 'Kişilik', exampleEn: 'She has an outgoing personality.', exampleTr: 'Girişken bir kişiliği var.' },
      { word: 'Resemble', phonetic: '/rɪˈzem.bəl/', turkish: 'Benzemek / Andırmak', exampleEn: 'I strongly resemble my father.', exampleTr: 'Babama çok benzerim.' }
    ],
    initialPrompt: "Hello! Today we talk about the people closest to you. Tell me about your best friend or a family member. What is their personality like?",
    initialPromptTr: "Merhaba! Bugün size en yakın insanlardan bahsedeceğiz. En iyi arkadaşınızı veya bir aile üyenizi anlatın. Kişiliği nasıldır?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd3_c1',
        type: 'pattern',
        instructionTr: "Bir arkadaşını veya kardeşini en az iki sıfat kullanarak tanımla.",
        promptEn: "Describe your close friend or sibling with two positive adjectives.",
        expectedConcept: "My friend is kind and supportive / She has...",
        hintTr: "Örnek: 'My best friend is funny, generous and very supportive.'"
      },
      {
        id: 'd3_c2',
        type: 'vocab',
        instructionTr: "'sibling' veya 'personality' kelimesini bir cümlede kullan.",
        promptEn: "Can you use the word 'sibling' or 'personality' in a sentence about your family?",
        expectedConcept: "I have two siblings / His personality is warm...",
        hintTr: "Örnek: 'I have one younger sibling who has a creative personality.'"
      },
      {
        id: 'd3_c3',
        type: 'dialogue',
        instructionTr: "Öğretmenin 'Who do you resemble more in your family?' sorusunu yanıtla.",
        promptEn: "Who do you resemble more in your family: your mother or your father?",
        expectedConcept: "I resemble my mother because...",
        hintTr: "Örnek: 'I resemble my mother because we both have brown eyes.'"
      }
    ]
  },
  {
    day: 4,
    week: 1,
    titleTr: 'Beğeniler, İlgi Alanları & Hobiler',
    titleEn: 'Likes, Interests & Hobbies',
    category: 'Gramer & İfadeler',
    level: 'Başlangıç (A1-A2)',
    objective: "'Interested in', 'fond of', 'enjoy' gibi kalıplarla ilgi alanlarını zengin bir dille ifade etme.",
    expectedPattern: 'I am interested in [gerund/noun] / I prefer [A] to [B] / I am fond of...',
    patternExplanation: '"interested in" ve "fond of" edatlarından sonra fiil gelirse -ing (gerund) alır: "I am interested in learning languages". "Prefer A to B" kalıbı ise bir şeyi diğerine tercih ettiğinizi belirtir.',
    patternExamples: [
      { en: "I am really interested in learning digital photography.", tr: "Dijital fotoğrafçılık öğrenmeye gerçekten ilgi duyuyorum." },
      { en: "I prefer reading printed books to reading on a screen.", tr: "Basılı kitap okumayı ekranda okumaya tercih ederim." }
    ],
    targetWords: [
      { word: 'Enthusiastic', phonetic: '/ɪnˌθjuː.ziˈæs.tɪk/', turkish: 'Hevesli / Coşkulu', exampleEn: 'He is enthusiastic about modern art.', exampleTr: 'Modern sanat konusunda heveslidir.' },
      { word: 'Leisure', phonetic: '/ˈleʒ.ər/', turkish: 'Boş zaman', exampleEn: 'What do you do in your leisure time?', exampleTr: 'Boş zamanlarınızda ne yaparsınız?' },
      { word: 'Prefer', phonetic: '/prɪˈfɜːr/', turkish: 'Tercih etmek', exampleEn: 'I prefer tea to coffee in the evening.', exampleTr: 'Akşamları çayı kahveye tercih ederim.' },
      { word: 'Passionate', phonetic: '/ˈpæʃ.ən.ət/', turkish: 'Tutkulu', exampleEn: 'She is passionate about environmental protection.', exampleTr: 'Çevre koruma konusunda tutkuludur.' },
      { word: 'Relaxing', phonetic: '/rɪˈlæk.sɪŋ/', turkish: 'Rahatlatıcı', exampleEn: 'Listening to classical music is very relaxing.', exampleTr: 'Klasik müzik dinlemek çok rahatlatıcıdır.' }
    ],
    initialPrompt: "Welcome to Day 4! What do you love doing in your free time? Are you passionate about any sport, music, or creative hobby?",
    initialPromptTr: "4. Güne hoş geldiniz! Boş zamanlarınızda ne yapmayı seversiniz? Herhangi bir spor, müzik veya yaratıcı hobiye tutkunuz var mı?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd4_c1',
        type: 'pattern',
        instructionTr: "'I am interested in...' kalıbını kullanarak bir hobini anlat.",
        promptEn: "Can you tell me what you are interested in using 'I am interested in + verb-ing'?",
        expectedConcept: "I am interested in playing/reading/cooking...",
        hintTr: "Örnek: 'I am interested in learning new languages and cooking.'"
      },
      {
        id: 'd4_c2',
        type: 'pattern',
        instructionTr: "'prefer ... to ...' kalıbıyla iki aktivite arasındaki tercihini söyle.",
        promptEn: "Use the pattern 'I prefer [Activity A] to [Activity B]' to express a choice.",
        expectedConcept: "I prefer walking to running / I prefer tea to coffee",
        hintTr: "Örnek: 'I prefer staying at home to going to crowded places.'"
      },
      {
        id: 'd4_c3',
        type: 'vocab',
        instructionTr: "'leisure' veya 'passionate' kelimesini içeren bir cümle yaz.",
        promptEn: "Try writing a sentence with the word 'leisure' or 'passionate'.",
        expectedConcept: "In my leisure time... / I am passionate about...",
        hintTr: "Örnek: 'During my leisure time, I am passionate about cycling in nature.'"
      }
    ]
  },
  {
    day: 5,
    week: 1,
    titleTr: 'Restoranda Sipariş Verme & Nezaket',
    titleEn: 'Ordering Food & Dining Etiquette',
    category: 'Pratik Yaşam',
    level: 'Başlangıç (A1-A2)',
    objective: 'Restoran ve kafelerde kibar sipariş verme, hesap isteme ve alerji/tercih belirtme becerisi.',
    expectedPattern: 'Could I have [item], please? / I would like to order... / Could we get the bill?',
    patternExplanation: 'Restoranlarda "I want" yerine her zaman kibar "Could I have..." veya "I would like (I\'d like)..." kalıpları tercih edilir. Cümlenin sonuna "please" eklemek standarttır.',
    patternExamples: [
      { en: "Could I have a sparkling water with lemon, please?", tr: "Limonlu maden suyu alabilir miyim lütfen?" },
      { en: "Excuse me, could we please have the bill whenever you are ready?", tr: "Afedersiniz, hazır olduğunuzda hesabı alabilir miyiz lütfen?" }
    ],
    targetWords: [
      { word: 'Beverage', phonetic: '/ˈbev.ər.ɪdʒ/', turkish: 'İçecek', exampleEn: 'Which beverage would you recommend?', exampleTr: 'Hangi içeceği tavsiye edersiniz?' },
      { word: 'Delicious', phonetic: '/dɪˈlɪʃ.əs/', turkish: 'Lezzetli', exampleEn: 'The soup is absolutely delicious.', exampleTr: 'Çorba kesinlikle çok lezzetli.' },
      { word: 'Bill / Check', phonetic: '/bɪl/', turkish: 'Hesap / Adisyon', exampleEn: 'Could we split the bill, please?', exampleTr: 'Hesabı bölüşebilir miyiz lütfen?' },
      { word: 'Allergy', phonetic: '/ˈæl.ə.dʒi/', turkish: 'Alerji', exampleEn: 'I have a peanut allergy.', exampleTr: 'Fıstık alerjim var.' },
      { word: 'Recommend', phonetic: '/ˌrek.əˈmend/', turkish: 'Tavsiye etmek', exampleEn: 'What do you recommend for the main course?', exampleTr: 'Ana yemek için ne tavsiye edersiniz?' }
    ],
    initialPrompt: "Good evening! Welcome to our restaurant. Here is the menu. What would you like to start with today?",
    initialPromptTr: "İyi akşamlar! Restoranımıza hoş geldiniz. İşte menü. Bugün ne ile başlamak istersiniz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd5_c1',
        type: 'pattern',
        instructionTr: "'Could I have...' kalıbını kullanarak bir başlangıç yemeği veya içecek sipariş et.",
        promptEn: "Order a drink or starter politely using 'Could I have ..., please?'",
        expectedConcept: "Could I have ... please?",
        hintTr: "Örnek: 'Could I have a tomato soup and fresh orange juice, please?'"
      },
      {
        id: 'd5_c2',
        type: 'dialogue',
        instructionTr: "Garsona günün spesiyalitesini sor ve 'recommend' kelimesini kullan.",
        promptEn: "Ask the waiter what dish they recommend for dinner.",
        expectedConcept: "What do you recommend for dinner?",
        hintTr: "Örnek: 'Excuse me, which vegetarian dish would you recommend?'"
      },
      {
        id: 'd5_c3',
        type: 'pattern',
        instructionTr: "Yemeğin sonunda garsona hesabı kibarca iste.",
        promptEn: "Politely ask the waiter for the bill.",
        expectedConcept: "Could we have the bill, please?",
        hintTr: "Örnek: 'Thank you for the delicious meal. Could we have the bill, please?'"
      }
    ]
  },
  {
    day: 6,
    week: 1,
    titleTr: 'Saatler, Tarihler & Fiyat Sorma',
    titleEn: 'Time, Dates & Inquiring Prices',
    category: 'Pratik Yaşam',
    level: 'Başlangıç (A1-A2)',
    objective: 'Saatleri, tarihleri ve ürün fiyatlarını sorma ve doğru ön edatlarla (at, on, in) ifade etme.',
    expectedPattern: 'How much does this cost? / The meeting is at [time] on [day] / It takes [duration]',
    patternExplanation: 'Saatlerde "at" (at 4:00 PM), günlerde "on" (on Monday), aylarda ve yıllarda "in" (in June, in 2026) kullanılır. Fiyat sorarken "How much is...?" veya "How much does it cost?" denir.',
    patternExamples: [
      { en: "Our appointment is scheduled at quarter past ten on Wednesday.", tr: "Randevumuz Çarşamba günü saat onu çeyrek geçeye planlandı." },
      { en: "Excuse me, how much is this jacket with the discount?", tr: "Afedersiniz, bu ceket indirimle ne kadar?" }
    ],
    targetWords: [
      { word: 'Affordable', phonetic: '/əˈfɔː.də.bəl/', turkish: 'Uygun fiyatlı / Bütçe dostu', exampleEn: 'The prices in this shop are very affordable.', exampleTr: 'Bu dükkandaki fiyatlar çok uygun.' },
      { word: 'Appointment', phonetic: '/əˈpɔɪnt.mənt/', turkish: 'Randevu', exampleEn: 'I have a dentist appointment at 3 PM.', exampleTr: 'Saat 15:00\'te dişçi randevum var.' },
      { word: 'Discount', phonetic: '/ˈdɪs.kaʊnt/', turkish: 'İndirim', exampleEn: 'Is there any student discount available?', exampleTr: 'Öğrenci indirimi mevcut mu?' },
      { word: 'Receipt', phonetic: '/rɪˈsiːt/', turkish: 'Fiş / Makbuz', exampleEn: 'Would you like your receipt in the bag?', exampleTr: 'Fişinizi çantanın içine koyayım mı?' },
      { word: 'Duration', phonetic: '/dʒuˈreɪ.ʃən/', turkish: 'Süre', exampleEn: 'What is the duration of the flight?', exampleTr: 'Uçuşun süresi nedir?' }
    ],
    initialPrompt: "Hello! Imagine you are shopping in a boutique in London. You found a nice sweater but cannot see the price tag. How would you ask me for the price and if there is a discount?",
    initialPromptTr: "Merhaba! Londra'da bir butikte alışveriş yaptığınızı hayal edin. Güzel bir kazak buldunuz ama fiyat etiketini göremiyorsunuz. Bana fiyatı ve indirim olup olmadığını nasıl sorarsınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd6_c1',
        type: 'pattern',
        instructionTr: "'How much is...' veya 'How much does it cost?' kalıbıyla kazağın fiyatını sor.",
        promptEn: "Ask the store clerk for the price of the sweater.",
        expectedConcept: "How much is this sweater? / How much does it cost?",
        hintTr: "Örnek: 'Excuse me, how much does this blue sweater cost?'"
      },
      {
        id: 'd6_c2',
        type: 'vocab',
        instructionTr: "'discount' kelimesini kullanarak indirim olup olmadığını sor.",
        promptEn: "Inquire if there is any discount on this item.",
        expectedConcept: "Is there any discount on this?",
        hintTr: "Örnek: 'Is there an active discount on this product today?'"
      },
      {
        id: 'd6_c3',
        type: 'dialogue',
        instructionTr: "Bir arkadaşınla saat ve gün belirterek buluşma randevusu ayarla ('at' ve 'on' kullanarak).",
        promptEn: "Propose meeting your friend at a specific time and day using 'at' and 'on'.",
        expectedConcept: "Let's meet at ... on ...",
        hintTr: "Örnek: 'Let us meet at half past two on Friday afternoon.'"
      }
    ]
  },
  {
    day: 7,
    week: 1,
    titleTr: '1. Hafta Kapsamlı Değerlendirme & Akıcılık',
    titleEn: 'Week 1 Comprehensive Review & Fluency Check',
    category: 'Haftalık Değerlendirme',
    level: 'Başlangıç (A1-A2)',
    objective: '1. haftada öğrenilen kendini tanıtma, rutinler, hobiler ve restoran diyaloglarını birleştirerek akıcı bir konuşma tamamlama.',
    expectedPattern: 'Integration of Simple Present, polite requests, and personal preferences.',
    patternExplanation: 'İlk 6 günün temel kalıplarını birleştirip kendinizi özgüvenle ifade edin. Cümleler arası geçiş bağlaçları (and, but, because, also) akıcılığı artırır.',
    patternExamples: [
      { en: "Hello! My name is Deniz. I usually work from home, but in my leisure time, I am passionate about cooking Italian dishes.", tr: "Merhaba! Benim adım Deniz. Genellikle evden çalışırım ama boş zamanlarımda İtalyan yemekleri pişirmeye tutkuluyum." }
    ],
    targetWords: [
      { word: 'Confidence', phonetic: '/ˈkɒn.fɪ.dəns/', turkish: 'Özgüven', exampleEn: 'Speaking daily builds real confidence.', exampleTr: 'Her gün konuşmak gerçek bir özgüven kazandırır.' },
      { word: 'Improvement', phonetic: '/ɪmˈpruːv.mənt/', turkish: 'Gelişme / İlerleme', exampleEn: 'I noticed great improvement in my speaking.', exampleTr: 'Konuşmamda büyük bir ilerleme fark ettim.' },
      { word: 'Review', phonetic: '/rɪˈvjuː/', turkish: 'Gözden geçirme / Tekrar', exampleEn: 'Let us review the key vocabulary.', exampleTr: 'Ana kelimeleri tekrar gözden geçirelim.' },
      { word: 'Progress', phonetic: '/ˈprəʊ.ɡres/', turkish: 'İlerleme', exampleEn: 'You are making steady progress.', exampleTr: 'İstikrarlı bir ilerleme kaydediyorsunuz.' },
      { word: 'Achievement', phonetic: '/əˈtʃiːv.mənt/', turkish: 'Başarı', exampleEn: 'Completing Week 1 is a great achievement!', exampleTr: '1. Haftayı tamamlamak harika bir başarı!' }
    ],
    initialPrompt: "Congratulations on reaching Day 7! You have completed Week 1 of EnglishMaster AI. Give me a full summary of who you are, your typical daily routine, and what you enjoy doing on weekends.",
    initialPromptTr: "7. Güne ulaştığınız için tebrikler! EnglishMaster AI'nın 1. Haftasını tamamladınız. Kim olduğunuzu, tipik günlük rutininizi ve hafta sonları ne yapmaktan keyif aldığınızı anlatan eksiksiz bir özet verin.",
    estimatedMinutes: 20,
    challenges: [
      {
        id: 'd7_c1',
        type: 'dialogue',
        instructionTr: "Kendini tanıt, mesleğini söyle ve günlük bir rutininden bahset (en az 3 cümle).",
        promptEn: "Introduce yourself, mention what you do, and describe one part of your daily routine.",
        expectedConcept: "My name is... I work as... In the morning, I usually...",
        hintTr: "Örnek: 'My name is Can. I am an engineer from Izmir. In the morning, I usually drink coffee and plan my day.'"
      },
      {
        id: 'd7_c2',
        type: 'vocab',
        instructionTr: "'improvement' veya 'confidence' kelimesini kullanarak İngilizce öğrenme hedefin hakkında bir cümle kur.",
        promptEn: "Write a sentence about your English learning goal using 'confidence' or 'improvement'.",
        expectedConcept: "I want to improve my confidence in English...",
        hintTr: "Örnek: 'My main goal is to speak with confidence and see daily improvement.'"
      },
      {
        id: 'd7_c3',
        type: 'rapid',
        instructionTr: "Restoranda sipariş verme ve kibarca hesap isteme diyaloğunu tek seferde canlandır.",
        promptEn: "Imagine you are finishing lunch. Say thank you for the meal and politely ask for the check.",
        expectedConcept: "Thank you for the delicious food. Could I have the bill, please?",
        hintTr: "Örnek: 'The meal was delicious, thank you! Could we have the bill, please?'"
      }
    ]
  },

  // ==================== HAFTA 2: SEYAHAT, YÖNLER & ŞEHİR HAYATI ====================
  {
    day: 8,
    week: 2,
    titleTr: 'Yön Bulma & Şehirde Gezinme',
    titleEn: 'Asking for Directions & City Navigation',
    category: 'Seyahat & Şehir',
    level: 'Orta (B1-B2)',
    objective: 'Yabancı bir şehirde yön sorma, harita yönergelerini anlama ve yol tarif etme.',
    expectedPattern: 'Excuse me, could you tell me how to get to [Place]? / Turn left at... / It is across from...',
    patternExplanation: 'Yön sorarken "Excuse me, how do I get to...?" veya daha kibar olan "Could you tell me where ... is?" kalıpları kullanılır. Yön verirken emir kipi (imperative): "Go straight", "Turn right", "Walk past" kullanılır.',
    patternExamples: [
      { en: "Excuse me, could you please tell me how to get to the Central Train Station?", tr: "Afedersiniz, Merkez Tren Garı'na nasıl gidebileceğimi söyleyebilir misiniz lütfen?" },
      { en: "Go straight for two blocks, then turn left at the traffic lights. It is on your right.", tr: "İki blok düz gidin, ardından trafik ışıklarından sola dönün. Sağınızda kalacak." }
    ],
    targetWords: [
      { word: 'Intersection', phonetic: '/ˌɪn.təˈsek.ʃən/', turkish: 'Kavşak / Dört yol', exampleEn: 'Turn right at the next intersection.', exampleTr: 'Bir sonraki kavşaktan sağa dönün.' },
      { word: 'Opposite', phonetic: '/ˈɒp.ə.zɪt/', turkish: 'Karşısında', exampleEn: 'The museum is opposite the public library.', exampleTr: 'Müze halk kütüphanesinin karşısındadır.' },
      { word: 'Pedestrian', phonetic: '/pəˈdes.tri.ən/', turkish: 'Yaya', exampleEn: 'This street is only for pedestrians.', exampleTr: 'Bu cadde yalnızca yayalar içindir.' },
      { word: 'Landmark', phonetic: '/ˈlænd.mɑːk/', turkish: 'Önemli nokta / Simge yapı', exampleEn: 'Big Ben is a famous London landmark.', exampleTr: 'Big Ben ünlü bir Londra simgesidir.' },
      { word: 'Within walking distance', phonetic: '/wɪˈðɪn ˈwɔː.kɪŋ ˈdɪs.təns/', turkish: 'Yürüme mesafesinde', exampleEn: 'Our hotel is within walking distance of the beach.', exampleTr: 'Otelimiz plaja yürüme mesafesindedir.' }
    ],
    initialPrompt: "Welcome to Week 2! You just arrived in London and your phone battery died. You need to reach the British Museum. How do you politely ask a stranger on the street for directions?",
    initialPromptTr: "2. Haftaya hoş geldiniz! Londra'ya yeni geldiniz ve telefonunuzun şarjı bitti. British Museum'a gitmeniz gerekiyor. Sokaktaki bir yabancıya kibarca yol tarifini nasıl sorarsınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd8_c1',
        type: 'pattern',
        instructionTr: "'Excuse me, could you tell me how to get to...' kalıbıyla müzeye gidişi sor.",
        promptEn: "Ask a pedestrian for directions to the British Museum using polite language.",
        expectedConcept: "Excuse me, could you tell me how to get to...",
        hintTr: "Örnek: 'Excuse me, could you please tell me how to get to the British Museum?'"
      },
      {
        id: 'd8_c2',
        type: 'vocab',
        instructionTr: "'opposite' veya 'intersection' kelimesini içeren bir yol tarifi cümlesi anla veya kur.",
        promptEn: "Describe where a building is using the word 'opposite' or 'intersection'.",
        expectedConcept: "It is opposite the bank / Turn left at the intersection",
        hintTr: "Örnek: 'You will find the pharmacy right opposite the post office.'"
      },
      {
        id: 'd8_c3',
        type: 'dialogue',
        instructionTr: "Yabancı sana tarif verdiğinde teşekkür edip yürüme mesafesinde olup olmadığını sor.",
        promptEn: "Thank the person and ask if the museum is within walking distance.",
        expectedConcept: "Thank you so much! Is it within walking distance?",
        hintTr: "Örnek: 'Thank you very much! By the way, is it within walking distance from here?'"
      }
    ]
  },
  {
    day: 9,
    week: 2,
    titleTr: 'Havalimanı & Pasaport Kontrolü',
    titleEn: 'Airport & Border Control',
    category: 'Seyahat',
    level: 'Orta (B1-B2)',
    objective: 'Havalimanında biniş kartı alma, bagaj teslimi, güvenlik kontrolü ve pasaport memuru sorularını yanıtlama.',
    expectedPattern: 'I am travelling for [business/tourism] / Here is my boarding pass / I will be staying for [duration]',
    patternExplanation: 'Pasaport kontrolünde net ve kesin cevaplar verilir: "What is the purpose of your visit?" sorusuna "The purpose of my visit is tourism" veya "I am here on business" denir.',
    patternExamples: [
      { en: "The purpose of my visit is tourism, and I will be staying for ten days.", tr: "Ziyaretimin amacı turizm ve on gün kalacağım." },
      { en: "Here is my passport and return flight ticket.", tr: "İşte pasaportum ve dönüş uçak biletim." }
    ],
    targetWords: [
      { word: 'Boarding pass', phonetic: '/ˈbɔː.dɪŋ ˌpɑːs/', turkish: 'Biniş kartı', exampleEn: 'Please have your boarding pass ready at gate 14.', exampleTr: 'Lütfen biniş kartınızı 14 numaralı kapıda hazır bulundurun.' },
      { word: 'Luggage / Baggage', phonetic: '/ˈlʌɡ.ɪdʒ/', turkish: 'Bagaj / Bavul', exampleEn: 'I need to check in two pieces of luggage.', exampleTr: 'İki parça bagaj teslim etmem gerekiyor.' },
      { word: 'Customs', phonetic: '/ˈkʌs.təmz/', turkish: 'Gümrük', exampleEn: 'Do you have anything to declare at customs?', exampleTr: 'Gümrükte beyan edeceğiniz bir şey var mı?' },
      { word: 'Purpose', phonetic: '/ˈpɜː.pəs/', turkish: 'Amaç / Sebep', exampleEn: 'What is the primary purpose of your travel?', exampleTr: 'Seyahatinizin birincil amacı nedir?' },
      { word: 'Departure', phonetic: '/dɪˈpɑː.tʃər/', turkish: 'Kalkış / Gidiş', exampleEn: 'Check the flight departure screen.', exampleTr: 'Uçuş kalkış ekranını kontrol edin.' }
    ],
    initialPrompt: "Good day! I am the immigration officer at the airport. May I see your passport? What is the purpose of your visit to the UK and how long will you stay?",
    initialPromptTr: "İyi günler! Ben havalimanındaki pasaport kontrol memuruyum. Pasaportunuzu görebilir miyim? Birleşik Krallık'ı ziyaret amacınız nedir ve ne kadar kalacaksınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd9_c1',
        type: 'dialogue',
        instructionTr: "Pasaport memuruna pasaportunu sun ve ziyaret amacının turizm/tatil olduğunu söyle.",
        promptEn: "Answer the officer: Hand over your passport and state that you are here for a vacation.",
        expectedConcept: "Here is my passport. The purpose of my visit is tourism.",
        hintTr: "Örnek: 'Here is my passport, officer. I am visiting for holiday and tourism.'"
      },
      {
        id: 'd9_c2',
        type: 'pattern',
        instructionTr: "Ne kadar süre kalacağını ve nerede konaklayacağını belirt.",
        promptEn: "Tell the officer how long you will stay and mention where you will lodge.",
        expectedConcept: "I will be staying for ... days at ...",
        hintTr: "Örnek: 'I will be staying for two weeks at a hotel in central London.'"
      },
      {
        id: 'd9_c3',
        type: 'vocab',
        instructionTr: "'luggage' veya 'boarding pass' kelimesini içeren bir cümle kur.",
        promptEn: "Use 'luggage' or 'boarding pass' in a sentence at the airport check-in desk.",
        expectedConcept: "I have one piece of luggage / Here is my boarding pass",
        hintTr: "Örnek: 'I have only one carry-on luggage and my mobile boarding pass.'"
      }
    ]
  },
  {
    day: 10,
    week: 2,
    titleTr: 'Otel Rezervasyonu & Konaklama Sorunları',
    titleEn: 'Hotel Check-in & Accommodation Requests',
    category: 'Seyahat',
    level: 'Orta (B1-B2)',
    objective: 'Otele giriş (check-in) yapma, olanakları sorma ve oda ile ilgili bir sorunu kibarca bildirme.',
    expectedPattern: 'I have a reservation under the name of... / Does the room include...? / There seems to be a problem with...',
    patternExplanation: 'Şikayet veya sorun bildirirken sert olmak yerine "There seems to be an issue with the air conditioning" (Klimada bir sorun var gibi görünüyor) şeklinde yumuşatıcı dil ("hedging") kullanılır.',
    patternExamples: [
      { en: "Hello, I have a reservation for two nights under the name of Demir.", tr: "Merhaba, Demir adına iki gecelik rezervasyonum var." },
      { en: "Excuse me, there seems to be a problem with the hot water in room 304.", tr: "Afedersiniz, 304 numaralı odada sıcak su ile ilgili bir sorun var gibi görünüyor." }
    ],
    targetWords: [
      { word: 'Reservation', phonetic: '/ˌrez.əˈveɪ.ʃən/', turkish: 'Rezervasyon', exampleEn: 'I booked a reservation online last week.', exampleTr: 'Geçen hafta internet üzerinden rezervasyon yaptım.' },
      { word: 'Amenities', phonetic: '/əˈmiː.nə.tiz/', turkish: 'Olanaklar / Tesis hizmetleri', exampleEn: 'The hotel amenities include a gym and pool.', exampleTr: 'Otel olanakları arasında spor salonu ve havuz bulunmaktadır.' },
      { word: 'Complimentary', phonetic: '/ˌkɒm.plɪˈmen.tər.i/', turkish: 'Ücretsiz / İkram', exampleEn: 'Breakfast is complimentary for all guests.', exampleTr: 'Kahvaltı tüm misafirler için ücretsiz bir ikramdır.' },
      { word: 'Issue', phonetic: '/ˈɪʃ.uː/', turkish: 'Sorun / Mesele', exampleEn: 'We will resolve this maintenance issue immediately.', exampleTr: 'Bu bakım sorununu derhal çözeceğiz.' },
      { word: 'Housekeeping', phonetic: '/ˈhaʊsˌkiː.pɪŋ/', turkish: 'Kat hizmetleri / Oda temizliği', exampleEn: 'Could you please send housekeeping to fresh up the towels?', exampleTr: 'Havluları yenilemek için kat hizmetlerini gönderebilir misiniz lütfen?' }
    ],
    initialPrompt: "Good afternoon, welcome to Grand Palace Hotel! How may I assist you today? Are you checking in?",
    initialPromptTr: "İyi günler, Grand Palace Hotel'e hoş geldiniz! Bugün size nasıl yardımcı olabilirim? Giriş mi yapıyorsunuz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd10_c1',
        type: 'pattern',
        instructionTr: "'under the name of...' kalıbıyla kendi adına rezervasyon olduğunu belirt.",
        promptEn: "Inform the receptionist that you have a reservation under your name for 3 nights.",
        expectedConcept: "I have a reservation under the name of...",
        hintTr: "Örnek: 'Hello, I have a reservation for three nights under the name of Kaya.'"
      },
      {
        id: 'd10_c2',
        type: 'vocab',
        instructionTr: "'complimentary' veya 'amenities' kelimesini kullanarak kahvaltı veya Wi-Fi durumunu sor.",
        promptEn: "Ask if breakfast or Wi-Fi is complimentary.",
        expectedConcept: "Is breakfast complimentary? / What amenities are included?",
        hintTr: "Örnek: 'Excuse me, is breakfast complimentary, and does the hotel have gym amenities?'"
      },
      {
        id: 'd10_c3',
        type: 'dialogue',
        instructionTr: "Odandaki Wi-Fi veya klimadaki bir arızayı 'There seems to be an issue with...' kalıbıyla kibarca bildir.",
        promptEn: "Politely report that the air conditioning or Wi-Fi in your room is not functioning.",
        expectedConcept: "There seems to be an issue with the ... in my room.",
        hintTr: "Örnek: 'Hello, there seems to be an issue with the air conditioning in room 205.'"
      }
    ]
  },
  {
    day: 11,
    week: 2,
    titleTr: 'Toplu Taşıma & Bilet Satın Alma',
    titleEn: 'Public Transit & Purchasing Tickets',
    category: 'Seyahat',
    level: 'Orta (B1-B2)',
    objective: 'Metro, tren ve otobüs sistemlerinde hat sorma, gidiş-dönüş bilet alma ve aktarma yapma.',
    expectedPattern: 'Which platform does the train to [City] depart from? / I would like a round-trip ticket to...',
    patternExplanation: 'Tek yön bilet "single / one-way ticket", gidiş-dönüş ise "return / round-trip ticket" olarak adlandırılır. Aktarma yapmak için "transfer / change trains" fiili kullanılır.',
    patternExamples: [
      { en: "Could I have a round-trip standard ticket to Oxford, please?", tr: "Oxford'a gidiş-dönüş standart bilet alabilir miyim lütfen?" },
      { en: "Do I need to transfer at the central station, or is this a direct train?", tr: "Merkez istasyonda aktarma yapmam gerekiyor mu, yoksa bu direkt bir tren mi?" }
    ],
    targetWords: [
      { word: 'Platform', phonetic: '/ˈplæt.fɔːm/', turkish: 'Peron', exampleEn: 'The train to Cambridge departs from platform 4.', exampleTr: 'Cambridge treni 4 numaralı perondan kalkıyor.' },
      { word: 'Round-trip / Return', phonetic: '/ˌraʊndˈtrɪp/', turkish: 'Gidiş-dönüş', exampleEn: 'A round-trip ticket is often cheaper than two singles.', exampleTr: 'Gidiş-dönüş bilet genellikle iki tek yönden daha ucuzdur.' },
      { word: 'Transfer / Change', phonetic: '/trænsˈfɜːr/', turkish: 'Aktarma yapmak', exampleEn: 'You need to transfer at Piccadilly Circus.', exampleTr: 'Piccadilly Circus durağında aktarma yapmanız gerekir.' },
      { word: 'Delay', phonetic: '/dɪˈleɪ/', turkish: 'Rötar / Gecikme', exampleEn: 'The express bus was delayed due to heavy traffic.', exampleTr: 'Ekspres otobüs yoğun trafik nedeniyle rötar yaptı.' },
      { word: 'Valid', phonetic: '/ˈvæl.ɪd/', turkish: 'Geçerli', exampleEn: 'This travel card is valid for seven days.', exampleTr: 'Bu seyahat kartı yedi gün boyunca geçerlidir.' }
    ],
    initialPrompt: "Ticket office here! Where are you traveling to today, and would you like a one-way or return ticket?",
    initialPromptTr: "Bilet gişesi! Bugün nereye seyahat ediyorsunuz ve tek yön mü yoksa gidiş-dönüş bilet mi istersiniz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd11_c1',
        type: 'pattern',
        instructionTr: "'I would like a return ticket to...' kalıbıyla Manchester'a gidiş-dönüş bilet iste.",
        promptEn: "Ask the clerk for a return ticket to Manchester.",
        expectedConcept: "I would like a round-trip/return ticket to...",
        hintTr: "Örnek: 'Hello, I would like a return ticket to Manchester for tomorrow morning, please.'"
      },
      {
        id: 'd11_c2',
        type: 'vocab',
        instructionTr: "'platform' veya 'transfer' kelimesini kullanarak trenin hangi perondan kalkacağını veya aktarmayı sor.",
        promptEn: "Ask which platform the train leaves from or if you need to transfer.",
        expectedConcept: "Which platform does it leave from? / Do I need to transfer?",
        hintTr: "Örnek: 'Which platform does this train leave from, and do I need to change trains?'"
      },
      {
        id: 'd11_c3',
        type: 'dialogue',
        instructionTr: "Biletin kaç gün geçerli olduğunu 'valid' kelimesini kullanarak sor.",
        promptEn: "Inquire how long this travel pass is valid.",
        expectedConcept: "How long is this ticket valid for?",
        hintTr: "Örnek: 'How many days is this travel card valid for?'"
      }
    ]
  },
  {
    day: 12,
    week: 2,
    titleTr: 'Alışveriş, Beden Sorma & İade',
    titleEn: 'Shopping, Sizing & Returns',
    category: 'Pratik Yaşam',
    level: 'Orta (B1-B2)',
    objective: 'Giyim ve teknoloji mağazalarında ürün sorma, deneme kabini arama ve iade koşullarını konuşma.',
    expectedPattern: 'Do you have this in a size [M/L]? / Can I try this on? / What is your return policy?',
    patternExplanation: '"Try on" elbiseyi üzerine denemek anlamına gelen ayrılabilen bir öbek fiildir (phrasal verb): "Can I try it on?". Beden sorarken "in a size..." yapısı kullanılır.',
    patternExamples: [
      { en: "Excuse me, do you have this wool coat in a medium size?", tr: "Afedersiniz, bu yün paltonun medium bedeni var mı?" },
      { en: "Where are the fitting rooms? I would like to try these trousers on.", tr: "Deneme kabinleri nerede? Bu pantolonu üzerimde denemek istiyorum." }
    ],
    targetWords: [
      { word: 'Fitting room', phonetic: '/ˈfɪt.ɪŋ ˌruːm/', turkish: 'Deneme kabini', exampleEn: 'The fitting rooms are located at the back of the store.', exampleTr: 'Deneme kabinleri mağazanın arka tarafında yer almaktadır.' },
      { word: 'Refund', phonetic: '/ˈriː.fʌnd/', turkish: 'Para iadesi', exampleEn: 'Can I get a full refund if I keep the receipt?', exampleTr: 'Fişi saklarsam tam para iadesi alabilir miyim?' },
      { word: 'Available', phonetic: '/əˈveɪ.lə.bəl/', turkish: 'Mevcut / Elde bulunan', exampleEn: 'Is this model available in navy blue?', exampleTr: 'Bu model lacivert renkte mevcut mu?' },
      { word: 'Exchange', phonetic: '/ɪksˈtʃeɪndʒ/', turkish: 'Değişim yapmak', exampleEn: 'I would like to exchange this for a larger size.', exampleTr: 'Bunu daha büyük bir bedenle değiştirmek istiyorum.' },
      { word: 'Quality', phonetic: '/ˈkwɒl.ə.ti/', turkish: 'Kalite', exampleEn: 'The fabric quality is exceptional.', exampleTr: 'Kumaş kalitesi olağanüstü.' }
    ],
    initialPrompt: "Hi there! Welcome to our flagship store. Are you looking for anything specific today?",
    initialPromptTr: "Merhaba! Mağazamıza hoş geldiniz. Bugün özel olarak aradığınız bir şey var mı?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd12_c1',
        type: 'pattern',
        instructionTr: "Görevliye bir ceketin medium veya large bedeni olup olmadığını sor.",
        promptEn: "Ask if they have a jacket in size medium or large.",
        expectedConcept: "Do you have this jacket in a size medium?",
        hintTr: "Örnek: 'Excuse me, do you have this dark jacket in a size medium?'"
      },
      {
        id: 'd12_c2',
        type: 'pattern',
        instructionTr: "'try on' ve 'fitting room' ifadelerini kullanarak denemek istediğini söyle.",
        promptEn: "Ask where the fitting room is because you want to try it on.",
        expectedConcept: "Where is the fitting room? I'd like to try it on.",
        hintTr: "Örnek: 'Could you tell me where the fitting rooms are? I would love to try this on.'"
      },
      {
        id: 'd12_c3',
        type: 'vocab',
        instructionTr: "'refund' veya 'exchange' kelimesini kullanarak mağazanın iade politikasını sor.",
        promptEn: "Inquire about the store's return policy or how to get a refund.",
        expectedConcept: "What is your refund policy? / Can I exchange this?",
        hintTr: "Örnek: 'If it does not fit, can I get a refund within 14 days?'"
      }
    ]
  },
  {
    day: 13,
    week: 2,
    titleTr: 'Sağlık, Eczane & Acil Durumlar',
    titleEn: 'Health, Pharmacy & Emergency Situations',
    category: 'Pratik Yaşam',
    level: 'Orta (B1-B2)',
    objective: 'Hastalık semptomlarını anlatma, eczaneden reçetesiz ilaç isteme ve acil yardım çağrısı yapma.',
    expectedPattern: 'I have a sore throat / I feel dizzy / Could you recommend something for [symptom]?',
    patternExplanation: 'Ağrı ve rahatsızlıkları belirtirken "I have a headache / sore throat / stomachache" veya "I feel nauseous / dizzy" kullanılır.',
    patternExamples: [
      { en: "I have had a severe headache and fever since yesterday morning.", tr: "Dün sabahtan beri şiddetli bir baş ağrım ve ateşim var." },
      { en: "Could you recommend an effective painkiller for a sprained ankle?", tr: "Burkulan ayak bileği için etkili bir ağrı kesici tavsiye edebilir misiniz?" }
    ],
    targetWords: [
      { word: 'Prescription', phonetic: '/prɪˈskrɪp.ʃən/', turkish: 'Reçete', exampleEn: 'Do I need a doctor\'s prescription for this medicine?', exampleTr: 'Bu ilaç için doktor reçetesine ihtiyacım var mı?' },
      { word: 'Symptom', phonetic: '/ˈsɪmp.təm/', turkish: 'Belirti / Semptom', exampleEn: 'What are your primary symptoms?', exampleTr: 'Birincil semptomlarınız nelerdir?' },
      { word: 'Painkiller', phonetic: '/ˈpeɪnˌkɪl.ər/', turkish: 'Ağrı kesici', exampleEn: 'Take one painkiller every eight hours.', exampleTr: 'Her sekiz saatte bir ağrı kesici alın.' },
      { word: 'Dizzy', phonetic: '/ˈdɪz.i/', turkish: 'Başı dönen', exampleEn: 'I feel slightly dizzy when standing up.', exampleTr: 'Ayağa kalktığımda hafifçe başım dönüyor.' },
      { word: 'Emergency', phonetic: '/ɪˈmɜː.dʒən.si/', turkish: 'Acil durum', exampleEn: 'Call the emergency services immediately.', exampleTr: 'Derhal acil servisleri arayın.' }
    ],
    initialPrompt: "Good morning, this is the community pharmacy. How can I help you today? Are you experiencing any symptoms?",
    initialPromptTr: "Günaydın, burası mahalle eczanesi. Bugün size nasıl yardımcı olabilirim? Herhangi bir belirti yaşıyor musunuz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd13_c1',
        type: 'pattern',
        instructionTr: "Boğaz ağrısı ve hafif ateşin olduğunu söyleyerek durumunu açıkla.",
        promptEn: "Tell the pharmacist that you have a sore throat and a slight fever.",
        expectedConcept: "I have a sore throat and a fever...",
        hintTr: "Örnek: 'Good morning, I have had a severe sore throat and a fever for two days.'"
      },
      {
        id: 'd13_c2',
        type: 'vocab',
        instructionTr: "'prescription' veya 'painkiller' kelimesini kullanarak reçetesiz bir ilaç önerisi iste.",
        promptEn: "Ask if they can recommend an over-the-counter painkiller without a prescription.",
        expectedConcept: "Can you recommend a painkiller? / Do I need a prescription?",
        hintTr: "Örnek: 'Could you recommend an effective painkiller that does not require a prescription?'"
      },
      {
        id: 'd13_c3',
        type: 'dialogue',
        instructionTr: "Eczacıya ilacı günde kaç kez ve tok karnına mı aç karnına mı alacağını sor.",
        promptEn: "Ask the pharmacist how often you should take the medication and if it should be taken with food.",
        expectedConcept: "How many times a day should I take this? Should I take it with food?",
        hintTr: "Örnek: 'How often should I take this medicine, and should I take it before or after meals?'"
      }
    ]
  },
  {
    day: 14,
    week: 2,
    titleTr: '2. Hafta Seyahat Rol Yapma Simülasyonu',
    titleEn: 'Week 2 Travel Role-play & Situation Simulation',
    category: 'Haftalık Değerlendirme',
    level: 'Orta (B1-B2)',
    objective: 'Yol tarifi, havalimanı, otel check-in ve toplu taşıma durumlarını canlı bir seyahat senaryosunda birleştirme.',
    expectedPattern: 'Spontaneous communicative travel responses combining past, present, and modal verbs.',
    patternExplanation: '2. Haftada öğrendiğiniz tüm seyahat kelimelerini birleştirin. Sorun çözme ve nezaket kalıplarını akıcı bir şekilde uygulayın.',
    patternExamples: [
      { en: "Excuse me, I just arrived by train and need to check into the Grand Hotel. Could you tell me if it is within walking distance?", tr: "Afedersiniz, trenle yeni geldim ve Grand Hotel'e giriş yapmam gerekiyor. Yürüme mesafesinde olup olmadığını söyleyebilir misiniz?" }
    ],
    targetWords: [
      { word: 'Itinerary', phonetic: '/aɪˈtɪn.ər.ər.i/', turkish: 'Seyahat planı / Güzergah', exampleEn: 'Here is our detailed travel itinerary.', exampleTr: 'İşte detaylı seyahat güzergahımız.' },
      { word: 'Assistance', phonetic: '/əˈsɪs.təns/', turkish: 'Yardım / Destek', exampleEn: 'Thank you for your kind assistance.', exampleTr: 'Nazik yardımınız için teşekkür ederim.' },
      { word: 'Destination', phonetic: '/ˌdes.tɪˈneɪ.ʃən/', turkish: 'Varış noktası / Hedef', exampleEn: 'We will reach our destination by noon.', exampleTr: 'Öğlene kadar varış noktamıza ulaşacağız.' },
      { word: 'Convenient', phonetic: '/kənˈviː.ni.ənt/', turkish: 'Kullanışlı / Elverişli', exampleEn: 'The metro is the most convenient option.', exampleTr: 'Metro en elverişli seçenektir.' },
      { word: 'Memorable', phonetic: '/ˈmem.ər.ə.bəl/', turkish: 'Unutulmaz', exampleEn: 'It has been a truly memorable trip.', exampleTr: 'Gerçekten unutulmaz bir seyahat oldu.' }
    ],
    initialPrompt: "Welcome to Day 14! You are standing in the middle of a lively European city on your travel adventure. Tell me about your journey so far: Where did you stay, how did you travel, and what is your favorite landmark so far?",
    initialPromptTr: "14. Güne hoş geldiniz! Seyahat maceranızda hareketli bir Avrupa şehrinin ortasındasınız. Şu ana kadarki seyahatinizi anlatın: Nerede kaldınız, nasıl seyahat ettiniz ve şimdiye kadarki en sevdiğiniz simge yapı hangisi?",
    estimatedMinutes: 20,
    challenges: [
      {
        id: 'd14_c1',
        type: 'dialogue',
        instructionTr: "Kaldığın oteli ve şehirdeki ulaşım yöntemini (metro, tren) özetleyen 2-3 cümlelik bir seyahat özeti yaz.",
        promptEn: "Summarize your hotel stay and how you traveled around the city using public transit.",
        expectedConcept: "I stayed at ... and traveled by ... which was convenient.",
        hintTr: "Örnek: 'I stayed at a boutique hotel near the center. I used the underground metro to visit historical landmarks.'"
      },
      {
        id: 'd14_c2',
        type: 'vocab',
        instructionTr: "'convenient' veya 'itinerary' kelimesini kullanarak seyahatinin bir avantajından bahset.",
        promptEn: "Use the word 'convenient' or 'itinerary' to describe your journey.",
        expectedConcept: "The location was convenient / Following the itinerary was easy...",
        hintTr: "Örnek: 'Taking the high-speed train was extremely convenient for our daily itinerary.'"
      },
      {
        id: 'd14_c3',
        type: 'rapid',
        instructionTr: "Karşılaştığın küçük bir sorunu (örn. gecikme veya kayıp yön) ve bunu nasıl çözdüğünü anlat.",
        promptEn: "Explain a small challenge you faced during travel (e.g. a train delay) and how you solved it.",
        expectedConcept: "There was a delay, so I asked for assistance and...",
        hintTr: "Örnek: 'Our train experienced a short delay, so I asked the information desk for assistance.'"
      }
    ]
  },

  // ==================== HAFTA 3: İŞ DÜNYASI & KARİYER ====================
  {
    day: 15,
    week: 3,
    titleTr: 'İş Mülakatı & Mesleki Deneyim',
    titleEn: 'Job Interview & Career Background',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'Geçmiş tecrübeleri Present Perfect ve Past Simple ile etkili biçimde sunma, güçlü yönleri vurgulama.',
    expectedPattern: 'I have been working as [Role] for [X years] / My key strengths include [A, B, and C].',
    patternExplanation: 'Halen devam eden deneyimler için Present Perfect Continuous ("I have been working as an analyst for three years"), tamamlanmış projeler için Past Simple kullanılır.',
    patternExamples: [
      { en: "I have been working as a senior product designer for over four years, leading cross-functional teams.", tr: "Dört yılı aşkın süredir fonksiyonlar arası ekiplere liderlik ederek kıdemli ürün tasarımcısı olarak çalışıyorum." },
      { en: "One of my greatest strengths is problem-solving under tight deadlines.", tr: "En büyük güçlü yönlerimden biri, sıkı teslim tarihleri altında problem çözebilmektir." }
    ],
    targetWords: [
      { word: 'Expertise', phonetic: '/ˌek.spɜːˈtiːz/', turkish: 'Uzmanlık', exampleEn: 'Her technical expertise brought immense value.', exampleTr: 'Teknik uzmanlığı muazzam bir değer kattı.' },
      { word: 'Accomplish', phonetic: '/əˈkʌm.plɪʃ/', turkish: 'Başarmak / Tamamlamak', exampleEn: 'We accomplished all quarterly milestones.', exampleTr: 'Tüm çeyrek hedeflerini başarıyla tamamladık.' },
      { word: 'Collaborative', phonetic: '/kəˈlæb.ər.ə.tɪv/', turkish: 'İş birliğine dayalı', exampleEn: 'I thrive in an open, collaborative environment.', exampleTr: 'Açık ve iş birliğine dayalı bir ortamda başarılı olurum.' },
      { word: 'Leadership', phonetic: '/ˈliː.də.ʃɪp/', turkish: 'Liderlik', exampleEn: 'She demonstrated exceptional leadership skills.', exampleTr: 'Olağanüstü liderlik becerileri sergiledi.' },
      { word: 'Responsibility', phonetic: '/rɪˌspɒn.sɪˈbɪl.ə.ti/', turkish: 'Sorumluluk', exampleEn: 'My primary responsibility was project coordination.', exampleTr: 'Birincil sorumluluğum proje koordinasyonuydu.' }
    ],
    initialPrompt: "Good morning and welcome to your interview at Global Innovations! Tell me about yourself: What is your professional background, and why are you interested in this position?",
    initialPromptTr: "Günaydın ve Global Innovations'taki mülakatınıza hoş geldiniz! Kendinizden bahsedin: Mesleki geçmişiniz nedir ve bu pozisyonla neden ilgileniyorsunuz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd15_c1',
        type: 'pattern',
        instructionTr: "'I have been working as...' kalıbını kullanarak mesleğini ve deneyim süreni belirt.",
        promptEn: "Summarize your career experience using 'I have been working as [Role] for [X years]'.",
        expectedConcept: "I have been working as ... for ... years.",
        hintTr: "Örnek: 'I have been working as a software developer for five years, building web applications.'"
      },
      {
        id: 'd15_c2',
        type: 'vocab',
        instructionTr: "'expertise' veya 'collaborative' kelimesini kullanarak en büyük gücünü açıkla.",
        promptEn: "Describe your strongest skill using 'expertise' or 'collaborative'.",
        expectedConcept: "My core expertise lies in ... / I have a collaborative mindset...",
        hintTr: "Örnek: 'My primary expertise lies in data analysis, and I excel in collaborative team settings.'"
      },
      {
        id: 'd15_c3',
        type: 'dialogue',
        instructionTr: "Geçmişte başardığın önemli bir projeyi 'accomplish' kelimesiyle anlat.",
        promptEn: "Mention a significant achievement from your previous role using 'accomplish'.",
        expectedConcept: "In my last role, I accomplished...",
        hintTr: "Örnek: 'In my previous position, I accomplished a 25% increase in operational efficiency.'"
      }
    ]
  },
  {
    day: 16,
    week: 3,
    titleTr: 'Profesyonel E-posta & İş Yazışmaları',
    titleEn: 'Professional Email Writing & Inquiries',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'Resmi e-posta açılışları, ek dosya referansları ve nezaketle takip mesajı yazma.',
    expectedPattern: 'I am writing to inquire about... / Please find attached... / I look forward to hearing from you.',
    patternExplanation: '"I look forward to" ifadesinden sonra isim veya -ing alan fiil gelir: "I look forward to meeting you" (meet değil meeting!).',
    patternExamples: [
      { en: "Dear Mr. Davies, I am writing to inquire about the timeline for the upcoming marketing campaign.", tr: "Sayın Bay Davies, yaklaşan pazarlama kampanyasının zaman çizelgesi hakkında bilgi almak için yazıyorum." },
      { en: "Please find attached the revised proposal. I look forward to your valuable feedback.", tr: "Lütfen ekte revize edilmiş teklifi bulunuz. Değerli geri bildirimlerinizi bekliyorum." }
    ],
    targetWords: [
      { word: 'Attached', phonetic: '/əˈtætʃt/', turkish: 'Ekli / Ekteki', exampleEn: 'Please find attached the quarterly financial report.', exampleTr: 'Lütfen ekte üç aylık finansal raporu bulabilirsiniz.' },
      { word: 'Inquire', phonetic: '/ɪnˈkwaɪər/', turkish: 'Soruşturmak / Bilgi istemek', exampleEn: 'I am writing to inquire about your consulting rates.', exampleTr: 'Danışmanlık ücretleriniz hakkında bilgi almak için yazıyorum.' },
      { word: 'Regarding', phonetic: '/rɪˈɡɑː.dɪŋ/', turkish: 'İlişkin / İle ilgili', exampleEn: 'I have a quick question regarding the deadline.', exampleTr: 'Teslim tarihi ile ilgili kısa bir sorum var.' },
      { word: 'Appreciate', phonetic: '/əˈpriː.ʃi.eɪt/', turkish: 'Takdir etmek / Memnun olmak', exampleEn: 'I would greatly appreciate your prompt response.', exampleTr: 'Hızlı yanıtınız beni son derece memnun edecektir.' },
      { word: 'Urgent', phonetic: '/ˈɜː.dʒənt/', turkish: 'Acil', exampleEn: 'This matter requires urgent attention.', exampleTr: 'Bu konu acil dikkat gerektirmektedir.' }
    ],
    initialPrompt: "Imagine you are emailing a client or vendor to request an updated project timeline and quote. How would you compose the opening and body of this professional email?",
    initialPromptTr: "Bir müşteriye veya tedarikçiye güncellenmiş proje takvimi ve fiyat teklifi istemek üzere e-posta yazdığınızı düşünün. Bu profesyonel e-postanın açılışını ve gövdesini nasıl kurgularsınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd16_c1',
        type: 'pattern',
        instructionTr: "'I am writing to inquire about...' kalıbıyla resmi bir e-posta giriş cümlesi yaz.",
        promptEn: "Write the opening line of a formal email inquiring about project details.",
        expectedConcept: "Dear ..., I am writing to inquire about...",
        hintTr: "Örnek: 'Dear Ms. Smith, I am writing to inquire about the project deliverables for next month.'"
      },
      {
        id: 'd16_c2',
        type: 'vocab',
        instructionTr: "'attached' ve 'regarding' kelimelerini içeren bir dosya ekleme cümlesi kur.",
        promptEn: "Inform the recipient that you attached the document regarding the meeting.",
        expectedConcept: "Please find attached the document regarding...",
        hintTr: "Örnek: 'Please find attached the updated presentation regarding our partnership proposal.'"
      },
      {
        id: 'd16_c3',
        type: 'pattern',
        instructionTr: "'I look forward to hearing from you' veya 'appreciate' ile kibar bir kapanış cümlesi yaz.",
        promptEn: "Write a professional closing sentence requesting a prompt reply.",
        expectedConcept: "I look forward to hearing from you / I would appreciate your feedback",
        hintTr: "Örnek: 'I would greatly appreciate your feedback and look forward to hearing from you soon.'"
      }
    ]
  },
  {
    day: 17,
    week: 3,
    titleTr: 'Toplantılarda Fikir Belirtme & Tartışma',
    titleEn: 'Expressing Opinions & Debating in Meetings',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'İş toplantılarında söz alma, kibarca katılmama veya fikir geliştirme.',
    expectedPattern: 'In my view... / I see your point, but... / Could you clarify what you mean by...?',
    patternExplanation: 'Fikirlere itiraz ederken doğrudan "You are wrong" demek kabadır. "I see your point, however we should also consider..." (Görüşünüzü anlıyorum, ancak şunu da göz önünde bulundurmalıyız) şeklinde diplomasi uygulanır.',
    patternExamples: [
      { en: "In my opinion, prioritizing user experience will yield higher retention in the long run.", tr: "Bana göre, kullanıcı deneyimine öncelik vermek uzun vadede daha yüksek elde tutma sağlayacaktır." },
      { en: "I agree with your analysis; however, have we considered the budget constraints?", tr: "Analizinize katılıyorum; ancak bütçe kısıtlamalarını göz önünde bulundurduk mu?" }
    ],
    targetWords: [
      { word: 'Perspective', phonetic: '/pəˈspek.tɪv/', turkish: 'Bakış açısı', exampleEn: 'From my perspective, this strategy is sustainable.', exampleTr: 'Benim bakış açımdan bu strateji sürdürülebilirdir.' },
      { word: 'Clarify', phonetic: '/ˈklær.ɪ.faɪ/', turkish: 'Açıklığa kavuşturmak / Netleştirmek', exampleEn: 'Could you clarify the second objective?', exampleTr: 'İkinci hedefi açıklığa kavuşturabilir misiniz?' },
      { word: 'Consensus', phonetic: '/kənˈsen.səs/', turkish: 'Fikir birliği / Uzlaşı', exampleEn: 'We need to reach a consensus before moving forward.', exampleTr: 'İlerlemeden önce bir fikir birliğine varmamız gerekiyor.' },
      { word: 'Feasible', phonetic: '/ˈfiː.zə.bəl/', turkish: 'Uygulanabilir / Fizıbıl', exampleEn: 'Is this technical solution feasible within two weeks?', exampleTr: 'Bu teknik çözüm iki hafta içinde uygulanabilir mi?' },
      { word: 'Prioritize', phonetic: '/praɪˈɒr.ɪ.taɪz/', turkish: 'Önceliklendirmek', exampleEn: 'We must prioritize client security above all.', exampleTr: 'Her şeyden önce müşteri güvenliğini önceliklendirmeliyiz.' }
    ],
    initialPrompt: "We are currently in a product strategy meeting. Someone suggested cutting testing time to launch two weeks earlier. How do you voice your respectful disagreement or alternative view?",
    initialPromptTr: "Şu anda bir ürün stratejisi toplantısındayız. Biri, iki hafta erken piyasaya sürmek için test süresini kısaltmayı önerdi. Saygılı itirazınızı veya alternatif görüşünüzü nasıl dile getirirsiniz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd17_c1',
        type: 'pattern',
        instructionTr: "'I see your point, however...' kalıbıyla öneriye kibarca itiraz et.",
        promptEn: "Respectfully disagree with skipping testing using diplomatic phrasing.",
        expectedConcept: "I see your point, however skipping tests could...",
        hintTr: "Örnek: 'I see your point regarding speed; however, reducing test time might risk quality.'"
      },
      {
        id: 'd17_c2',
        type: 'vocab',
        instructionTr: "'feasible' veya 'prioritize' kelimesini kullanarak gerçekçi bir alternatif sun.",
        promptEn: "Suggest what the team should prioritize instead.",
        expectedConcept: "We should prioritize ... to ensure it is feasible.",
        hintTr: "Örnek: 'It would be more feasible if we prioritize core features first.'"
      },
      {
        id: 'd17_c3',
        type: 'dialogue',
        instructionTr: "Toplantıdaki bir detayı netleştirmek için 'clarify' kelimesiyle soru sor.",
        promptEn: "Ask a colleague to clarify what the potential risk would be.",
        expectedConcept: "Could you clarify what the main risk is?",
        hintTr: "Örnek: 'Could you please clarify how this decision impacts our customer support team?'"
      }
    ]
  },
  {
    day: 18,
    week: 3,
    titleTr: 'Problem Çözme & Kriz Yönetimi',
    titleEn: 'Problem Solving & Crisis Management',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'İş yerinde beklenmedik problemleri raporlama, acil eylem planı oluşturma ve çözüm sunma.',
    expectedPattern: 'The issue is that [problem] / To address this, we should... / As a solution, I propose...',
    patternExplanation: 'Kriz anlarında sorundan çok çözüme odaklanan bir ton esastır. "To address this issue" veya "I propose that we..." yapıları proaktifliği gösterir.',
    patternExamples: [
      { en: "The main issue is that the database server experienced unexpected downtime.", tr: "Temel sorun, veritabanı sunucusunun beklenmedik bir kesinti yaşamasıdır." },
      { en: "To address this immediately, I propose rolling back to the last stable release.", tr: "Bunu derhal çözmek için, son kararlı sürüme geri dönmeyi öneriyorum." }
    ],
    targetWords: [
      { word: 'Mitigate', phonetic: '/ˈmɪt.ɪ.ɡeɪt/', turkish: 'Hafifletmek / Azaltmak (riski)', exampleEn: 'We took swift measures to mitigate financial risk.', exampleTr: 'Finansal riski hafifletmek için hızlı önlemler aldık.' },
      { word: 'Bottleneck', phonetic: '/ˈbɒt.əl.nek/', turkish: 'Tıkanıklık noktası / Darboğaz', exampleEn: 'Manual reviews have become a major bottleneck.', exampleTr: 'Manuel incelemeler büyük bir darboğaz haline geldi.' },
      { word: 'Contingency', phonetic: '/kənˈtɪn.dʒən.si/', turkish: 'Beklenmedik durum / Acil durum planı', exampleEn: 'We need a solid contingency plan for server outages.', exampleTr: 'Sunucu kesintileri için sağlam bir acil durum planına ihtiyacımız var.' },
      { word: 'Resolve', phonetic: '/rɪˈzɒlv/', turkish: 'Çözüme kavuşturmak', exampleEn: 'Our technical team resolved the glitch in an hour.', exampleTr: 'Teknik ekibimiz aksaklığı bir saat içinde çözüme kavuşturdu.' },
      { word: 'Escalate', phonetic: '/ˈes.kə.leɪt/', turkish: 'Tırmandırmak / Üst mercie iletmek', exampleEn: 'If the bug persists, escalate it to the lead architect.', exampleTr: 'Hata devam ederse baş mimara iletin.' }
    ],
    initialPrompt: "Emergency alert: A major delivery for our top customer is delayed due to a supply chain issue. How do you report this to the team and propose a contingency solution?",
    initialPromptTr: "Acil durum uyarısı: Tedarik zinciri sorunu nedeniyle en büyük müşterimize yapılacak önemli bir teslimat gecikti. Bunu ekibe nasıl raporlarsınız ve nasıl bir çözüm önerirsiniz?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd18_c1',
        type: 'pattern',
        instructionTr: "'The issue is that...' kalıbıyla teslimat gecikmesini açıkla.",
        promptEn: "Explain the current problem clearly using 'The issue is that...'.",
        expectedConcept: "The issue is that the delivery is delayed because...",
        hintTr: "Örnek: 'The issue is that the primary shipment has been delayed due to supplier shortages.'"
      },
      {
        id: 'd18_c2',
        type: 'vocab',
        instructionTr: "'mitigate' veya 'contingency' kelimesini kullanarak bir acil durum planı sun.",
        promptEn: "Propose a solution using 'mitigate' or 'contingency plan'.",
        expectedConcept: "To mitigate the risk, we have activated our contingency plan...",
        hintTr: "Örnek: 'To mitigate the impact on the client, we should deploy our contingency stock.'"
      },
      {
        id: 'd18_c3',
        type: 'dialogue',
        instructionTr: "Sorunun çözülmesi için ne kadar süre öngördüğünü bildir.",
        promptEn: "Provide an estimated timeline for resolving the issue.",
        expectedConcept: "We expect to resolve this issue within...",
        hintTr: "Örnek: 'We are working diligently and expect to fully resolve this by tomorrow noon.'"
      }
    ]
  },
  {
    day: 19,
    week: 3,
    titleTr: 'Sunum Yapma & Veri Yorumlama',
    titleEn: 'Giving Presentations & Explaining Trends',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'Grafik ve verileri açıklama, artış/azalış trendlerini zengin fiil ve zarflarla ifade etme.',
    expectedPattern: 'As you can see from this chart... / There has been a significant increase in... / In summary...',
    patternExplanation: 'Trend anlatırken sıradan "go up/down" yerine "increase sharply", "drop significantly", "remain steady", "reach a peak" gibi zengin vokabüler kullanılır.',
    patternExamples: [
      { en: "As you can see from the quarterly graph, user engagement rose significantly by 35 percent.", tr: "Üç aylık grafikten görebileceğiniz gibi, kullanıcı etkileşimi yüzde 35 oranında belirgin şekilde arttı." },
      { en: "In summary, optimizing the checkout flow led to a dramatic surge in conversions.", tr: "Özetle, ödeme akışını optimize etmek dönüşümlerde çarpıcı bir artışa yol açtı." }
    ],
    targetWords: [
      { word: 'Significant', phonetic: '/sɪɡˈnɪf.ɪ.kənt/', turkish: 'Önemli / Belirgin', exampleEn: 'We noticed a significant growth in international sales.', exampleTr: 'Uluslararası satışlarda belirgin bir büyüme fark ettik.' },
      { word: 'Fluctuate', phonetic: '/ˈflʌk.tʃu.eɪt/', turkish: 'Dalgalanmak', exampleEn: 'Raw material prices fluctuated throughout the year.', exampleTr: 'Hammadde fiyatları yıl boyunca dalgalandı.' },
      { word: 'Illustrate', phonetic: '/ˈɪl.ə.streɪt/', turkish: 'Göstermek / Resmetmek', exampleEn: 'This diagram illustrates our quarterly revenue growth.', exampleTr: 'Bu diyagram üç aylık gelir büyümemizi göstermektedir.' },
      { word: 'Surge', phonetic: '/sɜːdʒ/', turkish: 'Hızlı artış / Ani yükseliş', exampleEn: 'There was a sudden surge in mobile traffic.', exampleTr: 'Mobil trafikte ani bir yükseliş yaşandı.' },
      { word: 'Summary', phonetic: '/ˈsʌm.ər.i/', turkish: 'Özet', exampleEn: 'To provide a brief summary of the key findings...', exampleTr: 'Temel bulguların kısa bir özetini sunmak gerekirse...' }
    ],
    initialPrompt: "Good morning investors and stakeholders! You have the floor. Present the recent performance of your project using key metrics and visual references.",
    initialPromptTr: "Günaydın yatırımcılar ve paydaşlar! Söz sizde. Temel metrikleri ve görsel referansları kullanarak projenizin son performansını sunun.",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd19_c1',
        type: 'pattern',
        instructionTr: "'As you can see from this chart...' kalıbıyla sunumuna başla ve bir artıştan bahset.",
        promptEn: "Open your slide presentation by pointing out a positive metric on the chart.",
        expectedConcept: "As you can see from this chart, there has been an increase in...",
        hintTr: "Örnek: 'As you can see from this chart, our active user base grew by 40% this quarter.'"
      },
      {
        id: 'd19_c2',
        type: 'vocab',
        instructionTr: "'significant' veya 'surge' kelimesini kullanarak performansı vurgula.",
        promptEn: "Describe a trend using 'significant' or 'surge'.",
        expectedConcept: "We observed a significant surge in customer inquiries...",
        hintTr: "Örnek: 'We experienced a significant surge in online orders following the redesign.'"
      },
      {
        id: 'd19_c3',
        type: 'pattern',
        instructionTr: "'In summary...' veya 'To conclude...' diyerek sunumunu bağla.",
        promptEn: "Deliver a strong concluding sentence for your presentation.",
        expectedConcept: "In summary, our key takeaway is that...",
        hintTr: "Örnek: 'In summary, investing in product quality continues to drive sustainable long-term revenue.'"
      }
    ]
  },
  {
    day: 20,
    week: 3,
    titleTr: 'Telefonda İletişim & Randevu Yönetimi',
    titleEn: 'Phone Etiquette & Managing Appointments',
    category: 'İş İngilizcesi',
    level: 'İleri (B2-C1)',
    objective: 'Telefonda resmi konuşma, birini hatta bekletme, mesaj bırakma ve toplantı erteleme.',
    expectedPattern: 'May I speak with [Name]? / Could you hold on for a moment? / Would it be possible to reschedule...?',
    patternExplanation: 'Telefon görüşmelerinde "Who are you?" kabadır; "May I ask who is calling?" tercih edilir. "Reschedule" toplantı tarihini değiştirmek için anahtar kelimedir.',
    patternExamples: [
      { en: "Good morning, this is David speaking. Could I please speak with Ms. Johnson?", tr: "Günaydın, ben David. Bayan Johnson ile görüşebilir miyim lütfen?" },
      { en: "Due to an unforeseen conflict, would it be possible to reschedule our meeting to Thursday at 3 PM?", tr: "Beklenmeyen bir çakışma nedeniyle toplantımızı Perşembe saat 15:00'e ertelememiz mümkün olur mu?" }
    ],
    targetWords: [
      { word: 'Reschedule', phonetic: '/ˌriːˈʃedʒ.uːl/', turkish: 'Yeniden planlamak / Ertelemek', exampleEn: 'Could we reschedule our call for tomorrow morning?', exampleTr: 'Görüşmemizi yarın sabaha yeniden planlayabilir miyiz?' },
      { word: 'Available', phonetic: '/əˈveɪ.lə.bəl/', turkish: 'Müsait', exampleEn: 'Are you available for a quick sync this afternoon?', exampleTr: 'Bu öğleden sonra kısa bir görüşme için müsait misiniz?' },
      { word: 'Confirm', phonetic: '/kənˈfɜːm/', turkish: 'Onaylamak / Teyit etmek', exampleEn: 'I am calling to confirm our scheduled appointment.', exampleTr: 'Planlanan randevumuzu teyit etmek için arıyorum.' },
      { word: 'Convenience', phonetic: '/kənˈviː.ni.əns/', turkish: 'Uygunluk / Kolaylık', exampleEn: 'Please call me back at your earliest convenience.', exampleTr: 'Lütfen en erken uygun olduğunuz zamanda bana geri dönün.' },
      { word: 'Transfer', phonetic: '/trænsˈfɜːr/', turkish: 'Bağlamak / Aktarmak (hattı)', exampleEn: 'Allow me to transfer you to the accounts department.', exampleTr: 'Sizi muhasebe departmanına aktarmama izin verin.' }
    ],
    initialPrompt: "Ring, ring! Hello, Global Tech Consulting, how may I direct your call?",
    initialPromptTr: "Telefon çalıyor! Merhaba, Global Tech Danışmanlık, görüşmenizi kime yönlendirebilirim?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd20_c1',
        type: 'pattern',
        instructionTr: "'May I speak with...' kalıbıyla proje yöneticisiyle görüşmek istediğini söyle.",
        promptEn: "Politely state your name and ask to speak with the project manager.",
        expectedConcept: "Hello, this is [Name]. May I speak with the project manager?",
        hintTr: "Örnek: 'Hello, this is Onur. May I please speak with the project manager regarding our contract?'"
      },
      {
        id: 'd20_c2',
        type: 'vocab',
        instructionTr: "'reschedule' veya 'confirm' kelimesini kullanarak yarınki randevunu yeniden planlamayı teklif et.",
        promptEn: "Ask if you can reschedule tomorrow's appointment to Friday.",
        expectedConcept: "Would it be possible to reschedule our meeting to Friday?",
        hintTr: "Örnek: 'Would it be possible to reschedule our appointment to Friday at 11 AM?'"
      },
      {
        id: 'd20_c3',
        type: 'vocab',
        instructionTr: "'convenience' kelimesini içeren kibar bir mesaj bırak.",
        promptEn: "Leave a message asking the person to call you back when convenient.",
        expectedConcept: "Please ask them to return my call at their earliest convenience.",
        hintTr: "Örnek: 'Could you please ask her to call me back at her earliest convenience?'"
      }
    ]
  },
  {
    day: 21,
    week: 3,
    titleTr: '3. Hafta İş Görüşmesi & Kariyer Değerlendirmesi',
    titleEn: 'Week 3 Career Simulation & Professional Review',
    category: 'Haftalık Değerlendirme',
    level: 'İleri (B2-C1)',
    objective: 'İş İngilizcesi becerilerini, kriz yönetimini ve profesyonel yazışma/sunum yeteneklerini kapsamlı bir rolde test etme.',
    expectedPattern: 'Executive-level professional articulation, balancing diplomacy with assertiveness.',
    patternExplanation: 'Tüm 3. hafta mesleki terminolojisini kullanarak kendinizi bir lider ve uzman olarak konumlandırın.',
    patternExamples: [
      { en: "Over the past three weeks, I have honed my ability to articulate technical strategies clearly and negotiate constructive outcomes in cross-border meetings.", tr: "Geçtiğimiz üç hafta boyunca teknik stratejileri net bir şekilde ifade etme ve sınır ötesi toplantılarda yapıcı sonuçlar müzakere etme becerimi geliştirdim." }
    ],
    targetWords: [
      { word: 'Negotiate', phonetic: '/nəˈɡəʊ.ʃi.eɪt/', turkish: 'Müzakere etmek', exampleEn: 'We negotiated favorable contract terms.', exampleTr: 'Elverişli sözleşme şartları müzakere ettik.' },
      { word: 'Strategic', phonetic: '/strəˈtiː.dʒɪk/', turkish: 'Stratejik', exampleEn: 'We took a strategic decision to enter the European market.', exampleTr: 'Avrupa pazarına girmek için stratejik bir karar aldık.' },
      { word: 'Milestone', phonetic: '/ˈmaɪl.stəʊn/', turkish: 'Dönüm noktası', exampleEn: 'Completing Week 3 is an outstanding milestone.', exampleTr: '3. Haftayı tamamlamak seçkin bir dönüm noktasıdır.' },
      { word: 'Execution', phonetic: '/ˌek.sɪˈkjuː.ʃən/', turkish: 'Uygulama / İcraat', exampleEn: 'Flawless execution is what sets top teams apart.', exampleTr: 'Kusursuz icraat, en iyi ekipleri diğerlerinden ayıran şeydir.' },
      { word: 'Impact', phonetic: '/ˈɪm.pækt/', turkish: 'Etki', exampleEn: 'Our new initiative created a lasting positive impact.', exampleTr: 'Yeni girişimimiz kalıcı ve olumlu bir etki yarattı.' }
    ],
    initialPrompt: "Welcome to Day 21! You are in an executive evaluation session. Pitch a new strategic initiative to me: What is the goal, how will your team execute it, and what will be the measurable impact?",
    initialPromptTr: "21. Güne hoş geldiniz! Bir yönetici değerlendirme oturumundasınız. Bana yeni bir stratejik girişim sunun: Hedef nedir, ekibiniz bunu nasıl hayata geçirecek ve ölçülebilir etkisi ne olacak?",
    estimatedMinutes: 20,
    challenges: [
      {
        id: 'd21_c1',
        type: 'dialogue',
        instructionTr: "Yeni bir projenin hedefini ve stratejik önemini anlatan 2 cümle kur.",
        promptEn: "Present the core vision of your strategic project.",
        expectedConcept: "Our strategic objective is to ... which will enable us to...",
        hintTr: "Örnek: 'Our strategic goal is to automate customer feedback, which will reduce response latency by 50%.'"
      },
      {
        id: 'd21_c2',
        type: 'vocab',
        instructionTr: "'milestone' veya 'execution' kelimesini kullanarak projenin uygulama planından bahset.",
        promptEn: "Explain your execution timeline and first major milestone.",
        expectedConcept: "In terms of execution, our first milestone is to...",
        hintTr: "Örnek: 'Regarding project execution, our first milestone will be completed within six weeks.'"
      },
      {
        id: 'd21_c3',
        type: 'vocab',
        instructionTr: "'impact' ve 'negotiate' kelimesini içeren güçlü bir kapanış argümanı yaz.",
        promptEn: "Conclude by highlighting the expected business impact.",
        expectedConcept: "This initiative will have a significant impact on our business...",
        hintTr: "Örnek: 'This will deliver a high-value impact and help us negotiate stronger partnerships.'"
      }
    ]
  },

  // ==================== HAFTA 4: AKICI KONUŞMA & İLERİ DÜZEY USTALIK ====================
  {
    day: 22,
    week: 4,
    titleTr: 'Fikir Savunma & Zıtlık Belirtme',
    titleEn: 'Defending Arguments & Nuanced Contrast',
    category: 'İleri Seviye Akıcılık',
    level: 'İleri (B2-C1)',
    objective: 'Gelişmiş bağlaçlar (On the one hand, whereas, nevertheless) ile zıt görüşleri dengeli ve ikna edici şekilde savunma.',
    expectedPattern: 'On the one hand [A], however on the other hand [B] / Although [X], nevertheless [Y]',
    patternExplanation: '"Although" yan cümle bağlar: "Although it was raining, we enjoyed our walk." "Nevertheless" ve "However" ise bağımsız cümleler arası geçiş yapar: "It is expensive; nevertheless, it is worth the investment."',
    patternExamples: [
      { en: "On the one hand, remote work offers flexibility; on the other hand, in-person collaboration fosters rapid spontaneous ideas.", tr: "Bir yandan uzaktan çalışma esneklik sunarken, diğer yandan yüz yüze iş birliği hızlı ve kendiliğinden fikirleri besler." },
      { en: "Although the initial cost was substantial, nevertheless the long-term efficiency paid off.", tr: "İlk maliyet önemli olsa da, yine de uzun vadeli verimlilik kendini amorti etti." }
    ],
    targetWords: [
      { word: 'Nevertheless', phonetic: '/ˌnev.ə.ðəˈles/', turkish: 'Yine de / Buna rağmen', exampleEn: 'The challenge was daunting; nevertheless, they persevered.', exampleTr: 'Zorluk göz korkutucuydu; yine de sebat ettiler.' },
      { word: 'Whereas', phonetic: '/weərˈæz/', turkish: 'Oysa / -ken', exampleEn: 'Some prefer city life, whereas others crave quiet countryside.', exampleTr: 'Bazıları şehir hayatını tercih ederken, diğerleri sessiz kırsal yaşamı arzular.' },
      { word: 'Perspective', phonetic: '/pəˈspek.tɪv/', turkish: 'Görüş açısı', exampleEn: 'Considering opposing perspectives enriches your argument.', exampleTr: 'Karşıt bakış açılarını değerlendirmek argümanınızı zenginleştirir.' },
      { word: 'Contradiction', phonetic: '/ˌkɒn.trəˈdɪk.ʃən/', turkish: 'Çelişki', exampleEn: 'There is no contradiction between ambition and empathy.', exampleTr: 'Hırs ile empati arasında hiçbir çelişki yoktur.' },
      { word: 'Furthermore', phonetic: '/ˌfɜː.ðəˈmɔːr/', turkish: 'Dahası / Üstelik', exampleEn: 'Furthermore, the evidence supports this conclusion.', exampleTr: 'Dahası, kanıtlar bu sonucu desteklemektedir.' }
    ],
    initialPrompt: "Welcome to Week 4, the Fluency Mastery week! Today we debate: Is Artificial Intelligence helping human creativity or limiting it? Defend your view using contrast markers.",
    initialPromptTr: "Akıcılık Ustalığı olan 4. Haftaya hoş geldiniz! Bugün tartışıyoruz: Yapay Zeka insan yaratıcılığına yardımcı mı oluyor yoksa onu kısıtlıyor mu? Görüşünüzü zıtlık bağlaçları kullanarak savunun.",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd22_c1',
        type: 'pattern',
        instructionTr: "'On the one hand... on the other hand...' kalıbıyla AI konusundaki iki zıt yönü belirt.",
        promptEn: "State two sides of the AI debate using 'On the one hand ..., on the other hand ...'.",
        expectedConcept: "On the one hand, AI accelerates work, on the other hand...",
        hintTr: "Örnek: 'On the one hand, AI automates repetitive tasks; on the other hand, overreliance might reduce original thinking.'"
      },
      {
        id: 'd22_c2',
        type: 'vocab',
        instructionTr: "'nevertheless' veya 'whereas' kelimesini içeren bir argüman cümlesi kur.",
        promptEn: "Deepen your argument using 'nevertheless' or 'whereas'.",
        expectedConcept: "There are challenges; nevertheless, I believe that...",
        hintTr: "Örnek: 'Machines can generate patterns rapidly, whereas genuine emotional depth remains uniquely human.'"
      },
      {
        id: 'd22_c3',
        type: 'vocab',
        instructionTr: "'furthermore' kelimesini kullanarak son bir destekleyici gerekçe ekle.",
        promptEn: "Add a supporting final point using 'furthermore'.",
        expectedConcept: "Furthermore, learning to work with AI will...",
        hintTr: "Örnek: 'Furthermore, human creators who leverage smart tools will discover unprecedented creative frontiers.'"
      }
    ]
  },
  {
    day: 23,
    week: 4,
    titleTr: 'Hikaye Anlatımı & Geçmiş Zaman Nüansları',
    titleEn: 'Storytelling & Narrative Past Tenses',
    category: 'İleri Seviye Akıcılık',
    level: 'İleri (B2-C1)',
    objective: 'Past Simple, Past Continuous ve Past Perfect zamanlarını birleştirerek sürükleyici bir anı/hikaye anlatma.',
    expectedPattern: 'While I was [doing something], suddenly... / By the time we arrived, they had already...',
    patternExplanation: 'Past Continuous arka planda devam eden eylemi, Past Simple araya giren anlık olayı, Past Perfect ise geçmişteki bir andan daha önce gerçekleşmiş olayı ifade eder.',
    patternExamples: [
      { en: "While I was hiking in the Scottish Highlands, a sudden fog rolled in and changed the entire scenery.", tr: "İskoç Yaylalarında yürüyüş yaparken, aniden bir sis çöktü ve tüm manzarayı değiştirdi." },
      { en: "By the time we reached the summit, the sun had already begun to set behind the peaks.", tr: "Biz zirveye ulaştığımızda, güneş tepelerin arkasında çoktan batmaya başlamıştı." }
    ],
    targetWords: [
      { word: 'Unforgettable', phonetic: '/ˌʌn.fəˈɡet.ə.bəl/', turkish: 'Unutulmaz', exampleEn: 'That journey was an unforgettable adventure.', exampleTr: 'O yolculuk unutulmaz bir maceraydı.' },
      { word: 'Unexpectedly', phonetic: '/ˌʌn.ɪkˈspek.tɪd.li/', turkish: 'Beklenmedik bir şekilde', exampleEn: 'A stranger unexpectedly helped us find our way.', exampleTr: 'Bir yabancı beklenmedik bir şekilde yolumuzu bulmamıza yardımcı oldu.' },
      { word: 'Realize', phonetic: '/ˈrɪə.laɪz/', turkish: 'Farkına varmak', exampleEn: 'I suddenly realized I had forgotten my keys.', exampleTr: 'Anahtarlarımı unuttuğumu aniden fark ettim.' },
      { word: 'Coincidence', phonetic: '/kəʊˈɪn.sɪ.dəns/', turkish: 'Tesadüf', exampleEn: 'Meeting my childhood friend in Tokyo was pure coincidence.', exampleTr: 'Çocukluk arkadaşımla Tokyo\'da karşılaşmak tam bir tesadüftü.' },
      { word: 'Breathtaking', phonetic: '/ˈbreθˌteɪ.kɪŋ/', turkish: 'Nefes kesici', exampleEn: 'The view from the cliff was absolutely breathtaking.', exampleTr: 'Uçurumdan manzara kesinlikle nefes kesiciydi.' }
    ],
    initialPrompt: "Tell me an interesting story from your life! A surprise encounter, an unusual travel memory, or an unexpected turning point. What happened?",
    initialPromptTr: "Bana hayatınızdan ilginç bir hikaye anlatın! Sürpriz bir karşılaşma, alışılmadık bir seyahat anısı veya beklenmedik bir dönüm noktası. Neler oldu?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd23_c1',
        type: 'pattern',
        instructionTr: "'While I was [verb-ing], suddenly...' kalıbıyla hikayenin başlangıcını kurgula.",
        promptEn: "Start your story by setting the scene with 'While I was ..., suddenly ...'.",
        expectedConcept: "While I was traveling/walking/studying, suddenly...",
        hintTr: "Örnek: 'While I was walking along the coast in Portugal, suddenly a friendly golden retriever ran up to me.'"
      },
      {
        id: 'd23_c2',
        type: 'vocab',
        instructionTr: "'unexpectedly' veya 'realize' kelimesini kullanarak olayların gelişimini anlat.",
        promptEn: "Describe the twist or turning point using 'unexpectedly' or 'realize'.",
        expectedConcept: "I unexpectedly discovered ... / I realized that...",
        hintTr: "Örnek: 'I unexpectedly realized that the owner of the dog was an author I had admired for years.'"
      },
      {
        id: 'd23_c3',
        type: 'vocab',
        instructionTr: "'breathtaking' veya 'unforgettable' kelimesiyle hikayeni etkileyici bir şekilde bitir.",
        promptEn: "Conclude your story with an impactful takeaway using 'unforgettable' or 'breathtaking'.",
        expectedConcept: "It was an unforgettable experience because...",
        hintTr: "Örnek: 'We talked for hours about literature while watching the breathtaking sunset.'"
      }
    ]
  },
  {
    day: 24,
    week: 4,
    titleTr: 'Varsayımlar, Koşul Cümleleri & Hayaller',
    titleEn: 'Conditionals, Hypotheticals & Future Visions',
    category: 'Gramer & Akıcılık',
    level: 'İleri (B2-C1)',
    objective: 'Second ve Third Conditional kalıplarıyla hayali senaryolar, pişmanlıklar ve gelecek projeksiyonları kurma.',
    expectedPattern: 'If I were to [do something], I would... / If I had known [fact], I would have [acted differently].',
    patternExplanation: 'Gerçekleşmesi imkansız veya hayali durumlar için 2. Koşul ("If I had more time, I would travel the world"); geçmişteki pişmanlık ve alternatifler için 3. Koşul ("If I had studied harder, I would have passed") kullanılır.',
    patternExamples: [
      { en: "If I could live anywhere in the world for one year, I would choose a peaceful town in northern Italy.", tr: "Dünyanın herhangi bir yerinde bir yıl yaşayabilseydim, kuzey İtalya'da huzurlu bir kasabayı seçerdim." },
      { en: "If I had known about this academy earlier, I would have achieved conversational fluency months ago.", tr: "Bu akademiyi daha önce bilseydim, aylar önce konuşma akıcılığına kavuşurdum." }
    ],
    targetWords: [
      { word: 'Hypothetically', phonetic: '/ˌhaɪ.pəˈθet.ɪ.kəl.i/', turkish: 'Varsayımsal olarak', exampleEn: 'Hypothetically speaking, what would your first step be?', exampleTr: 'Varsayımsal olarak konuşursak, ilk adımınız ne olurdu?' },
      { word: 'Endeavor', phonetic: '/enˈdev.ər/', turkish: 'Girişim / Çaba', exampleEn: 'Starting a space startup is an ambitious endeavor.', exampleTr: 'Bir uzay girişimi başlatmak iddialı bir çabadır.' },
      { word: 'Potential', phonetic: '/pəˈten.ʃəl/', turkish: 'Potansiyel', exampleEn: 'You have immense untapped potential.', exampleTr: 'Muazzam, henüz açığa çıkmamış bir potansiyeliniz var.' },
      { word: 'Fulfill', phonetic: '/fʊlˈfɪl/', turkish: 'Gerçekleştirmek / Yerine getirmek', exampleEn: 'She worked tirelessly to fulfill her lifelong dream.', exampleTr: 'Hayat boyu hayalini gerçekleştirmek için yorulmadan çalıştı.' },
      { word: 'Aspiration', phonetic: '/ˌæs.pɪˈreɪ.ʃən/', turkish: 'Büyük arzu / Hedef', exampleEn: 'His highest aspiration is to establish an educational foundation.', exampleTr: 'En büyük arzusu bir eğitim vakfı kurmaktır.' }
    ],
    initialPrompt: "Imagine you received unlimited funding to launch any philanthropic, creative, or technological project of your dreams. If you had that opportunity, what would you create and why?",
    initialPromptTr: "Hayallerinizdeki herhangi bir hayırsever, yaratıcı veya teknolojik projeyi başlatmak için sınırsız fon aldığınızı hayal edin. Bu fırsata sahip olsaydınız, ne yaratırdınız ve neden?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd24_c1',
        type: 'pattern',
        instructionTr: "'If I had unlimited funding, I would...' kalıbıyla hayalindeki projeyi açıkla.",
        promptEn: "Describe your dream project using 'If I had ..., I would ...'.",
        expectedConcept: "If I had unlimited resources, I would build/create...",
        hintTr: "Örnek: 'If I had unlimited resources, I would build an open global academy for students in need.'"
      },
      {
        id: 'd24_c2',
        type: 'vocab',
        instructionTr: "'aspiration' veya 'fulfill' kelimesini kullanarak bunun senin için kişisel anlamını belirt.",
        promptEn: "Explain your personal motivation using 'aspiration' or 'fulfill'.",
        expectedConcept: "My ultimate aspiration is to fulfill...",
        hintTr: "Örnek: 'My lifelong aspiration has always been to fulfill my passion for accessible education.'"
      },
      {
        id: 'd24_c3',
        type: 'pattern',
        instructionTr: "'If I had started this earlier...' (3rd Conditional) kalıbıyla geçmişe dair bir çıkarım yap.",
        promptEn: "Use the Third Conditional 'If I had [done X], I would have [achieved Y]' to reflect on learning.",
        expectedConcept: "If I had started learning earlier, I would have...",
        hintTr: "Örnek: 'If I had dedicated thirty minutes every day last year, I would have reached complete fluency even faster.'"
      }
    ]
  },
  {
    day: 25,
    week: 4,
    titleTr: 'Kültür, Sinema, Kitap & Eleştiri',
    titleEn: 'Culture, Cinema, Books & Critical Review',
    category: 'Kültür & Sanat',
    level: 'İleri (B2-C1)',
    objective: 'Bir filmi, kitabı veya sanat eserini derinlemesine tahlil etme, olay örgüsü ve temaları tartışma.',
    expectedPattern: 'The story revolves around... / What struck me most was... / I highly recommend it because...',
    patternExplanation: '"The plot revolves around" (Olay örgüsü ... etrafında döner) ve "What struck me most was" (Beni en çok etkileyen şey şuydu) gibi deyimsel yapılar sofistike bir eleştiri dili sağlar.',
    patternExamples: [
      { en: "The plot revolves around an enigmatic detective in 19th-century London facing a moral dilemma.", tr: "Olay örgüsü, 19. yüzyıl Londra'sında ahlaki bir ikilemle karşı karşıya kalan gizemli bir dedektifin etrafında döner." },
      { en: "What struck me most was the director's subtle use of silence rather than loud music.", tr: "Beni en çok etkileyen şey, yönetmenin yüksek sesli müzik yerine sessizliği ustalıkla kullanmasıydı." }
    ],
    targetWords: [
      { word: 'Masterpiece', phonetic: '/ˈmɑː.stə.piːs/', turkish: 'Başyapıt', exampleEn: 'The novel is widely considered a literary masterpiece.', exampleTr: 'Roman geniş çapta bir edebiyat başyapıtı olarak kabul edilir.' },
      { word: 'Compelling', phonetic: '/kəmˈpel.ɪŋ/', turkish: 'Sürükleyici / İkna edici', exampleEn: 'The protagonist had a compelling backstory.', exampleTr: 'Başkarakterin sürükleyici bir geçmiş hikayesi vardı.' },
      { word: 'Subtle', phonetic: '/ˈsʌt.əl/', turkish: 'Hafif / İnce / Ustaca gizlenmiş', exampleEn: 'There is a subtle humor throughout the dialogue.', exampleTr: 'Diyaloglar boyunca ince bir mizah var.' },
      { word: 'Perspective', phonetic: '/pəˈspek.tɪv/', turkish: 'Bakış açısı', exampleEn: 'The film provides a fresh perspective on historical events.', exampleTr: 'Film, tarihi olaylara taze bir bakış açısı sunuyor.' },
      { word: 'Profound', phonetic: '/prəˈfaʊnd/', turkish: 'Derin / Kapsamlı', exampleEn: 'The book leaves a profound emotional impression.', exampleTr: 'Kitap derin bir duygusal iz bırakıyor.' }
    ],
    initialPrompt: "Think about your favorite book, movie, or series of all time. What is the title? What is the main plot, and why did it leave such a deep impact on you?",
    initialPromptTr: "Tüm zamanların en sevdiğiniz kitabını, filmini veya dizisini düşünün. Adı nedir? Ana olay örgüsü nedir ve sizde neden bu kadar derin bir etki bıraktı?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd25_c1',
        type: 'pattern',
        instructionTr: "'The story revolves around...' kalıbıyla eserin konusunu özetle.",
        promptEn: "Introduce the book or movie and explain what the story revolves around.",
        expectedConcept: "The story revolves around...",
        hintTr: "Örnek: 'The movie Inception revolves around entering dreams to plant new ideas.'"
      },
      {
        id: 'd25_c2',
        type: 'pattern',
        instructionTr: "'What struck me most was...' kalıbıyla seni en çok etkileyen detayı söyle.",
        promptEn: "Share what stood out to you using 'What struck me most was...'.",
        expectedConcept: "What struck me most was the performance / visual style...",
        hintTr: "Örnek: 'What struck me most was the profound philosophical message about time and human connection.'"
      },
      {
        id: 'd25_c3',
        type: 'vocab',
        instructionTr: "'masterpiece' veya 'compelling' kelimesini kullanarak eseri tavsiye et.",
        promptEn: "Recommend this work using 'masterpiece' or 'compelling'.",
        expectedConcept: "It is a true masterpiece because...",
        hintTr: "Örnek: 'I consider this a modern masterpiece because of its compelling characters.'"
      }
    ]
  },
  {
    day: 26,
    week: 4,
    titleTr: 'Sosyal Sohbet (Small Talk) & Doğallık',
    titleEn: 'Social Small Talk & Natural Banter',
    category: 'İleri Seviye Akıcılık',
    level: 'İleri (B2-C1)',
    objective: 'Partilerde, networking etkinliklerinde veya asansörde zahmetsizce havadan sudan konuşma (small talk) başlatma ve sürdürme.',
    expectedPattern: 'Crazy weather today, isn\'t it? / Have you been up to anything exciting lately? / By the way, how did that project go?',
    patternExplanation: 'Small talk onay soruları (tag questions: "isn\'t it?", "haven\'t you?") ve açık uçlu sorularla yürütülür. Konuşmayı canlı tutmak için yankı soruları ("Really? How come?") kullanılır.',
    patternExamples: [
      { en: "Crazy weather we're having today, isn't it? One minute it pours, the next it is sunny.", tr: "Bugün çılgın bir hava var, değil mi? Bir dakika sağanak yağıyor, bir sonraki dakika güneş açıyor." },
      { en: "By the way, what have you been up to since we last caught up at the conference?", tr: "Bu arada, konferansta en son görüştüğümüzden beri neler yapıyorsun?" }
    ],
    targetWords: [
      { word: 'Catch up', phonetic: '/kætʃ ʌp/', turkish: 'Görüşmek / Arayı kapatmak', exampleEn: 'We really should catch up over coffee sometime soon.', exampleTr: 'Yakında bir ara kahve eşliğinde mutlaka arayı kapatmalıyız.' },
      { word: 'Spontaneous', phonetic: '/spɒnˈteɪ.ni.əs/', turkish: 'Doğal / Kendiliğinden', exampleEn: 'The best conversations are always spontaneous.', exampleTr: 'En iyi sohbetler her zaman kendiliğinden olanlardır.' },
      { word: 'Unbelievable', phonetic: '/ˌʌn.bɪˈliː.və.bəl/', turkish: 'İnanılmaz', exampleEn: 'The traffic this morning was unbelievable.', exampleTr: 'Bu sabah trafik inanılmazdı.' },
      { word: 'Cozy', phonetic: '/ˈkəʊ.zi/', turkish: 'Sıcak / Rahat / Samimi', exampleEn: 'This coffee shop has such a cozy atmosphere.', exampleTr: 'Bu kahve dükkanının çok samimi ve sıcak bir atmosferi var.' },
      { word: 'Fascinating', phonetic: '/ˈfæs.ən.eɪ.tɪŋ/', turkish: 'Büyüleyici / İlgi çekici', exampleEn: 'That sounds like a fascinating project.', exampleTr: 'Kulağa büyüleyici bir proje gibi geliyor.' }
    ],
    initialPrompt: "Hey there! We are both waiting by the coffee machine at an international tech summit in Berlin. How do you break the ice and start a natural, friendly conversation with me?",
    initialPromptTr: "Selam! Berlin'deki uluslararası bir teknoloji zirvesinde ikimiz de kahve makinesinin başında bekliyoruz. Buzu nasıl kırar ve benimle doğal, dostça bir sohbet başlatırsınız?",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd26_c1',
        type: 'pattern',
        instructionTr: "Kahve veya etkinlikle ilgili bir gözlem yaparak sohbeti başlat (tag question kullan: '..., isn't it?').",
        promptEn: "Break the ice with an observation followed by a tag question.",
        expectedConcept: "It has been a great conference, hasn't it? / Long line for coffee, isn't it?",
        hintTr: "Örnek: 'Quite a lively crowd here today, isn't it? Have you found any keynote inspiring so far?'"
      },
      {
        id: 'd26_c2',
        type: 'vocab',
        instructionTr: "'catch up' veya 'fascinating' kelimesini kullanarak sohbeti derinleştir.",
        promptEn: "Keep the momentum going using 'fascinating' or 'catch up'.",
        expectedConcept: "That sounds fascinating! / We should catch up...",
        hintTr: "Örnek: 'That sounds like a fascinating field of research! What sparked your interest in it?'"
      },
      {
        id: 'd26_c3',
        type: 'dialogue',
        instructionTr: "Sohbetin sonunda kibarca kartvizit veya iletişim bilgisi isteyerek vedalaş.",
        promptEn: "Politely exchange contact information or propose connecting on LinkedIn.",
        expectedConcept: "Let's connect on LinkedIn / It was great chatting with you!",
        hintTr: "Örnek: 'It was great chatting with you! Do you happen to have a card or can we connect on LinkedIn?'"
      }
    ]
  },
  {
    day: 27,
    week: 4,
    titleTr: 'Deyimler & Doğal Konuşma Kalıpları',
    titleEn: 'Idiomatic Expressions & Native Phrasing',
    category: 'İleri Seviye Akıcılık',
    level: 'İleri (B2-C1)',
    objective: 'Anadili İngilizce olanların sıkça kullandığı deyimleri (piece of cake, bite the bullet, hit the nail) yerinde kullanma.',
    expectedPattern: 'It is a piece of cake / Once in a blue moon / To hit the nail on the head / To bite the bullet',
    patternExplanation: 'Deyimleri ezberlemek yerine hikaye ve bağlam içinde kullanın. "Hit the nail on the head" tam üstüne basmak/doğruyu tam söylemek demektir.',
    patternExamples: [
      { en: "You really hit the nail on the head with that market diagnosis.", tr: "Bu piyasa teşhisiyle gerçekten tam on ikiden vurdun / tam üstüne bastın." },
      { en: "I was nervous before the presentation, but in the end, it was a piece of cake.", tr: "Sunumdan önce gergindim ama sonunda çocuk oyuncağı gibi geçti." }
    ],
    targetWords: [
      { word: 'Bite the bullet', phonetic: '/baɪt ðə ˈbʊl.ɪt/', turkish: 'Dişini sıkmak / Zor kararı kabullenmek', exampleEn: 'I finally bit the bullet and started my own business.', exampleTr: 'Sonunda dişimi sıktım ve kendi işimi kurdum.' },
      { word: 'Hit the nail on the head', phonetic: '/hɪt ðə neɪl...', turkish: 'Tam üstüne basmak / Tam isabet', exampleEn: 'Her remark hit the nail on the head.', exampleTr: 'Onun tespiti tam üstüne bastı.' },
      { word: 'Piece of cake', phonetic: '/piːs əv keɪk/', turkish: 'Çocuk oyuncağı / Çok kolay', exampleEn: 'With enough practice, the exam will be a piece of cake.', exampleTr: 'Yeterli pratikle sınav çocuk oyuncağı olacaktır.' },
      { word: 'Once in a blue moon', phonetic: '/wʌns ɪn ə bluː muːn/', turkish: 'Kırk yılda bir / Çok nadiren', exampleEn: 'I only eat fast food once in a blue moon.', exampleTr: 'Kırk yılda bir fast food yerim.' },
      { word: 'See eye to eye', phonetic: '/siː aɪ tuː aɪ/', turkish: 'Aynı fikirde olmak / Hemfikir olmak', exampleEn: 'We don\'t always see eye to eye, but we respect each other.', exampleTr: 'Her zaman aynı fikirde olmayız ama birbirimize saygı duyarız.' }
    ],
    initialPrompt: "Idioms make speech vibrant! I will give you a scenario: You had a difficult dilemma, but finally decided to take courageous action and discovered the task was much easier than feared. Use at least two English idioms to describe this!",
    initialPromptTr: "Deyimler konuşmayı canlandırır! Size bir senaryo veriyorum: Zor bir ikileminiz vardı ama sonunda cesur bir adım atmaya karar verdiniz ve görevin korktuğunuzdan çok daha kolay olduğunu gördünüz. Bunu anlatmak için en az iki İngilizce deyim kullanın!",
    estimatedMinutes: 15,
    challenges: [
      {
        id: 'd27_c1',
        type: 'pattern',
        instructionTr: "'bite the bullet' deyimini kullanarak zor bir kararı verdiğini ifade et.",
        promptEn: "Use the idiom 'bite the bullet' in a sentence about making a tough choice.",
        expectedConcept: "I decided to bite the bullet and...",
        hintTr: "Örnek: 'After weeks of hesitation, I decided to bite the bullet and enroll in the intensive course.'"
      },
      {
        id: 'd27_c2',
        type: 'pattern',
        instructionTr: "'piece of cake' veya 'hit the nail on the head' deyimini bir başarıyı anlatırken kullan.",
        promptEn: "Describe how the outcome turned out using 'piece of cake' or 'hit the nail on the head'.",
        expectedConcept: "It turned out to be a piece of cake / You hit the nail on the head",
        hintTr: "Örnek: 'Once I understood the core principles, speaking daily turned out to be a piece of cake.'"
      },
      {
        id: 'd27_c3',
        type: 'vocab',
        instructionTr: "'once in a blue moon' deyimiyle nadir yaptığın bir alışkanlığını söyle.",
        promptEn: "Tell me about something you do only 'once in a blue moon'.",
        expectedConcept: "I only ... once in a blue moon.",
        hintTr: "Örnek: 'I only watch television once in a blue moon because I prefer reading books.'"
      }
    ]
  },
  {
    day: 28,
    week: 4,
    titleTr: 'Mezuniyet Konuşması & 4 Haftalık Zafer',
    titleEn: 'Graduation Speech & 4-Week Mastery Celebration',
    category: 'Mezuniyet & Başarı',
    level: 'İleri (B2-C1)',
    objective: '4 haftalık tüm İngilizce birikimini taçlandıran akıcı, özgüvenli ve etkileyici bir mezuniyet konuşması gerçekleştirme.',
    expectedPattern: 'Over the last 28 days, I have transformed my English... / I am proud to announce that...',
    patternExplanation: 'Tebrikler! 28 günlük yoğun maratonun zirvesindesiniz. Bu oturumda artık temel kurallardan ziyade özgüven, duygu aktarımı ve akıcı İngilizce ifade gücünüz değerlendirilecektir.',
    patternExamples: [
      { en: "Over the last four weeks with LinguaAcademy AI, I have not only learned hundreds of idioms and grammar structures, but I have unlocked genuine confidence in speaking English effortlessly.", tr: "LinguaAcademy AI ile geçen son dört hafta boyunca, sadece yüzlerce deyim ve dilbilgisi yapısı öğrenmekle kalmadım, aynı zamanda İngilizceyi zahmetsizce konuşma konusunda gerçek bir özgüven kazandım." }
    ],
    targetWords: [
      { word: 'Transformation', phonetic: '/ˌtræns.fəˈmeɪ.ʃən/', turkish: 'Dönüşüm', exampleEn: 'The transformation in my speaking fluency is remarkable.', exampleTr: 'Konuşma akıcılığımdaki dönüşüm kayda değer.' },
      { word: 'Perseverance', phonetic: '/ˌpɜː.sɪˈvɪə.rəns/', turkish: 'Sebat / Azim', exampleEn: 'Daily perseverance leads to extraordinary mastery.', exampleTr: 'Günlük sebat olağanüstü bir ustalığa götürür.' },
      { word: 'Accomplishment', phonetic: '/əˈkʌm.plɪʃ.mənt/', turkish: 'Kazanım / Başarı', exampleEn: 'Graduating from this academy is a lifetime accomplishment.', exampleTr: 'Bu akademiden mezun olmak ömür boyu sürecek bir başarıdır.' },
      { word: 'Fluency', phonetic: '/ˈfluː.ən.si/', turkish: 'Akıcılık', exampleEn: 'Fluency is the ability to express your authentic self.', exampleTr: 'Akıcılık, özgün benliğinizi ifade edebilme yeteneğidir.' },
      { word: 'Boundless', phonetic: '/ˈbaʊnd.ləs/', turkish: 'Sınırsız', exampleEn: 'With English, your career opportunities are boundless.', exampleTr: 'İngilizce ile kariyer fırsatlarınız sınırsızdır.' }
    ],
    initialPrompt: "Ladies and gentlemen, esteemed learner: Welcome to Day 28, your official EnglishMaster AI Graduation Day! You have journeyed through 28 days of rigorous language immersion. Deliver your graduation speech to me: How has your English transformed, what was your favorite milestone, and what will you do with your new fluency?",
    initialPromptTr: "Bayanlar ve baylar, değerli öğrencimiz: 28. Güne, resmi EnglishMaster AI Mezuniyet Gününüze hoş geldiniz! 28 günlük yoğun bir dil yolculuğunu tamamladınız. Mezuniyet konuşmanızı yapın: İngilizceniz nasıl dönüştü, en sevdiğiniz dönüm noktası neydi ve yeni akıcılığınızla neler yapacaksınız?",
    estimatedMinutes: 25,
    challenges: [
      {
        id: 'd28_c1',
        type: 'dialogue',
        instructionTr: "Konuşmana etkileyici bir giriş yap: 28 günde kendini nasıl geliştirdiğini ve hissettiğin dönüşümü anlat.",
        promptEn: "Deliver the opening part of your graduation speech reflecting on your 28-day transformation.",
        expectedConcept: "Over the last 28 days, my English has transformed significantly...",
        hintTr: "Örnek: 'Dear mentor, over the past 28 days, my language journey has been a remarkable transformation from hesitation to confidence.'"
      },
      {
        id: 'd28_c2',
        type: 'vocab',
        instructionTr: "'perseverance' ve 'fluency' kelimelerini kullanarak bu başarının arkasındaki emeği anlat.",
        promptEn: "Speak about your daily effort using 'perseverance' and 'fluency'.",
        expectedConcept: "Through daily perseverance, I have reached real fluency...",
        hintTr: "Örnek: 'Through constant perseverance, I overcame my doubts and achieved practical fluency in everyday conversation.'"
      },
      {
        id: 'd28_c3',
        type: 'rapid',
        instructionTr: "'accomplishment' veya 'boundless' kelimesini içeren ilham verici bir final cümlesi ile konuşmanı tamamla.",
        promptEn: "Deliver your inspiring closing sentence for your graduation.",
        expectedConcept: "Graduating today is a proud accomplishment, and our future is boundless.",
        hintTr: "Örnek: 'Completing this 4-week program is a proud accomplishment, and I know that the future is boundless!'"
      }
    ]
  }
];
