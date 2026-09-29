import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { DayLesson, MessageTurn, TeacherEvaluationResult, UserProgress } from '../types';
import { speakEnglish, stopSpeaking, getSpeechRecognition } from '../utils/speech';
import { sounds } from '../utils/sound';
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
  RefreshCw,
  Lightbulb,
  Award,
  BookOpen,
  ArrowRight
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
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [messages, setMessages] = useState<MessageTurn[]>([]);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChallenge = lesson.challenges[activeChallengeIndex] || lesson.challenges[0];

  // Initialize or reset lesson messages when day changes
  useEffect(() => {
    setActiveChallengeIndex(0);
    setUserInput('');
    stopSpeaking();

    // Start with the day's initial prompt from teacher
    const initialTurn: MessageTurn = {
      id: `init_${lesson.day}_${Date.now()}`,
      sender: 'teacher',
      text: lesson.initialPrompt,
      timestamp: Date.now(),
      challengeId: lesson.challenges[0]?.id,
    };
    setMessages([initialTurn]);
  }, [lesson.day]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isEvaluating]);

  // Handle Speech Recognition
  useEffect(() => {
    const recognition = getSpeechRecognition();
    if (recognition) {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      setRecognitionInstance(recognition);
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionInstance) {
      alert('Tarayıcınız ses tanıma (Web Speech API) özelliğini desteklemiyor. Metin kutusuna yazarak devam edebilirsiniz.');
      return;
    }
    if (isListening) {
      recognitionInstance.stop();
      setIsListening(false);
    } else {
      try {
        recognitionInstance.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Submit user message to AI Teacher Engine
  const handleSubmit = async (overrideText?: string) => {
    const textToSend = (overrideText || userInput).trim();
    if (!textToSend || isEvaluating) return;

    setUserInput('');
    if (isListening && recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
    }

    // Append user message immediately
    const userTurn: MessageTurn = {
      id: `usr_${Date.now()}`,
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
          target_words: lesson.targetWords.map((w) => ({ word: w.word, turkish: w.turkish })),
          expected_pattern: lesson.expectedPattern,
          step_context: `${currentChallenge?.type.toUpperCase()}: ${currentChallenge?.instructionTr}`,
          conversation_history: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const evalResult: TeacherEvaluationResult = await response.json();

      // Sound and confetti feedback
      if (evalResult.is_correct) {
        sounds.playSuccess();
        if (evalResult.score_earned >= 80) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
          });
        }
      } else {
        sounds.playHint();
      }

      // Add teacher response message
      const teacherTurn: MessageTurn = {
        id: `tea_${Date.now()}`,
        sender: 'teacher',
        text: evalResult.next_prompt,
        timestamp: Date.now(),
        evaluation: evalResult,
        challengeId: currentChallenge?.id,
      };

      setMessages((prev) => [...prev, teacherTurn]);

      // Update progress
      const prevCompletedChallenges = progress.dayChallengesCompleted[lesson.day] || [];
      const updatedChallenges = Array.from(
        new Set([...prevCompletedChallenges, currentChallenge.id])
      );

      const prevScore = progress.dayScores[lesson.day] || 0;
      const highestScore = Math.max(prevScore, evalResult.score_earned);
      const isDayComplete = updatedChallenges.length >= lesson.challenges.length;

      const completedDaysSet = new Set(progress.completedDays);
      if (isDayComplete) {
        completedDaysSet.add(lesson.day);
      }

      // Advance to next challenge if correct and available
      if (evalResult.is_correct && activeChallengeIndex < lesson.challenges.length - 1) {
        setActiveChallengeIndex((prev) => prev + 1);
      }

      onUpdateProgress({
        ...progress,
        completedDays: Array.from(completedDaysSet),
        dayScores: {
          ...progress.dayScores,
          [lesson.day]: highestScore,
        },
        dayChallengesCompleted: {
          ...progress.dayChallengesCompleted,
          [lesson.day]: updatedChallenges,
        },
        totalScore: progress.totalScore + evalResult.score_earned,
      });
    } catch (err) {
      console.error('Failed to evaluate message:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Toggle word bookmark in vocabulary vault
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

  const completedForThisDay = progress.dayChallengesCompleted[lesson.day] || [];
  const isLessonFinished = completedForThisDay.length >= lesson.challenges.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Day Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCurriculum}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Müfredat Haritası</span>
          </button>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-indigo-700">Hafta {lesson.week}</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-slate-900">Gün {lesson.day}</span>
            <span aria-hidden="true">·</span>
            <span>{lesson.level}</span>
          </div>
        </div>

        {/* Day Jump controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={lesson.day <= 1}
            onClick={() => onGoToDay(lesson.day - 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Önceki Gün
          </button>
          <span className="text-xs font-mono font-bold text-slate-700 px-2">
            {lesson.day} / 28
          </span>
          <button
            disabled={lesson.day >= 28}
            onClick={() => onGoToDay(lesson.day + 1)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Sonraki Gün
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 2-Zone Sandbox: Left Lesson Deck & Right AI Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT ZONE: LESSON GUIDE DECK (5 Cols) ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Lesson Overview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>{lesson.category}</span>
                {isLessonFinished && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tamamlandı
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-display">
                {lesson.titleTr}
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {lesson.titleEn}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-indigo-700 block mb-1">Günün Hedefi:</span>
              {lesson.objective}
            </div>

            {/* Target Pattern Box */}
            <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Beklenen Kalıp (Target Pattern)
                </span>
                <button
                  onClick={() => speakEnglish(lesson.expectedPattern)}
                  title="Kalıbı Sesli Dinle"
                  className="p-1 rounded-md text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-indigo-200/70 rounded-lg p-2.5 font-mono text-xs text-indigo-950 font-semibold">
                {lesson.expectedPattern}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {lesson.patternExplanation}
              </p>

              {lesson.patternExamples.length > 0 && (
                <div className="pt-2 border-t border-indigo-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-indigo-800">
                    Kalıp Örneği:
                  </span>
                  <div className="text-xs text-slate-700 bg-white/70 rounded-md p-2 border border-indigo-100/60">
                    <p className="font-medium text-slate-900">
                      "{lesson.patternExamples[0].en}"
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {lesson.patternExamples[0].tr}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Target Vocabulary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Günün Kelimeleri (5 Kelime)</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {lesson.targetWords.length} Kelime
              </span>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100">
              {lesson.targetWords.map((wordObj) => {
                const isSaved = progress.savedWords.includes(wordObj.word);
                return (
                  <div key={wordObj.word} className="pt-2.5 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {wordObj.word}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          {wordObj.phonetic}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakEnglish(wordObj.word)}
                          title="Telaffuzu Dinle"
                          className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleSaveWord(wordObj.word)}
                          title={isSaved ? 'Defterden Kaldır' : 'Kelime Defterine Kaydet'}
                          className={`p-1 rounded-md transition-colors ${
                            isSaved
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-indigo-900 font-medium">
                      {wordObj.turkish}
                    </p>

                    <p className="text-xs text-slate-500 italic bg-slate-50 px-2 py-1 rounded">
                      "{wordObj.exampleEn}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Steps Progression Tracker */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold uppercase tracking-wider text-slate-700">
                Günün Alıştırma Adımları
              </span>
              <span className="font-mono font-semibold">
                {completedForThisDay.length} / {lesson.challenges.length} Tamamlandı
              </span>
            </div>

            <div className="space-y-2">
              {lesson.challenges.map((ch, idx) => {
                const isCurrent = idx === activeChallengeIndex;
                const isDone = completedForThisDay.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChallengeIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : isDone
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
                            isCurrent
                              ? 'border-indigo-600 text-indigo-700 bg-indigo-100'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          Adım {idx + 1}: {ch.type === 'warmup' ? 'Isınma' : ch.type === 'vocab' ? 'Kelime Pratiği' : ch.type === 'pattern' ? 'Kalıp Uygulaması' : 'Diyalog & Simülasyon'}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-semibold text-indigo-600 uppercase">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-snug">
                        {ch.instructionTr}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ZONE: AI INTERACTIVE CLASSROOM CONSOLE (7 Cols) ================= */}
        <div className="lg:col-span-7 flex flex-col h-[780px] bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {/* Console Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">
                    {academyName} Öğretmen
                  </h2>
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Canlı
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Gramer, telaffuz ve kalıp doğruluğunu anında değerlendirir.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const initialTurn: MessageTurn = {
                    id: `reset_${Date.now()}`,
                    sender: 'teacher',
                    text: lesson.initialPrompt,
                    timestamp: Date.now(),
                  };
                  setMessages([initialTurn]);
                }}
                title="Dersi Baştan Başlat"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Challenge Guide Banner */}
          {currentChallenge && (
            <div className="bg-indigo-50/70 border-b border-indigo-100 px-5 py-3 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Şu Anki Görev ({activeChallengeIndex + 1}/{lesson.challenges.length}):</span>
                  <span className="font-normal text-indigo-950">{currentChallenge.instructionTr}</span>
                </div>
                {currentChallenge.hintTr && (
                  <p className="text-slate-600 italic">
                    {currentChallenge.hintTr}
                  </p>
                )}
              </div>

              <button
                onClick={() => speakEnglish(currentChallenge.promptEn)}
                title="Yönergeyi Seslendir"
                className="shrink-0 p-1.5 text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Messages & Evaluations Feed */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => {
              const isTeacher = msg.sender === 'teacher';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isTeacher ? 'items-start' : 'items-end'}`}
                >
                  {/* Sender identity */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1 px-1">
                    <span>{isTeacher ? academyName : 'Sen'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Speech Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isTeacher
                        ? 'bg-slate-100 text-slate-900 rounded-tl-xs'
                        : 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {isTeacher && (
                        <button
                          onClick={() => speakEnglish(msg.text)}
                          title="Cümleyi Dinle"
                          className="shrink-0 p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-200 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Teacher Evaluation Card if present */}
                  {msg.evaluation && (
                    <div className="mt-2.5 max-w-[90%] w-full bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-2">
                      {/* Evaluation header: is_correct and score */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          {msg.evaluation.is_correct ? (
                            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Doğru & Başarılı</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-amber-700 font-bold text-xs">
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              <span>Düzeltme & Geliştirme Gerekiyor</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold">
                          <Award className="w-3 h-3 text-indigo-600" />
                          <span>+{msg.evaluation.score_earned} Puan</span>
                        </div>
                      </div>

                      {/* Feedback message in Turkish */}
                      <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                        <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wider">
                          Öğretmen Değerlendirmesi:
                        </span>
                        <p>{msg.evaluation.feedback_message}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isEvaluating && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center animate-spin text-xs">
                  ⚡
                </div>
                <div className="bg-slate-100 text-slate-600 rounded-2xl rounded-tl-xs px-4 py-3 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-medium ml-1">
                    Cümleniz analiz ediliyor ve geri bildirim hazırlanıyor...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Helper Suggestions */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
              Hızlı Şablon:
            </span>
            {lesson.targetWords.slice(0, 3).map((tw) => (
              <button
                key={tw.word}
                onClick={() => setUserInput((prev) => `${prev} ${tw.word}`.trim())}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors shrink-0 text-xs"
              >
                +{tw.word}
              </button>
            ))}
            <button
              onClick={() => {
                if (lesson.patternExamples[0]?.en) {
                  setUserInput(lesson.patternExamples[0].en);
                }
              }}
              className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors shrink-0 text-xs font-medium"
            >
              Kalıp Örneğini Doldur
            </button>
          </div>

          {/* Input Control Box */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              {/* Mic Speech-to-Text Button */}
              <button
                type="button"
                onClick={toggleMic}
                title={isListening ? 'Kaydı Durdur' : 'İngilizce Konuşarak Cevap Ver'}
                className={`p-3 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse shadow-md ring-2 ring-rose-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5 text-indigo-600" />
                )}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                disabled={isEvaluating}
                placeholder={
                  isListening
                    ? 'Dinleniyor... İngilizce cümlenizi söyleyin...'
                    : 'Cümlenizi İngilizce olarak buraya yazın veya mikrofona konuşun...'
                }
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 transition-all placeholder:text-slate-400"
              />

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={!userInput.trim() || isEvaluating}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <span>Gönder</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Live speech hint */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Enter tuşuna basarak veya 'Gönder' ile öğretmene iletebilirsiniz.</span>
              {isListening && (
                <span className="text-rose-600 font-semibold animate-pulse">
                  Mikrofon Aktif (İngilizce konuşun)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
