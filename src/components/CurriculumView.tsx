import React, { useState } from 'react';
import { CURRICULUM } from '../data/curriculum';
import { DayLesson, UserProgress } from '../types';
import { CheckCircle2, ChevronRight, Sparkles, Clock, Compass, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

interface CurriculumViewProps {
  progress: UserProgress;
  onSelectDay: (dayNumber: number) => void;
  academyName?: string;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  progress,
  onSelectDay,
  academyName = 'EnglishMaster AI',
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  const weeksMeta = [
    {
      week: 1,
      titleTr: 'Hafta 1: Temeller & Günlük Yaşam',
      titleEn: 'Foundations & Daily Routine',
      icon: MessageSquare,
      desc: 'Kendini tanıtma, günlük alışkanlıklar, aile, beğeniler, kafe & restoran diyalogları.',
      daysRange: 'Gün 1 - 7',
      level: 'A1 - A2 Başlangıç',
    },
    {
      week: 2,
      titleTr: 'Hafta 2: Seyahat & Şehir Hayatı',
      titleEn: 'Travel, Directions & City Navigation',
      icon: Compass,
      desc: 'Yol tarifi, havalimanı, otel check-in, metro & bilet alma, eczane ve seyahat simülasyonu.',
      daysRange: 'Gün 8 - 14',
      level: 'B1 - B2 Orta Seviye',
    },
    {
      week: 3,
      titleTr: 'Hafta 3: İş Dünyası & Profesyonel İletişim',
      titleEn: 'Business English & Career Communication',
      icon: Briefcase,
      desc: 'Mülakat stratejileri, resmi e-posta, toplantıda itiraz ve uzlaşı, kriz yönetimi ve sunumlar.',
      daysRange: 'Gün 15 - 21',
      level: 'B2 - C1 İleri Düzey',
    },
    {
      week: 4,
      titleTr: 'Hafta 4: Akıcı Konuşma & İleri Düzey Ustalık',
      titleEn: 'Fluency, Storytelling & Nuanced Expression',
      icon: GraduationCap,
      desc: 'Fikir savunma, derin anı hikayeleştirme, varsayımlar (conditionals), deyimler ve mezuniyet konuşması.',
      daysRange: 'Gün 22 - 28',
      level: 'C1 Ustalık & Mezuniyet',
    },
  ];

  const filteredDays =
    selectedWeek === 'all'
      ? CURRICULUM
      : CURRICULUM.filter((l) => l.week === selectedWeek);

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 28) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              <span>Yapılandırılmış Müfredat</span>
              <span aria-hidden="true">·</span>
              <span>4 Hafta · 28 Gün</span>
              <span aria-hidden="true">·</span>
              <span>140+ Kelime</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display text-balance">
              {academyName} İngilizce Yol Haritası
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Her gün için özel olarak kurgulanmış günün kelimeleri, hedef gramer kalıbı ve yapay zeka öğretmenle interaktif konuşma simülasyonları ile 28 günde akıcı İngilizceye ulaşın.
            </p>
          </div>

          {/* Quick stats box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 min-w-[240px] space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">Genel İlerleme</span>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                %{progressPercent} ({completedCount}/28 Gün)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200">
              <span>Şu Anki Ders</span>
              <span className="font-semibold text-indigo-600">Gün {progress.currentDay}</span>
            </div>
          </div>
        </div>

        {/* Week segmented tabs */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedWeek === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tüm 28 Gün
          </button>
          {weeksMeta.map((w) => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedWeek === w.week
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{w.week}. Hafta</span>
              <span className="text-[11px] opacity-80">({w.daysRange})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Week Overview Cards (if viewing all) */}
      {selectedWeek === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeksMeta.map((wm) => {
            const Icon = wm.icon;
            const weekDays = CURRICULUM.filter((c) => c.week === wm.week);
            const weekCompleted = weekDays.filter((d) => progress.completedDays.includes(d.day)).length;

            return (
              <div
                key={wm.week}
                onClick={() => setSelectedWeek(wm.week)}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {weekCompleted}/7 Tamamlandı
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {wm.titleTr}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {wm.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{wm.level}</span>
                  <span className="text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center">
                    İncele <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Day Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            {selectedWeek === 'all'
              ? 'Tüm Dersler'
              : `${selectedWeek}. Hafta Dersleri`}
          </h2>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {filteredDays.length} Ders Listeleniyor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDays.map((lesson) => {
            const isCompleted = progress.completedDays.includes(lesson.day);
            const isCurrent = progress.currentDay === lesson.day;
            const dayScore = progress.dayScores[lesson.day];

            return (
              <div
                key={lesson.day}
                className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-sm'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Card top metadata: unboxed text */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="font-mono font-semibold text-slate-700">
                        GÜN {lesson.day}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Hafta {lesson.week}</span>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tamamlandı</span>
                        {dayScore && (
                          <span className="font-mono tabular-nums">({dayScore}p)</span>
                        )}
                      </span>
                    ) : isCurrent ? (
                      <span className="text-indigo-600 font-semibold text-xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mevcut Ders</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.estimatedMinutes} dk</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {lesson.titleTr}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {lesson.titleEn}
                    </p>
                  </div>

                  {/* Target pattern teaser */}
                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                      Beklenen Kalıp:
                    </span>
                    <p className="text-xs font-mono text-indigo-900 mt-0.5 line-clamp-1">
                      {lesson.expectedPattern}
                    </p>
                  </div>

                  {/* Vocabulary preview */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-slate-400">
                      Günün Kelimeleri:
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-600">
                      {lesson.targetWords.slice(0, 4).map((w, idx) => (
                        <span key={w.word} className="font-medium">
                          {w.word}
                          {idx < 3 ? <span className="text-slate-300 ml-1">·</span> : ''}
                        </span>
                      ))}
                      {lesson.targetWords.length > 4 && (
                        <span className="text-slate-400 text-[11px] font-mono">
                          +{lesson.targetWords.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {lesson.category}
                  </span>
                  <button
                    onClick={() => onSelectDay(lesson.day)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                        : isCompleted
                        ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{isCompleted ? 'Tekrar Et' : isCurrent ? 'Derse Devam Et' : 'Derse Git'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
