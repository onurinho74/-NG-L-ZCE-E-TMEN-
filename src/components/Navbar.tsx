import React, { useState } from 'react';
import {
  Flame,
  Award,
  BookOpen,
  Edit2,
  Check,
  X,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Trophy,
  Share2,
  Users,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'curriculum' | 'classroom' | 'vocabulary' | 'progress' | 'freechat';
  setActiveTab: (tab: 'curriculum' | 'classroom' | 'vocabulary' | 'progress' | 'freechat') => void;
  streakDays: number;
  totalScore: number;
  currentDay: number;
  academyName: string;
  onUpdateAcademyName: (newName: string) => void;
  currentUser?: any | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenShare?: () => void;
  onOpenLeaderboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakDays,
  totalScore,
  currentDay,
  academyName,
  onUpdateAcademyName,
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenShare,
  onOpenLeaderboard,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(academyName);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSaveName = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      onUpdateAcademyName(trimmed);
    }
    setIsEditingName(false);
  };

  const initialLetter = (academyName || 'L').charAt(0).toUpperCase();
  const userDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Öğrenci';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with edit affordance */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('classroom')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-indigo-700 transition-colors">
              {initialLetter}
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              {academyName}
            </span>
          </button>

          <button
            onClick={() => {
              setTempName(academyName);
              setIsEditingName(true);
            }}
            title="Akademi / Uygulama İsmini Değiştir"
            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`transition-colors hover:text-slate-900 pb-0.5 border-b-2 ${
              activeTab === 'classroom'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Gün {currentDay} Dersi
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`transition-colors hover:text-slate-900 pb-0.5 border-b-2 ${
              activeTab === 'curriculum'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            4 Haftalık Müfredat
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`transition-colors hover:text-slate-900 pb-0.5 border-b-2 ${
              activeTab === 'vocabulary'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Kelime Defteri
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`transition-colors hover:text-slate-900 pb-0.5 border-b-2 ${
              activeTab === 'progress'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            İlerleme & Sertifika
          </button>
          <button
            onClick={() => setActiveTab('freechat')}
            className={`transition-colors hover:text-slate-900 pb-0.5 border-b-2 ${
              activeTab === 'freechat'
                ? 'border-indigo-600 text-indigo-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Öğretmenle Sohbet
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Leaderboard button */}
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              title="Liderlik Tablosu ve Sıralama"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200/70 transition-colors shadow-2xs"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Sıralama</span>
            </button>
          )}

          {/* Share button */}
          {onOpenShare && (
            <button
              onClick={onOpenShare}
              title="Arkadaşını Davet Et / Bağlantıyı Paylaş"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/70 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">Davet Et</span>
            </button>
          )}

          {/* Streak indicator */}
          <div
            title={`${streakDays} gündür aralıksız pratik yapıyorsunuz`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
            <span className="font-mono tabular-nums">{streakDays}G</span>
          </div>

          {/* Total score button */}
          <button
            onClick={() => setActiveTab('progress')}
            title="Toplam Puanınız ve Başarılarınız"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold border border-indigo-200/70 transition-colors"
          >
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="font-mono tabular-nums">{totalScore.toLocaleString('tr-TR')} P</span>
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {userInitial}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                    {userDisplayName}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <Check className="w-2.5 h-2.5" />
                    <span>Öğrenci Profili</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{userDisplayName}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {currentUser.email || currentUser.phoneNumber || 'Kişiye Özel Hesap'}
                    </p>
                  </div>

                  <div className="px-4 py-2 border-b border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Kayıtlı Puan:</span>
                      <span className="font-mono font-bold text-indigo-600">{totalScore} Puan</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Gün Serisi:</span>
                      <span className="font-mono font-bold text-amber-600">{streakDays} Gün</span>
                    </div>
                  </div>

                  <div className="py-1 border-b border-slate-100 text-xs">
                    {onOpenLeaderboard && (
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onOpenLeaderboard();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium transition-colors"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        <span>Liderlik Sıralaması</span>
                      </button>
                    )}

                    {onOpenShare && (
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onOpenShare();
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium transition-colors"
                      >
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Arkadaşını Davet Et</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenAuth();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>Hesap Değiştir / Yeni Giriş</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onSignOut();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors mt-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Giriş / Kayıt</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-100 bg-slate-50 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('classroom')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'classroom' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : ''}`}
        >
          Gün {currentDay}
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'curriculum' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : ''}`}
        >
          Müfredat
        </button>
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'vocabulary' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : ''}`}
        >
          Kelimeler
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'progress' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : ''}`}
        >
          İlerleme
        </button>
        <button
          onClick={() => setActiveTab('freechat')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'freechat' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : ''}`}
        >
          Sohbet
        </button>
      </div>

      {/* Rename Academy Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-200 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Akademi İsmini Değiştir
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Uygulamanın ve sertifikanın üstünde görünecek özel adı belirleyin.
              </p>
            </div>

            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Örn: LinguaAcademy AI, EnglishMaster..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') setIsEditingName(false);
              }}
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSaveName}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
