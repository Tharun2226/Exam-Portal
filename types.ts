
export type ExamType = 'PTE' | 'IELTS' | 'CELPIP' | 'DUOLINGO';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface QuestionType {
  id: string;
  title: string;
  category: string;
  icon: string;
  exam: ExamType;
}

export interface PracticeQuestion {
  id: string;
  type: string;
  content: string;
  instructions: string;
}

export interface EvaluationResult {
  score: number;
  grammar: number;
  vocabulary: number;
  fluency?: number;
  feedback: string;
  pronunciation?: string;
  breakdown: {
    content: number;
    grammar: number;
    coherence: number;
  };
}

export enum AppRoute {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  PTE_PRACTICE = 'pte-practice',
  IELTS_PRACTICE = 'ielts-practice',
  QUESTION_PRACTICE = 'question-practice',
  AUTH = 'auth'
}
