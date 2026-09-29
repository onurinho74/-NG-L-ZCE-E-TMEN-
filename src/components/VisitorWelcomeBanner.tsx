import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserPlus, Share2, X } from 'lucide-react';

interface VisitorWelcomeBannerProps {
  onOpenAuth: () => void;
  onOpenShare: () => void;
  onStartLesson: () => void;
  isLoggedIn: boolean;
}

export const VisitorWelcomeBanner: React.FC<VisitorWelcomeBannerProps> = ({
  onOpenAuth,
  onOpenShare,
  onStartLesson,
  isLoggedIn,
}) => {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dismissed_welcome_banner') === 'true';
    }
    return false;
  });

  if (dismissed || isLoggedIn) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dismissed_welcome_banner', 'true');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-indigo-700/50 mb-6 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left side text */}
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950">
                Yeni Başlayanlar İçin
              </span>
              <span className="text-xs text-indigo-200 font-medium">
                4 Haftalık İnteraktif İngilizce Programı
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-display text-white">
              EnglishMaster AI'a Hoş Geldiniz! 🚀
            </h2>
            <p className="text-xs text-indigo-100/90 mt-1 leading-relaxed">
              Günde sadece 15 dakika ayırarak 28 günde konuşma özgüveninizi kazanın. Ücretsiz profilinizi oluşturarak konuşma puanlarınızı, günlük serinizi ve resmi mezuniyet sertifikanızı adınıza kaydedin.
            </p>
          </div>
        </div>

        {/* Right side action buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4 text-indigo-600" />
            <span>Kişisel Profil Oluştur</span>
          </button>

          <button
            type="button"
            onClick={onStartLesson}
            className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
          >
            <span>Dersleri İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            title="Arkadaşlarınla Paylaş"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors shrink-0"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            title="Kapat"
            className="p-2 rounded-lg text-indigo-300 hover:text-white transition-colors shrink-0 md:ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
