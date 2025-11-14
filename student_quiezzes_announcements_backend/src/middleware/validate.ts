import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const announcementSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  isActive: Joi.boolean()
});

const quizSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string(),
  questions: Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(2).required(),
      correctAnswer: Joi.number().required()
    })
  ).min(1).required(),
  duration: Joi.number().min(1).required(),
  passingScore: Joi.number().min(0).max(100),
  isActive: Joi.boolean()
});

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0].message
      });
      return;
    }

    next();
  };
};

export const validateAnnouncement = validate(announcementSchema);
export const validateQuiz = validate(quizSchema);
