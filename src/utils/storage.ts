import { UserProgress } from '../types';

const STORAGE_KEY = 'lingua_academy_ai_progress_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadUserProgress(): UserProgress {
  const defaultProgress: UserProgress = {
    currentDay: 1,
    completedDays: [],
    dayScores: {},
    dayChallengesCompleted: {},
    totalScore: 0,
    streakDays: 1,
    lastActiveDate: getTodayDateString(),
    savedWords: [],
    dailyNotes: {},
    academyName: 'EnglishMaster AI',
  };

  if (typeof window === 'undefined') return defaultProgress;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);

    // If academyName was previous default LinguaAcademy AI or undefined, upgrade to EnglishMaster AI
    const effectiveName =
      !parsed.academyName || parsed.academyName === 'LinguaAcademy AI'
        ? 'EnglishMaster AI'
        : parsed.academyName;

    // Calculate streak
    const today = getTodayDateString();
    const lastActive = parsed.lastActiveDate || today;

    // Check if consecutive
    let streak = parsed.streakDays || 1;
    if (lastActive !== today) {
      const last = new Date(lastActive).getTime();
      const curr = new Date(today).getTime();
      const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    return {
      ...defaultProgress,
      ...parsed,
      academyName: effectiveName,
      streakDays: streak,
      lastActiveDate: today,
    };
  } catch (e) {
    console.error('Failed to parse progress from storage:', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to storage:', e);
  }
}
