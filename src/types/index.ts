export interface TargetWord {
  word: string;
  phonetic: string;
  turkish: string;
  exampleEn: string;
  exampleTr: string;
}

export interface InteractiveChallenge {
  id: string;
  type: 'warmup' | 'vocab' | 'pattern' | 'dialogue' | 'rapid';
  instructionTr: string;
  promptEn: string;
  expectedConcept: string;
  hintTr?: string;
}

export interface DayLesson {
  day: number;
  week: number;
  titleTr: string;
  titleEn: string;
  category: string;
  level: 'Başlangıç (A1-A2)' | 'Orta (B1-B2)' | 'İleri (B2-C1)';
  objective: string;
  expectedPattern: string;
  patternExplanation: string;
  patternExamples: { en: string; tr: string }[];
  targetWords: TargetWord[];
  initialPrompt: string;
  initialPromptTr: string;
  challenges: InteractiveChallenge[];
  estimatedMinutes: number;
}

export interface TeacherEvaluationResult {
  is_correct: boolean;
  score_earned: number;
  feedback_message: string;
  next_prompt: string;
}

export interface MessageTurn {
  id: string;
  sender: 'user' | 'teacher';
  text: string;
  timestamp: number;
  evaluation?: TeacherEvaluationResult;
  challengeId?: string;
  isAudioPlaying?: boolean;
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  dayScores: Record<number, number>; // day -> highest score
  dayChallengesCompleted: Record<number, string[]>; // day -> array of challenge ids
  totalScore: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  savedWords: string[]; // starred words
  dailyNotes: Record<number, string>;
  academyName?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

export interface UserAccount {
  uid: string;
  displayName: string;
  email?: string;
  phoneNumber?: string;
  provider: 'firebase-google' | 'firebase-email' | 'local';
  createdAt: string;
}
