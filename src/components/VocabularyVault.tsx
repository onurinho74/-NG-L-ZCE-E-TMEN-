import React, { useState, useMemo } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { TargetWord, UserProgress } from '../types';
import { speakEnglish } from '../utils/speech';
import { getTurkishPronunciation } from '../utils/pronunciation';
import {
  Volume2,
  Bookmark,
  BookmarkCheck,
  Search,
  BookOpen,
  Sparkles,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';

interface VocabularyVaultProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

interface EnrichedWord extends TargetWord {
  day: number;
  week: number;
  dayTitle: string;
}

export const VocabularyVault: React.FC<VocabularyVaultProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [onlySaved, setOnlySaved] = useState(false);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Flatten all words across the 28-day curriculum
  const allWords: EnrichedWord[] = useMemo(() => {
    const list: EnrichedWord[] = [];
    CURRICULUM.forEach((lesson) => {
      lesson.targetWords.forEach((tw) => {
        list.push({
          ...tw,
          day: lesson.day,
          week: lesson.week,
          dayTitle: lesson.titleTr,
        });
      });
    });
    return list;
  }, []);

  // Filter words
  const filteredWords = useMemo(() => {
    return allWords.filter((w) => {
      const matchSearch =
        w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.turkish.toLowerCase().includes(searchTerm.toLowerCase());
      const matchWeek = selectedWeek === 'all' || w.week === selectedWeek;
      const matchSaved = !onlySaved || progress.savedWords.includes(w.word);
      return matchSearch && matchWeek && matchSaved;
    });
  }, [allWords, searchTerm, selectedWeek, onlySaved, progress.savedWords]);

  const toggleSaveWord = (word: string) => {
    const isSaved = progress.savedWords.includes(word);
    const updated = isSaved
      ? progress.savedWords.filter((w) => w !== word)
      : [...progress.savedWords, word];
    onUpdateProgress({
      ...progress,
      savedWords: updated,
    });
  };

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <span>Kelime Hazinesi</span>
            <span aria-hidden="true">·</span>
            <span>140+ Hedef Kelime</span>
            <span aria-hidden="true">·</span>
            <span>Sesli Telaffuz & Örnek Cümleler</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Kelime Defteri & Kart Egzersizleri
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            4 haftalık LinguaAcademy AI müfredatında yer alan tüm kelimeleri fonetik telaffuzları, Türkçe karşılıkları ve gerçek hayattaki kullanım örnekleriyle inceleyin.
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setFlashcardMode(!flashcardMode);
              setIsFlipped(false);
              setFlashcardIndex(0);
            }}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs ${
              flashcardMode
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{flashcardMode ? 'Sözlük Listesine Dön' : 'Hafıza Kartı (Flashcard) Modu'}</span>
          </button>
        </div>
      </div>

      {/* FLASHCARD MODE VIEW */}
      {flashcardMode ? (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Kart {flashcardIndex + 1} / {filteredWords.length}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-indigo-700">
                Gün {currentFlashcard?.day} ({currentFlashcard?.dayTitle})
              </span>
            </div>
          </div>

          {currentFlashcard ? (
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-3xl p-8 min-h-[340px] flex flex-col justify-between cursor-pointer transition-all shadow-sm select-none relative group"
            >
              {/* Card top */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isFlipped ? 'Türkçe Karşılık' : 'İngilizce Kelime'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(currentFlashcard.word);
                    }}
                    title="Telaffuzu Dinle"
                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveWord(currentFlashcard.word);
                    }}
                    title="Kaydet"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500"
                  >
                    {progress.savedWords.includes(currentFlashcard.word) ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Center */}
              <div className="text-center py-6 space-y-3">
                {!isFlipped ? (
                  <>
                    <h2 className="text-4xl font-bold text-slate-900 font-display">
                      {currentFlashcard.word}
                    </h2>
                    <p className="text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70 font-medium inline-block">
                      🗣️ Okunuşu: <span className="font-bold">"{getTurkishPronunciation(currentFlashcard.word)}"</span>
                    </p>
                    <p className="text-xs text-slate-500 pt-3 italic max-w-sm mx-auto">
                      "{currentFlashcard.exampleEn}"
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-indigo-600 font-display">
                      {currentFlashcard.turkish}
                    </h2>
                    <p className="text-xs text-slate-600 pt-3 max-w-sm mx-auto">
                      Türkçe Çeviri: "{currentFlashcard.exampleTr}"
                    </p>
                  </>
                )}
              </div>

              {/* Card Bottom: click instruction */}
              <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400 group-hover:text-indigo-600">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Kartı çevirmek için dokunun veya tıklayın</span>
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-2xl p-8 text-center text-slate-500 text-sm">
              Bu filtreye uygun kelime bulunamadı.
            </div>
          )}

          {/* Flashcard navigation buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              disabled={flashcardIndex <= 0}
              onClick={() => {
                setFlashcardIndex((prev) => prev - 1);
                setIsFlipped(false);
              }}
              className="flex-1 py-3 rounded-xl border border-slate-200 bg-white font-semibold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Kart</span>
            </button>

            <button
              disabled={flashcardIndex >= filteredWords.length - 1}
              onClick={() => {
                setFlashcardIndex((prev) => prev + 1);
                setIsFlipped(false);
              }}
              className="flex-1 py-3 rounded-xl bg-slate-900 font-semibold text-xs text-white hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Sonraki Kart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD DICTIONARY LIST VIEW */
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kelime veya Türkçe anlam ara..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                  onlySaved
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Kaydedilenler ({progress.savedWords.length})</span>
              </button>

              <div className="h-4 w-px bg-slate-200 hidden sm:block" />

              <button
                onClick={() => setSelectedWeek('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedWeek === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tümü
              </button>
              {[1, 2, 3, 4].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedWeek === w
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {w}. Hafta
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>{filteredWords.length} kelime bulundu</span>
            <span>Telaffuz simgesine tıklayarak anında dinleyebilirsiniz</span>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((item) => {
              const isSaved = progress.savedWords.includes(item.word);

              return (
                <div
                  key={`${item.day}_${item.word}`}
                  className="bg-white border border-slate-200 rounded-xl p-4.5 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1 font-medium">
                        <span>Gün {item.day}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.dayTitle}</span>
                      </div>
                      <button
                        onClick={() => toggleSaveWord(item.word)}
                        title={isSaved ? 'Kaydı Kaldır' : 'Kelimeyi Kaydet'}
                        className={`p-1 rounded-md transition-colors ${
                          isSaved
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-slate-300 hover:text-slate-600'
                        }`}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Word title and phonetic & Turkish pronunciation */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {item.word}
                        </h3>
                        <p className="text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70 font-medium inline-block mt-1">
                          🗣️ Okunuşu: <span className="font-bold">"{getTurkishPronunciation(item.word)}"</span>
                        </p>
                      </div>

                      <button
                        onClick={() => speakEnglish(item.word)}
                        title="Telaffuzu Dinle"
                        className="p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Turkish meaning */}
                    <p className="text-xs font-semibold text-indigo-900">
                      {item.turkish}
                    </p>

                    {/* Example sentence */}
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs text-slate-600 space-y-1">
                      <p className="italic font-medium text-slate-900">
                        "{item.exampleEn}"
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        {item.exampleTr}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
