import React, { useState } from 'react';
import { UserProgress } from '../types';
import { CURRICULUM } from '../data/curriculum';
import {
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Bookmark,
  Printer,
  Sparkles,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  RotateCcw,
  Share2,
  Trophy,
  X,
} from 'lucide-react';

interface ProgressReportProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onGoToDay: (dayNumber: number) => void;
  academyName?: string;
  studentDisplayName?: string;
  onOpenShare?: () => void;
  onOpenLeaderboard?: () => void;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  progress,
  onResetProgress,
  onGoToDay,
  academyName = 'EnglishMaster AI',
  studentDisplayName,
  onOpenShare,
  onOpenLeaderboard,
}) => {
  const [studentName, setStudentName] = useState(studentDisplayName || 'Değerli Öğrenci');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Sync if studentDisplayName changes
  React.useEffect(() => {
    if (studentDisplayName) {
      setStudentName(studentDisplayName);
    }
  }, [studentDisplayName]);

  const crestInitials = academyName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 28) * 100);

  const weekProgress = [1, 2, 3, 4].map((w) => {
    const weekDays = CURRICULUM.filter((c) => c.week === w);
    const completed = weekDays.filter((d) => progress.completedDays.includes(d.day)).length;
    return {
      week: w,
      title: w === 1 ? 'Temeller' : w === 2 ? 'Seyahat' : w === 3 ? 'İş İngilizcesi' : 'İleri Akıcılık',
      completed,
      total: 7,
      percent: Math.round((completed / 7) * 100),
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <span>Öğrenci Karnesi</span>
            <span aria-hidden="true">·</span>
            <span>28 Günlük Performans Metrikleri</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            İlerleme & Başarı Durumu
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Günlük konuşma pratikleriniz, aldığınız yapay zeka öğretmen puanları ve haftalık kazanımlarınız burada otomatik olarak toplanır.
          </p>
        </div>

        {/* Certificate CTA */}
        <div>
          <button
            onClick={() => setShowCertificateModal(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-2 whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Mezuniyet Sertifikasını Görüntüle</span>
          </button>
        </div>
      </div>

      {/* Quantitative Rigor Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Toplam Kazanılan Puan
            </span>
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {progress.totalScore.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Aktif Günlük Seri
            </span>
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {progress.streakDays} Gün
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Tamamlanan Günler
            </span>
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {completedCount} / 28 Gün
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">
              Kaydedilen Kelimeler
            </span>
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {progress.savedWords.length} Kelime
            </span>
          </div>
        </div>
      </div>

      {/* 4-Week Progress Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Haftalık Tamamlanma Durumu
          </h2>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            Genel: %{progressPercent}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weekProgress.map((wp) => (
            <div
              key={wp.week}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{wp.week}. Hafta ({wp.title})</span>
                <span className="font-mono font-semibold text-indigo-700">
                  {wp.completed} / {wp.total}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${wp.percent}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 block">
                {wp.percent === 100
                  ? 'Tebrikler, bu hafta tamamlandı!'
                  : `${wp.total - wp.completed} ders kaldı.`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Days List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Ders Geçmişi & Puan Tablosu
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {CURRICULUM.map((lesson) => {
            const isDone = progress.completedDays.includes(lesson.day);
            const score = progress.dayScores[lesson.day];
            const isCurrent = progress.currentDay === lesson.day;

            return (
              <button
                key={lesson.day}
                onClick={() => onGoToDay(lesson.day)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[90px] ${
                  isDone
                    ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50'
                    : isCurrent
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-200'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-mono font-bold text-slate-700">
                  GÜN {lesson.day}
                </div>

                {isDone ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-mono font-bold text-emerald-700 mt-0.5">
                      {score ? `${score}p` : 'Tamam'}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    {isCurrent ? 'Aktif' : 'Başlanmadı'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Progress Helper */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => {
            if (confirm('İlerlemenizi sıfırlamak istediğinizden emin misiniz?')) {
              onResetProgress();
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>İlerlemeyi Sıfırla</span>
        </button>
      </div>

      {/* ================= OFFICIAL GRADUATION CERTIFICATE MODAL ================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 sm:p-10 shadow-2xl border border-slate-200 space-y-6 relative max-h-[95vh] overflow-y-auto">
            {/* Student Name Input Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Sertifika Sahibi:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Adınızı girin"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                {onOpenShare && (
                  <button
                    onClick={onOpenShare}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Sertifikamı Paylaş
                  </button>
                )}
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Yazdır / PDF Kaydet
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>

            {/* The Certificate Canvas */}
            <div className="border-8 border-double border-indigo-950 p-8 sm:p-12 text-center bg-gradient-to-b from-slate-50 to-white rounded-2xl relative shadow-inner space-y-6">
              {/* Academy Crest */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-2xl shadow-md border-4 border-amber-400">
                  {crestInitials || 'EM'}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest block">
                  {academyName} · Official Graduation Credential
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display mt-2">
                  Certificate of English Fluency
                </h2>
                <p className="text-xs text-slate-500 mt-1 italic">
                  This document officially certifies that
                </p>
              </div>

              <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-indigo-900 font-display">
                  {studentName || 'Değerli Öğrenci'}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                has successfully undertaken the rigorous 4-Week Interactive English Curriculum, demonstrating verified mastery in daily routines, travel negotiations, professional business communication, and fluent storytelling.
              </p>

              {/* Certificate Metadata */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">PROGRAM</span>
                  <span className="font-semibold text-slate-800">4-Week Immersion</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">VERIFIED SCORE</span>
                  <span className="font-semibold font-mono text-indigo-900">{progress.totalScore} Puan</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">ISSUE DATE</span>
                  <span className="font-semibold text-slate-800">{new Date().toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified by {academyName} Tutor Engine</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
