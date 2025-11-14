import mongoose, { Schema } from 'mongoose';
import { IQuestion, IQuiz } from '../types';

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [(arr: string[]) => arr.length >= 2, 'Must have at least 2 options']
  },
  correctAnswer: {
    type: Number,
    required: true
  }
});

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    trim: true
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: [(arr: IQuestion[]) => arr.length > 0, 'Must have at least one question']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 minute']
  },
  passingScore: {
    type: Number,
    default: 60,
    min: [0, 'Passing score cannot be negative'],
    max: [100, 'Passing score cannot exceed 100']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IQuiz>('Quiz', quizSchema);
