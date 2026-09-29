import React, { useState } from 'react';
import {
  Flame,
  Award,
  LogOut,
  ChevronDown,
  Trophy,
  Share2,
  Check,
  User as UserIcon,
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
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenShare,
  onOpenLeaderboard,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const initialLetter = (academyName || 'E').charAt(0).toUpperCase();
  const userDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Öğrenci';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('classroom')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
              {initialLetter}
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
              {academyName}
            </span>
          </button>
        </div>

        {/* Clean, Focused Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'classroom'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gün {currentDay} Dersi
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'curriculum'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Müfredat
          </button>
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'vocabulary'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kelimeler
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'progress'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Karnem & Sertifika
          </button>
          <button
            onClick={() => setActiveTab('freechat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'freechat'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Öğretmenle Sohbet
          </button>
        </nav>

        {/* Right Actions: Clean, Minimalist */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator */}
          <div
            title={`${streakDays} gündür aralıksız pratik yapıyorsunuz`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/60"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{streakDays} Gün</span>
          </div>

          {/* Points indicator */}
          <button
            onClick={() => setActiveTab('progress')}
            title="Toplam Puanınız"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold border border-indigo-100 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>{totalScore.toLocaleString('tr-TR')} P</span>
          </button>

          {/* Quick Trophy Modal */}
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              title="Liderlik Sıralaması"
              className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-colors"
            >
              <Trophy className="w-4 h-4" />
            </button>
          )}

          {/* Quick Share Modal */}
          {onOpenShare && (
            <button
              onClick={onOpenShare}
              title="Arkadaşını Davet Et"
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 py-1 pl-1.5 pr-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {userInitial}
                </div>
                <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[90px] truncate">
                  {userDisplayName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{userDisplayName}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {currentUser.email || currentUser.phoneNumber || 'Kişisel Hesap'}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setActiveTab('progress');
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg font-medium flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Karnem & Sertifikam</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Giriş Yap</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto bg-slate-50">
        <button
          onClick={() => setActiveTab('classroom')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
            activeTab === 'classroom'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600'
          }`}
        >
          Ders {currentDay}
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
            activeTab === 'curriculum'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600'
          }`}
        >
          Müfredat
        </button>
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
            activeTab === 'vocabulary'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600'
          }`}
        >
          Kelimeler
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${
            activeTab === 'progress'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600'
          }`}
        >
          Karnem
        </button>
      </div>
    </header>
  );
};
