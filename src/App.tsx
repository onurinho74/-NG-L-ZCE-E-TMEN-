import React, { useState, useEffect } from 'react';
import { CURRICULUM } from './data/curriculum';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import {
  getActiveSession,
  logoutAccount,
  updateUserAccountProgress,
  updateUserDisplayName,
  StoredAccount,
} from './services/accountService';
import { Navbar } from './components/Navbar';
import { ClassroomView } from './components/ClassroomView';
import { CurriculumView } from './components/CurriculumView';
import { VocabularyVault } from './components/VocabularyVault';
import { ProgressReport } from './components/ProgressReport';
import { FreeCoachView } from './components/FreeCoachView';
import { AuthModal } from './components/AuthModal';
import { ShareModal } from './components/ShareModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { VisitorWelcomeBanner } from './components/VisitorWelcomeBanner';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { loadCloudProgress, saveCloudProgress } from './services/userService';
import heroImage from './assets/images/lingua_academy_hero_1790682247319.jpg';
import { Sparkles, ArrowRight, BookOpen, Compass, Award } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | StoredAccount | null>(() => {
    return getActiveSession();
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const active = getActiveSession();
    if (active && active.progress) {
      return active.progress;
    }
    return loadUserProgress();
  });

  const [activeTab, setActiveTab] = useState<'classroom' | 'curriculum' | 'vocabulary' | 'progress' | 'freechat'>('classroom');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  // Listen to Firebase Auth state if configured
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const cloudData = await loadCloudProgress(user.uid);
          if (cloudData) {
            const merged: UserProgress = {
              currentDay: Math.max(cloudData.currentDay, progress.currentDay),
              completedDays: Array.from(new Set([...cloudData.completedDays, ...progress.completedDays])),
              dayScores: { ...progress.dayScores, ...cloudData.dayScores },
              dayChallengesCompleted: { ...progress.dayChallengesCompleted, ...cloudData.dayChallengesCompleted },
              totalScore: Math.max(cloudData.totalScore, progress.totalScore),
              streakDays: Math.max(cloudData.streakDays, progress.streakDays),
              lastActiveDate: cloudData.lastActiveDate || progress.lastActiveDate,
              savedWords: Array.from(new Set([...cloudData.savedWords, ...progress.savedWords])),
              dailyNotes: { ...progress.dailyNotes, ...cloudData.dailyNotes },
              academyName: cloudData.academyName || progress.academyName || 'EnglishMaster AI',
            };
            setProgress(merged);
            saveUserProgress(merged);
          } else {
            await saveCloudProgress(user.uid, progress);
          }
        } catch (err) {
          console.error('Error syncing cloud progress:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save progress changes to storage, account and cloud
  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);

    if (currentUser) {
      if ('username' in currentUser) {
        // StoredAccount
        updateUserAccountProgress(currentUser.uid, updated);
      } else {
        // Firebase User
        saveCloudProgress(currentUser.uid, updated).catch((err) => {
          console.warn('Failed to sync progress to Firestore:', err);
        });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
    logoutAccount();
    setCurrentUser(null);
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      currentDay: 1,
      completedDays: [],
      dayScores: {},
      dayChallengesCompleted: {},
      totalScore: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      savedWords: [],
      dailyNotes: {},
      academyName: progress.academyName || 'EnglishMaster AI',
    };
    handleUpdateProgress(fresh);
  };

  const currentLesson =
    CURRICULUM.find((l) => l.day === progress.currentDay) || CURRICULUM[0];

  const handleSelectDay = (dayNum: number) => {
    const clamped = Math.max(1, Math.min(28, dayNum));
    handleUpdateProgress({
      ...progress,
      currentDay: clamped,
    });
    setActiveTab('classroom');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Strict Top Bar Contract with User Profile */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={progress.streakDays}
        totalScore={progress.totalScore}
        currentDay={progress.currentDay}
        academyName={progress.academyName || 'EnglishMaster AI'}
        onUpdateAcademyName={(newName) => {
          handleUpdateProgress({
            ...progress,
            academyName: newName,
          });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
        onUpdateDisplayName={(newName) => {
          if (currentUser && 'uid' in currentUser) {
            const updated = updateUserDisplayName(currentUser.uid, newName);
            if (updated) {
              setCurrentUser(updated as any);
              setProgress({
                ...progress,
                userName: newName,
              });
            }
          } else if (currentUser) {
            setCurrentUser(Object.assign({}, currentUser, { displayName: newName }) as any);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        {/* Welcome Banner for visitors / friends */}
        <VisitorWelcomeBanner
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenShare={() => setIsShareModalOpen(true)}
          onStartLesson={() => {
            handleSelectDay(1);
            setActiveTab('classroom');
          }}
          isLoggedIn={Boolean(currentUser)}
        />

        {activeTab === 'classroom' && (
          <ClassroomView
            lesson={currentLesson}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onGoToDay={handleSelectDay}
            onOpenCurriculum={() => setActiveTab('curriculum')}
            academyName={progress.academyName || 'EnglishMaster AI'}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumView
            progress={progress}
            onSelectDay={handleSelectDay}
            academyName={progress.academyName || 'EnglishMaster AI'}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyVault
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressReport
            progress={progress}
            onResetProgress={handleResetProgress}
            onGoToDay={handleSelectDay}
            academyName={progress.academyName || 'EnglishMaster AI'}
            studentDisplayName={currentUser?.displayName || currentUser?.email?.split('@')[0]}
            onOpenShare={() => setIsShareModalOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardModalOpen(true)}
          />
        )}

        {activeTab === 'freechat' && (
          <FreeCoachView
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            academyName={progress.academyName || 'EnglishMaster AI'}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(account) => {
          setCurrentUser(account);
          if (account.progress) {
            setProgress(account.progress);
            saveUserProgress(account.progress);
          }
        }}
        currentProgress={progress}
        academyName={progress.academyName || 'EnglishMaster AI'}
      />

      {/* Share with Friends Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userScore={progress.totalScore}
        userStreak={progress.streakDays}
        displayName={currentUser?.displayName || undefined}
      />

      {/* Community Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        onClose={() => setIsLeaderboardModalOpen(false)}
        currentUserProgress={progress}
        currentUserDisplayName={currentUser?.displayName || 'Siz'}
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Quiet, Human Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              {(progress.academyName || 'EnglishMaster AI').charAt(0).toUpperCase()}
            </span>
            <span className="font-bold text-slate-800 font-display">
              {progress.academyName || 'EnglishMaster AI'}
            </span>
            <span>· 4 Haftalık Yapılandırılmış İngilizce Müfredatı</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('curriculum')}
              className="hover:text-slate-900 transition-colors"
            >
              Müfredat
            </button>
            <button
              onClick={() => setActiveTab('vocabulary')}
              className="hover:text-slate-900 transition-colors"
            >
              Kelimeler ({CURRICULUM.length * 5})
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className="hover:text-slate-900 transition-colors"
            >
              Mezuniyet Sertifikası
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
