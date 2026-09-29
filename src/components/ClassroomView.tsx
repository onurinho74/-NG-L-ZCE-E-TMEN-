import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { DayLesson, MessageTurn, TeacherEvaluationResult, UserProgress } from '../types';
import { speakEnglish, stopSpeaking } from '../utils/speech';
import { sounds } from '../utils/sound';
import { getLessonTeaching } from '../data/lessonDetails';
import { getTurkishPronunciation } from '../utils/pronunciation';
import {
  Volume2,
  Mic,
  MicOff,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Check,
  XCircle,
  PlayCircle
} from 'lucide-react';

interface ClassroomViewProps {
  lesson: DayLesson;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onGoToDay: (dayNumber: number) => void;
  onOpenCurriculum: () => void;
  academyName?: string;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  lesson,
  progress,
  onUpdateProgress,
  onGoToDay,
  onOpenCurriculum,
  academyName = 'EnglishMaster AI',
}) => {
  // Default to 'lecture' (Konu Anlatımı & Öğrenme) if this day hasn't been completed yet!
  const completedForThisDay = progress.dayChallengesCompleted[lesson.day] || [];
  const isLessonFinished = completedForThisDay.length >= lesson.challenges.length;

  const [activeStepTab, setActiveStepTab] = useState<'lecture' | 'practice'>(
    isLessonFinished ? 'practice' : 'lecture'
  );
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<MessageTurn[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const teachingData = getLessonTeaching(lesson);
  const currentChallenge = lesson.challenges[activeChallengeIndex] || lesson.challenges[0];

  // Initialize or reset lesson messages when day changes
  useEffect(() => {
    setActiveChallengeIndex(0);
    setUserInput('');
    setShowHint(false);
    stopSpeaking();

    // If day changed and not completed, start at lecture tab so user actually learns first
    const isCompleted = (progress.dayChallengesCompleted[lesson.day] || []).length >= lesson.challenges.length;
    setActiveStepTab(isCompleted ? 'practice' : 'lecture');

    // Start with the teacher's greeting/prompt
    const initialTurn: MessageTurn = {
      id: `init_${lesson.day}_${Date.now()}`,
      sender: 'teacher',
      text: lesson.initialPrompt,
      textTr: lesson.initialPromptTr,
      timestamp: Date.now(),
      challengeId: lesson.challenges[0]?.id,
    };
    setMessages([initialTurn]);
  }, [lesson.day]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (activeStepTab === 'practice') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isEvaluating, activeStepTab]);

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  // Robust microphone speech recognition handler
  const toggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Tarayıcınız ses tanıma özelliğini desteklemiyor. Google Chrome veya Safari kullanarak konuşabilirsiniz.'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          setUserInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error/status:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Mic start error:', err);
      setIsListening(false);
    }
  };

  // Submit user message to AI Teacher
  const handleSubmit = async (overrideText?: string) => {
    const textToSend = (overrideText || userInput).trim();
    if (!textToSend || isEvaluating) return;

    setUserInput('');
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    }

    const userTurn: MessageTurn = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: Date.now(),
      challengeId: currentChallenge?.id,
    };

    setMessages((prev) => [...prev, userTurn]);
    setIsEvaluating(true);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: textToSend,
          current_day: lesson.day,
          day_title: lesson.titleTr,
          target_words: lesson.targetWords.map((w) => w.word),
          expected_pattern: lesson.expectedPattern,
          step_context: currentChallenge?.instructionTr || '',
          conversation_history: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Değerlendirme servisine erişilemedi');
      }

      const evaluation: TeacherEvaluationResult = await response.json();

      if (evaluation.is_correct) {
        sounds.playSuccess();
      } else {
        sounds.playHint();
      }

      const teacherTurn: MessageTurn = {
        id: `teacher_${Date.now()}`,
        sender: 'teacher',
        text: evaluation.next_prompt || evaluation.feedback_message,
        textTr: evaluation.feedback_message || currentChallenge?.instructionTr,
        timestamp: Date.now(),
        evaluation,
        challengeId: currentChallenge?.id,
      };

      setMessages((prev) => [...prev, teacherTurn]);

      // Update progress
      const earnedScore = evaluation.score_earned || (evaluation.is_correct ? 50 : 20);
      const isCompleted = evaluation.is_correct;

      const currentDayChallenges = progress.dayChallengesCompleted[lesson.day] || [];
      const updatedChallenges =
        isCompleted && !currentDayChallenges.includes(currentChallenge.id)
          ? [...currentDayChallenges, currentChallenge.id]
          : currentDayChallenges;

      const dayIsFinished = updatedChallenges.length >= lesson.challenges.length;
      const completedDaysList =
        dayIsFinished && !progress.completedDays.includes(lesson.day)
          ? [...progress.completedDays, lesson.day]
          : progress.completedDays;

      if (dayIsFinished && !progress.completedDays.includes(lesson.day)) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        sounds.playSuccess();
      }

      const updatedProgress: UserProgress = {
        ...progress,
        totalScore: (progress.totalScore || 0) + earnedScore,
        dayScores: {
          ...progress.dayScores,
          [lesson.day]: (progress.dayScores[lesson.day] || 0) + earnedScore,
        },
        dayChallengesCompleted: {
          ...progress.dayChallengesCompleted,
          [lesson.day]: updatedChallenges,
        },
        completedDays: completedDaysList,
      };

      onUpdateProgress(updatedProgress);

      // Auto speak teacher response
      speakEnglish(evaluation.next_prompt || evaluation.feedback_message);
    } catch (err) {
      console.error('Evaluation error:', err);
      const fallbackTurn: MessageTurn = {
        id: `teacher_fallback_${Date.now()}`,
        sender: 'teacher',
        text: `Harika deneme! "${textToSend}" cümleni aldım. Şimdi konuşmamıza devam edelim!`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackTurn]);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextChallenge = () => {
    if (activeChallengeIndex < lesson.challenges.length - 1) {
      const nextIdx = activeChallengeIndex + 1;
      setActiveChallengeIndex(nextIdx);
      setShowHint(false);

      const nextChallenge = lesson.challenges[nextIdx];
      const promptTurn: MessageTurn = {
        id: `challenge_prompt_${Date.now()}`,
        sender: 'teacher',
        text: nextChallenge.promptEn,
        textTr: nextChallenge.instructionTr,
        timestamp: Date.now(),
        challengeId: nextChallenge.id,
      };
      setMessages((prev) => [...prev, promptTurn]);
      speakEnglish(nextChallenge.promptEn);
    } else {
      if (lesson.day < 28) {
        onGoToDay(lesson.day + 1);
      }
    }
  };

  const toggleSaveWord = (word: string) => {
    const isSaved = progress.savedWords.includes(word);
    const newWords = isSaved
      ? progress.savedWords.filter((w) => w !== word)
      : [...progress.savedWords, word];

    onUpdateProgress({
      ...progress,
      savedWords: newWords,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCurriculum}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Tüm Müfredat</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs">
                GÜN {lesson.day} / 28
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {lesson.titleTr}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{lesson.titleEn} • {lesson.level}</p>
          </div>
        </div>

        {/* Day Jump Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            disabled={lesson.day <= 1}
            onClick={() => onGoToDay(lesson.day - 1)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Önceki Gün</span>
          </button>
          <button
            disabled={lesson.day >= 28}
            onClick={() => onGoToDay(lesson.day + 1)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Sonraki Gün</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= 2-STEP PEDAGOGICAL TAB SWITCHER ================= */}
      {/* Step 1: Dersi Öğren (Teaching/Lecture), Step 2: Konuşma Pratiği (Interactive Practice) */}
      <div className="flex items-center justify-between p-1.5 bg-slate-100/90 border border-slate-200/80 rounded-2xl">
        <button
          onClick={() => setActiveStepTab('lecture')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeStepTab === 'lecture'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          <span>1. Adım: Konu Anlatımı & Dersi Öğren</span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-[11px] text-indigo-700 font-semibold">
            Önce Buradan Başlayın
          </span>
        </button>

        <button
          onClick={() => setActiveStepTab('practice')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeStepTab === 'practice'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          <span>2. Adım: Canlı Pratik & Konuşma Sahnesi</span>
          {completedForThisDay.length > 0 && (
            <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-[11px] text-emerald-700 font-semibold">
              {completedForThisDay.length}/{lesson.challenges.length} Tamamlandı
            </span>
          )}
        </button>
      </div>

      {/* ================= STEP 1: COMPREHENSIVE TEACHING & LESSON CONTENT ================= */}
      {activeStepTab === 'lecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hero: Lesson Summary & Objective */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
                Günün Konu Özeti & Amacı
              </span>
              <button
                onClick={() => speakEnglish(teachingData.dialogue.map(d => `${d.speaker} says: ${d.en}`).join('. '))}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Dersin diyaloglarını sesli dinle"
              >
                <Volume2 className="w-4 h-4 text-indigo-300" />
                <span>Örnek Diyaloğu Sesli Dinle</span>
              </button>
            </div>

            <p className="text-base sm:text-lg text-indigo-50 leading-relaxed font-medium">
              {teachingData.summaryTr}
            </p>

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-indigo-200">
              <span>🎯 <strong>Hedef:</strong> {lesson.objective}</span>
              <span>⏱️ <strong>Tahmini Süre:</strong> {lesson.estimatedMinutes} Dakika</span>
            </div>
          </div>

          {/* Grammar & Sentence Formula */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Gramer Mantığı & Günün Kalıp Formülü</span>
              </h2>
              <button
                onClick={() => speakEnglish(lesson.expectedPattern)}
                className="p-1.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>Kalıbı Dinle</span>
              </button>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 font-mono text-sm sm:text-base text-indigo-950 font-bold">
              {lesson.expectedPattern}
            </div>

            <div className="flex items-center gap-2 text-xs bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
              <span className="font-bold text-indigo-900">🗣️ Türkçe Okunuşu:</span>
              <span className="font-mono text-indigo-700 italic font-semibold">"{getTurkishPronunciation(lesson.expectedPattern)}"</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {teachingData.keyRuleTr}
            </p>

            {/* Pattern Examples with Listen Buttons & Turkish Pronunciation */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Örnek Cümleler (Dinleyin ve Yüksek Sesle Tekrar Edin):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.patternExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white transition-all space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        "{ex.en}"
                      </p>
                      <button
                        onClick={() => speakEnglish(ex.en)}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors shrink-0"
                        title="Dinle"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-[11px] text-indigo-700 font-medium">
                      🗣️ Okunuşu: <span className="font-mono italic font-semibold">"{getTurkishPronunciation(ex.en)}"</span>
                    </div>
                    <p className="text-xs text-slate-500">{ex.tr}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-World Interactive Dialogue (A & B Roleplay) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span>Gerçek Hayattan Karşılıklı Örnek Diyalog</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Her cümlenin Türkçe okunuşunu inceleyebilir ve ses simgesine basıp dinleyebilirsiniz.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {teachingData.dialogue.map((turn, idx) => {
                const isFirst = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isFirst
                        ? 'bg-slate-50/80 border-slate-200/80'
                        : 'bg-indigo-50/50 border-indigo-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                            isFirst ? 'bg-slate-200 text-slate-800' : 'bg-indigo-600 text-white'
                          }`}>
                            {turn.speaker}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                          "{turn.en}"
                        </p>
                        <p className="text-[11px] text-indigo-700 font-medium">
                          🗣️ Türkçe Okunuşu: <span className="font-mono italic font-semibold">"{getTurkishPronunciation(turn.en)}"</span>
                        </p>
                        <p className="text-xs text-slate-500">
                          {turn.tr}
                        </p>
                      </div>

                      <button
                        onClick={() => speakEnglish(turn.en)}
                        title="Bu repliği dinle"
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors shrink-0 shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Target Words With Phonetics & Audio & Turkish Pronunciation */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Günün 5 Önemli Kelimesi</span>
              </h2>
              <span className="text-xs text-slate-400">
                Kulaklık simgesine basıp dinleyebilirsiniz
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lesson.targetWords.map((wordObj) => {
                const isSaved = progress.savedWords.includes(wordObj.word);
                return (
                  <div
                    key={wordObj.word}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-indigo-200 transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-slate-900">
                          {wordObj.word}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => speakEnglish(wordObj.word)}
                            title="Dinle"
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleSaveWord(wordObj.word)}
                            title={isSaved ? 'Kaldır' : 'Kaydet'}
                            className="p-1 rounded-md text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-indigo-700">
                        {wordObj.turkish}
                      </p>

                      {/* Turkish Phonetic Reading Badge */}
                      <div className="mt-1 text-[11px] text-amber-900 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/70 font-medium">
                        🗣️ Okunuşu: <span className="font-bold">"{getTurkishPronunciation(wordObj.word)}"</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 italic">
                      "{wordObj.exampleEn}"
                      <div className="text-[11px] text-slate-400 not-italic mt-0.5">
                        {wordObj.exampleTr}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Mistakes & Pro Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Mistakes */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Sık Yapılan Hatalar (Bunu Yapmayın!)</span>
              </h3>
              <div className="space-y-2.5">
                {teachingData.commonMistakes.map((m, idx) => (
                  <div key={idx} className="bg-white/80 rounded-xl p-3 text-xs space-y-1 border border-rose-100">
                    <p className="text-rose-700 font-medium">❌ Yanlış: "{m.wrong}"</p>
                    <p className="text-emerald-700 font-bold">✅ Doğru: "{m.correct}"</p>
                    <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">{m.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Öğretmenin Püf Noktası (Pro Tip)</span>
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {teachingData.proTipTr}
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-3 border border-amber-200/60 text-xs text-slate-600">
                💡 <strong>Tavsiye:</strong> Konuyu öğrendikten sonra aşağıdaki yeşil butona basarak öğretmenle konuşmaya başlayın. Yanlış yapmaktan asla korkmayın!
              </div>
            </div>
          </div>

          {/* BIG CALL TO ACTION: START SPEAKING PRACTICE */}
          <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold">
              Konuyu Öğrendiniz! Şimdi Canlı Pratik Zamanı 🚀
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
              Öğrendiğiniz kelimeleri ve kalıbı kullanarak yapay zeka öğretmenle İngilizce konuşma alıştırması yapın. Öğretmen sizi dinleyecek ve cümlenizi değerlendirecek.
            </p>
            <button
              onClick={() => setActiveStepTab('practice')}
              className="px-8 py-4 rounded-2xl bg-white text-emerald-800 font-bold text-sm sm:text-base hover:bg-emerald-50 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>2. Adıma Geç: Canlı Pratiğe Başla ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: INTERACTIVE PRACTICE & LIVE EVALUATION ================= */}
      {activeStepTab === 'practice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          {/* LEFT: Quick Reference Drawer (Words & Pattern) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Kullanılacak Kalıp
                </span>
                <button
                  onClick={() => speakEnglish(lesson.expectedPattern)}
                  className="p-1 text-slate-400 hover:text-indigo-600"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-2.5 font-mono text-xs text-indigo-950 font-bold">
                {lesson.expectedPattern}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  Hedef Kelimeler
                </span>
                <button
                  onClick={() => setActiveStepTab('lecture')}
                  className="text-[11px] text-indigo-600 font-semibold hover:underline"
                >
                  Ders Anlatımına Dön
                </button>
              </div>

              <div className="space-y-1.5">
                {lesson.targetWords.map((w) => (
                  <div
                    key={w.word}
                    className="p-2 rounded-xl bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{w.word}</span>
                      <span className="text-slate-500 ml-2 text-[11px]">{w.turkish}</span>
                    </div>
                    <button
                      onClick={() => speakEnglish(w.word)}
                      className="text-slate-400 hover:text-indigo-600 p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Chat & Speaking Stage */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[650px]">
            {/* Step header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">
                  Görev {activeChallengeIndex + 1}/{lesson.challenges.length}:
                </span>
                <span className="text-xs font-medium text-indigo-700 truncate max-w-[200px] sm:max-w-none">
                  {currentChallenge?.instructionTr}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {lesson.challenges.map((ch, idx) => {
                  const isDone = completedForThisDay.includes(ch.id);
                  const isCurrent = idx === activeChallengeIndex;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setActiveChallengeIndex(idx);
                        setShowHint(false);
                      }}
                      title={`Görev ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        isCurrent
                          ? 'w-5 bg-indigo-600'
                          : isDone
                          ? 'w-2 bg-emerald-500'
                          : 'w-2 bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Hint bar */}
            <div className="px-5 py-2 bg-amber-50/60 border-b border-amber-100/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-amber-900">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>İpucu:</span>
                <span className="font-medium text-slate-700">
                  {showHint ? currentChallenge?.hintTr : 'Cevap vermek için yardım al'}
                </span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-amber-800 font-semibold underline text-[11px]"
              >
                {showHint ? 'Gizle' : 'Göster'}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((turn) => {
                const isTeacher = turn.sender === 'teacher';
                return (
                  <div
                    key={turn.id}
                    className={`flex flex-col ${isTeacher ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        isTeacher
                          ? 'bg-slate-100 text-slate-900 rounded-tl-xs'
                          : 'bg-indigo-600 text-white rounded-tr-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="whitespace-pre-wrap font-medium">{turn.text}</p>
                          {isTeacher && turn.textTr && (
                            <div className="text-[11px] text-indigo-950 font-medium pt-1.5 mt-1 border-t border-indigo-100 bg-indigo-50/70 p-2 rounded-lg">
                              🇹🇷 <span className="font-bold">Türkçe Anlamı:</span> {turn.textTr}
                            </div>
                          )}
                          {isTeacher && (
                            <p className="text-[11px] text-slate-600 font-medium pt-1">
                              🗣️ Okunuşu: <span className="font-mono italic font-semibold">"{getTurkishPronunciation(turn.text)}"</span>
                            </p>
                          )}
                        </div>
                        {isTeacher && (
                          <button
                            onClick={() => speakEnglish(turn.text)}
                            title="Sesli Dinle"
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 shrink-0"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {turn.evaluation && (
                      <div className="mt-2 max-w-[85%] p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 font-bold">
                            {turn.evaluation.is_correct ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Harika! Doğru Kabul Edildi
                              </span>
                            ) : (
                              <span className="text-amber-700 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                Geliştirilebilir Deneme
                              </span>
                            )}
                          </div>
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md text-[11px]">
                            +{turn.evaluation.score_earned} Puan
                          </span>
                        </div>
                        <p className="text-slate-600 leading-normal">
                          {turn.evaluation.feedback_message}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {isEvaluating && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-slate-500 text-xs animate-pulse max-w-[60%]">
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span>Öğretmen cümlenizi inceliyor...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Next challenge button */}
            {completedForThisDay.includes(currentChallenge.id) &&
              activeChallengeIndex < lesson.challenges.length - 1 && (
                <div className="px-5 py-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800">
                    Bu adımı başardınız!
                  </span>
                  <button
                    onClick={handleNextChallenge}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Sonraki Göreve Geç</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            {/* Input bar with Mic */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMic}
                  disabled={isEvaluating}
                  title={
                    isListening
                      ? 'Dinlemeyi durdur'
                      : 'İngilizce konuşmak için mikrofona tıklayın'
                  }
                  className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-100'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>

                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                  disabled={isEvaluating}
                  placeholder={
                    isListening
                      ? 'Dinleniyor... İngilizce konuşun...'
                      : 'Cevabınızı buraya yazın veya mikrofona basıp konuşun...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 transition-all placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!userInput.trim() || isEvaluating}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Gönder</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>
                  {isListening
                    ? '🔴 Dinleniyor: Net bir şekilde İngilizce konuşun.'
                    : '💡 Mikrofona basarak konuşabilir veya klavyeyle yazabilirsiniz.'}
                </span>
                <button
                  onClick={() => {
                    const initialTurn: MessageTurn = {
                      id: `reset_${Date.now()}`,
                      sender: 'teacher',
                      text: currentChallenge?.promptEn || lesson.initialPrompt,
                      textTr: currentChallenge?.instructionTr || lesson.initialPromptTr,
                      timestamp: Date.now(),
                    };
                    setMessages([initialTurn]);
                  }}
                  className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
