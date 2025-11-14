import { Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface IQuiz extends Document {
  title: string;
  description?: string;
  questions: IQuestion[];
  duration: number;
  passingScore: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}
