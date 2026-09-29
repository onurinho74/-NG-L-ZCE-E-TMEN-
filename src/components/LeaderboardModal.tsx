import React from 'react';
import {
  X,
  Trophy,
  Flame,
  Award,
  Users,
  Sparkles,
  TrendingUp,
  UserPlus,
  Share2,
} from 'lucide-react';
import { getAllAccounts, getActiveSession } from '../services/accountService';
import { UserProgress } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserProgress?: UserProgress;
  currentUserDisplayName?: string;
  onOpenShare?: () => void;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  streak: number;
  completedDaysCount: number;
  isCurrentUser: boolean;
  avatarColor: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentUserProgress,
  currentUserDisplayName = 'Siz',
  onOpenShare,
}) => {
  if (!isOpen) return null;

  const activeSession = getActiveSession();

  if (!activeSession) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden p-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
            Liderlik Tablosu (Oturum Gerekli)
          </h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Liderlik tablosunu görebilmek ve sıralamada yer alabilmek için lütfen oturum açın. Oturum kapalıyken puanınız gizlidir.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Tamam
          </button>
        </div>
      </div>
    );
  }

  // Gather ONLY genuine registered accounts
  const accounts = getAllAccounts();

  const colors = [
    'bg-indigo-600',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-rose-600',
    'bg-purple-600',
    'bg-sky-600',
    'bg-teal-600',
  ];

  // Map real accounts only
  const realEntries: LeaderboardEntry[] = accounts.map((acc, index) => {
    const isCurrent =
      acc.displayName.toLowerCase() === currentUserDisplayName.toLowerCase() ||
      acc.progress?.userName?.toLowerCase() === currentUserDisplayName.toLowerCase();

    return {
      id: acc.uid,
      name: acc.displayName || acc.username || 'Öğrenci',
      score: acc.progress?.totalScore ?? 0,
      streak: acc.progress?.streakDays ?? 1,
      completedDaysCount: acc.progress?.completedDays?.length ?? 0,
      isCurrentUser: isCurrent,
      avatarColor: colors[index % colors.length],
    };
  });

  // Ensure current user is in list if not yet saved in accounts
  const currentUserIncluded = realEntries.some((e) => e.isCurrentUser);
  if (!currentUserIncluded && currentUserProgress) {
    realEntries.push({
      id: 'current_active_user',
      name: currentUserDisplayName || 'Siz',
      score: currentUserProgress.totalScore ?? 0,
      streak: currentUserProgress.streakDays ?? 1,
      completedDaysCount: currentUserProgress.completedDays?.length ?? 0,
      isCurrentUser: true,
      avatarColor: 'bg-indigo-600',
    });
  }

  // De-duplicate by lowercased name
  const seenNames = new Set<string>();
  const uniqueEntries = realEntries.filter((item) => {
    const lower = item.name.toLowerCase().trim();
    if (!lower || seenNames.has(lower)) return false;
    seenNames.add(lower);
    return true;
  });

  // Sort by highest score descending
  uniqueEntries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.streak - a.streak;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-indigo-900 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-white/20 text-amber-300 border border-white/20">
              <Trophy className="w-4 h-4 text-amber-300" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              Gerçek Öğrenci Sıralaması
            </span>
          </div>

          <h3 className="text-2xl font-bold font-display flex items-center gap-2">
            <span>Öğrenci & Arkadaş Sıralaması</span>
          </h3>
          <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
            Burada yalnızca bu platforma kayıt olan gerçek öğrenciler ve arkadaşlarınız listelenir.
          </p>

          {/* Quick Invite CTA */}
          {onOpenShare && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-indigo-200">Arkadaşlarınla yarışmak için:</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenShare();
                }}
                className="py-1 px-3 rounded-lg bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Arkadaşını Davet Et &rarr;</span>
              </button>
            </div>
          )}
        </div>

        {/* Leaderboard List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {uniqueEntries.length > 0 ? (
            uniqueEntries.map((item, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all ${
                    item.isCurrentUser
                      ? 'bg-indigo-50/90 border-2 border-indigo-500 shadow-2xs'
                      : isTop3
                      ? 'bg-amber-50/50 border border-amber-200/80 hover:bg-amber-50'
                      : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Rank & User Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-7 text-center shrink-0">
                      {rank === 1 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                          👑
                        </span>
                      ) : rank === 2 ? (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center font-bold text-xs shadow-2xs">
                          🥈
                        </span>
                      ) : rank === 3 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-bold text-xs shadow-2xs">
                          🥉
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-xs text-slate-400">
                          #{rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className={`w-9 h-9 rounded-xl ${item.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs`}
                    >
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name & Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900 truncate">
                          {item.name}
                        </span>
                        {item.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white uppercase tracking-wider">
                            Siz
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="font-mono font-semibold text-slate-700">
                            {item.streak} Gün Seri
                          </span>
                        </span>
                        <span>•</span>
                        <span>{item.completedDaysCount} Ders Tamam</span>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-sm text-indigo-700">
                      {item.score.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Puan
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              Henüz kayıtlı öğrenci bulunmuyor.
            </div>
          )}

          {/* Invitation Card when few real people are on the board */}
          {uniqueEntries.length <= 2 && onOpenShare && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-dashed border-indigo-200 text-center space-y-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold text-indigo-950">
                Arkadaşlarınızı davet edin!
              </p>
              <p className="text-[11px] text-indigo-700 max-w-xs mx-auto leading-relaxed">
                Site linkini paylaştığınız arkadaşlarınız hesap açıp ders çalıştıkça otomatik olarak burada yanınızda sıralanacaktır.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenShare();
                }}
                className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors inline-flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Linkini Gönder</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Tüm puanlar tamamlanan konuşma ve ders görevlerinden hesaplanır.</span>
        </div>
      </div>
    </div>
  );
};
