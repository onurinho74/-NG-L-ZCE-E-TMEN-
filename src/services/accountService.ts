import { UserAccount, UserProgress } from '../types';
import { loadUserProgress } from '../utils/storage';

export interface StoredAccount {
  uid: string;
  displayName: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  passwordHash: string; // Base64 encoded for simple client security
  createdAt: string;
  lastLoginAt: string;
  progress: UserProgress;
}

const STORAGE_KEY = 'englishmaster_registered_accounts';
const ACTIVE_USER_KEY = 'englishmaster_active_session';

// Helper to encode string
function simpleHash(str: string): string {
  try {
    return btoa(encodeURIComponent(str));
  } catch {
    return str;
  }
}

// Get all stored accounts
export function getAllAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading accounts:', e);
    return [];
  }
}

// Save all accounts
function saveAllAccounts(accounts: StoredAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Error saving accounts:', e);
  }
}

// Get currently active session
export function getActiveSession(): StoredAccount | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    // Refresh with latest account data
    const accounts = getAllAccounts();
    const found = accounts.find((a) => a.uid === session.uid);
    return found || session;
  } catch (e) {
    console.error('Error getting active session:', e);
    return null;
  }
}

// Set active session
export function setActiveSession(account: StoredAccount | null): void {
  if (typeof window === 'undefined') return;
  if (!account) {
    localStorage.removeItem(ACTIVE_USER_KEY);
  } else {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(account));
  }
}

export interface RegisterParams {
  displayName: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  initialProgress?: UserProgress;
}

/**
 * Register a new user account with Email or Phone + Username & Password
 */
export function registerAccount(params: RegisterParams): StoredAccount {
  const accounts = getAllAccounts();

  const cleanDisplayName = params.displayName.trim();
  const cleanEmail = params.email?.trim().toLowerCase();
  const cleanPhone = params.phoneNumber?.replace(/\D/g, '');
  const cleanUsername = (params.username || cleanEmail?.split('@')[0] || `user_${Date.now()}`)
    .trim()
    .toLowerCase();

  // Validate unicity
  if (cleanEmail && accounts.some((a) => a.email && a.email.toLowerCase() === cleanEmail)) {
    throw new Error('Bu e-posta adresiyle zaten kayıtlı bir hesap var. Lütfen giriş yapın.');
  }

  if (cleanPhone && cleanPhone.length >= 10 && accounts.some((a) => a.phoneNumber && a.phoneNumber.replace(/\D/g, '') === cleanPhone)) {
    throw new Error('Bu telefon numarasıyla zaten kayıtlı bir hesap var. Lütfen giriş yapın.');
  }

  if (accounts.some((a) => a.username && a.username.toLowerCase() === cleanUsername)) {
    throw new Error('Bu kullanıcı adı zaten alınmış. Lütfen farklı bir kullanıcı adı seçin.');
  }

  // Create default progress for new user or inherit current progress
  const baseProgress = params.initialProgress || loadUserProgress();
  const userProgress: UserProgress = {
    ...baseProgress,
    userName: cleanDisplayName,
    userEmail: cleanEmail,
    userPhone: params.phoneNumber,
  };

  const newAccount: StoredAccount = {
    uid: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    displayName: cleanDisplayName,
    username: cleanUsername,
    email: cleanEmail || undefined,
    phoneNumber: params.phoneNumber?.trim() || undefined,
    passwordHash: simpleHash(params.password),
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: userProgress,
  };

  accounts.push(newAccount);
  saveAllAccounts(accounts);
  setActiveSession(newAccount);

  return newAccount;
}

export interface GoogleAuthParams {
  displayName: string;
  email: string;
  uid: string;
  photoURL?: string;
  initialProgress?: UserProgress;
}

/**
 * Single-click login or registration via Google Account
 */
export function loginOrRegisterWithGoogle(params: GoogleAuthParams): StoredAccount {
  const accounts = getAllAccounts();
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanDisplayName = params.displayName.trim() || cleanEmail.split('@')[0];

  // Check if existing account with this email or UID
  const existing = accounts.find(
    (a) =>
      (a.email && a.email.toLowerCase() === cleanEmail) ||
      a.uid === params.uid
  );

  if (existing) {
    existing.lastLoginAt = new Date().toISOString();
    if (!existing.displayName || existing.displayName === 'Öğrenci') {
      existing.displayName = cleanDisplayName;
    }
    saveAllAccounts(accounts);
    setActiveSession(existing);
    return existing;
  }

  // Otherwise create a fresh account
  const baseProgress = params.initialProgress || loadUserProgress();
  const userProgress: UserProgress = {
    ...baseProgress,
    userName: cleanDisplayName,
    userEmail: cleanEmail,
  };

  const newAccount: StoredAccount = {
    uid: params.uid || `google_${Date.now()}`,
    displayName: cleanDisplayName,
    username: cleanEmail.split('@')[0],
    email: cleanEmail,
    passwordHash: simpleHash(`google_oauth_${params.uid || cleanEmail}`),
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: userProgress,
  };

  accounts.push(newAccount);
  saveAllAccounts(accounts);
  setActiveSession(newAccount);

  return newAccount;
}

export interface LoginParams {
  identifier: string; // email, phone, or username
  password: string;
}

/**
 * Login with username, email, or phone + password
 */
export function loginAccount(params: LoginParams): StoredAccount {
  const accounts = getAllAccounts();
  const input = params.identifier.trim().toLowerCase();
  const inputDigits = input.replace(/\D/g, '');
  const hashedInput = simpleHash(params.password);

  const matched = accounts.find((acc) => {
    // Check email
    if (acc.email && acc.email.toLowerCase() === input) return true;
    // Check username
    if (acc.username && acc.username.toLowerCase() === input) return true;
    // Check display name
    if (acc.displayName && acc.displayName.toLowerCase() === input) return true;
    // Check phone
    if (inputDigits.length >= 10 && acc.phoneNumber && acc.phoneNumber.replace(/\D/g, '') === inputDigits) return true;
    return false;
  });

  if (!matched) {
    throw new Error('Bu bilgilerle eşleşen bir kullanıcı hesabı bulunamadı. Lütfen kontrol edin veya yeni hesap açın.');
  }

  if (matched.passwordHash !== hashedInput) {
    throw new Error('Girdiğiniz şifre hatalı. Lütfen tekrar deneyiniz.');
  }

  // Update last login
  matched.lastLoginAt = new Date().toISOString();
  saveAllAccounts(accounts);
  setActiveSession(matched);

  return matched;
}

/**
 * Update progress for a specific user
 */
export function updateUserAccountProgress(uid: string, updatedProgress: UserProgress): void {
  const accounts = getAllAccounts();
  const index = accounts.findIndex((a) => a.uid === uid);
  if (index !== -1) {
    accounts[index].progress = {
      ...updatedProgress,
      userName: accounts[index].displayName,
      userEmail: accounts[index].email,
      userPhone: accounts[index].phoneNumber,
    };
    saveAllAccounts(accounts);
    setActiveSession(accounts[index]);
  }
}

/**
 * Log out
 */
export function logoutAccount(): void {
  setActiveSession(null);
}
