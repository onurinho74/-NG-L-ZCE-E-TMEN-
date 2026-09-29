import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProgress } from '../types';

export interface UserProfileData {
  uid: string;
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  createdAt: string;
}

/**
 * Save or update user profile document in Firestore
 */
export async function saveUserProfile(profile: UserProfileData): Promise<void> {
  const path = `users/${profile.uid}`;
  try {
    const ref = doc(db, 'users', profile.uid);
    await setDoc(ref, profile, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Fetch user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfileData | null> {
  const path = `users/${uid}`;
  try {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfileData;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

/**
 * Save user progress to Firestore
 */
export async function saveCloudProgress(uid: string, progress: UserProgress): Promise<void> {
  const path = `users/${uid}/progress/current`;
  try {
    const ref = doc(db, 'users', uid, 'progress', 'current');
    // Ensure payload conforms to schema
    const payload = {
      userId: uid,
      currentDay: Number(progress.currentDay) || 1,
      completedDays: progress.completedDays || [],
      dayScores: progress.dayScores || {},
      dayChallengesCompleted: progress.dayChallengesCompleted || {},
      totalScore: Number(progress.totalScore) || 0,
      streakDays: Number(progress.streakDays) || 1,
      lastActiveDate: progress.lastActiveDate || new Date().toISOString().split('T')[0],
      savedWords: progress.savedWords || [],
      dailyNotes: progress.dailyNotes || {},
      academyName: progress.academyName || 'EnglishMaster AI',
      updatedAt: new Date().toISOString(),
    };
    await setDoc(ref, payload, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Load user progress from Firestore
 */
export async function loadCloudProgress(uid: string): Promise<UserProgress | null> {
  const path = `users/${uid}/progress/current`;
  try {
    const ref = doc(db, 'users', uid, 'progress', 'current');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        currentDay: data.currentDay ?? 1,
        completedDays: data.completedDays ?? [],
        dayScores: data.dayScores ?? {},
        dayChallengesCompleted: data.dayChallengesCompleted ?? {},
        totalScore: data.totalScore ?? 0,
        streakDays: data.streakDays ?? 1,
        lastActiveDate: data.lastActiveDate ?? new Date().toISOString().split('T')[0],
        savedWords: data.savedWords ?? [],
        dailyNotes: data.dailyNotes ?? {},
        academyName: data.academyName ?? 'EnglishMaster AI',
      };
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}
