import { NextFunction, Request, Response } from 'express';
import Quiz from '../models/Quiz';
import { ApiResponse, IQuiz } from '../types';


export const getAllQuizzes = async (
  req: Request,
  res: Response<ApiResponse<IQuiz[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizzes = await Quiz.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    next(error);
  }
};


export const getQuiz = async (
  req: Request,
  res: Response<ApiResponse<IQuiz>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (
  req: Request,
  res: Response<ApiResponse<IQuiz>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response<ApiResponse<IQuiz>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!quiz) {
      res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
