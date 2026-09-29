import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  QrCode,
  Flame,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  userScore?: number;
  userStreak?: number;
  displayName?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  userScore = 0,
  userStreak = 1,
  displayName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use the active working URL
  const shareUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://ais-dev-t6mttgpfyfznivitj3we2c-86565647298.europe-west2.run.app';

  const shareText = displayName
    ? `Selam! 🚀 ${displayName} olarak EnglishMaster AI ile 28 günlük İngilizce serüvenine başladım. Şu an ${userStreak} günlük serim ve ${userScore} puanım var! Gel beraber çalışıp İngilizce konuşma pratiği yapalım: ${shareUrl}`
    : `Selam! 🚀 4 haftada akıcı İngilizce konuşmayı hedefleyen yapay zeka destekli EnglishMaster AI platformunu keşfettim. Birlikte pratik yapıp puanlarımızı yarıştıralım: ${shareUrl}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EnglishMaster AI - 4 Haftalık İngilizce Öğrenme',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    '4 haftalık interaktif İngilizce konuşma platformu! Gel birlikte öğrenelim:'
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/30 text-indigo-200 border border-white/10">
              <Users className="w-4 h-4 text-indigo-200" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Arkadaşlarınla Birlikte Öğren
            </span>
          </div>

          <h3 className="text-xl font-bold font-display">
            Arkadaşlarını Davet Et
          </h3>
          <p className="text-xs text-indigo-200/90 mt-1 leading-relaxed">
            Arkadaşlarınızı davet edin; hem İngilizce konuşma özgüvenini beraber kazanın hem de günlük puanlarınızı karşılaştırın!
          </p>

          {displayName && (
            <div className="mt-4 p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-400 text-indigo-950 flex items-center justify-center font-bold text-[10px]">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-white truncate max-w-[150px]">{displayName}</span>
              </div>
              <div className="flex items-center gap-3 font-mono font-bold text-indigo-200 text-[11px]">
                <span className="flex items-center gap-1 text-amber-300">
                  <Flame className="w-3.5 h-3.5 fill-amber-300" />
                  {userStreak}G Seri
                </span>
                <span>{userScore} Puan</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Quick share buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-2xs group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>WhatsApp'ta Paylaş</span>
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-2xs group"
            >
              <Send className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
              <span>Telegram'da Paylaş</span>
            </a>
          </div>

          {/* Copy link box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Site Bağlantı Linki
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-slate-50">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-600 focus:outline-none select-all truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Native Web Share button (Great on Mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>Diğer Uygulamalarla Paylaş</span>
            </button>
          )}

          {/* Why learn together callout */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Birlikte öğrenme avantajı:</strong> Arkadaşlarınızla birlikte her gün 1 ders tamamlayarak birbirinizin günlük serilerini (streak) takip edebilir ve karşılıklı konuşma pratikleri yapabilirsiniz.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
