

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  ROUTINE = 'ROUTINE',
  NOTES = 'NOTES',
  CHATBOT = 'CHATBOT',
  ANALYTICS = 'ANALYTICS',
  COURSES = 'COURSES',
  PROFILE = 'PROFILE'
}

export interface UserProfile {
  name: string;
  email: string;
  classLevel: string;
  college: string;
  profilePicture?: string;
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
}

export interface Exam {
  id: string;
  title: string;
  type: 'HSC' | 'Medical' | 'BUET' | 'Subject Wise';
  subject: string;
  questions: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiresFileUpload?: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RoutineItem {
  timeSlot: string;
  activity: string;
  type: 'study' | 'break' | 'college' | 'sleep';
  focusTopic?: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  content: string; // Markdown or text
  date: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
  attachment?: {
    name: string;
    type: string;
    data?: string; // base64 preview
  };
}

export interface StudyStat {
  subject: string;
  hours: number;
  accuracy: number; // Percentage
}