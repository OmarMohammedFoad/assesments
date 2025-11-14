import { NextFunction, Request, Response } from "express";
import Announcement from "../models/Announcement";
import { ApiResponse, IAnnouncement } from "../types";

export const getAllAnnouncements = async (req: Request, res: Response<ApiResponse<IAnnouncement[]>>, next: NextFunction) => {
  try {
    const announcements = await Announcement.find();
    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements
    })
  } catch (error) {
    next(error)
  }
}


export const getAnnouncement = async (req: Request, res: Response<ApiResponse<IAnnouncement>>, next: NextFunction) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    next(error)
  }
}



export const createAnnouncement = async (
  req: Request,
  res: Response<ApiResponse<IAnnouncement>>,
  next: NextFunction
): Promise<void> => {
  try {
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};




export const updateAnnouncement = async (
  req: Request,
  res: Response<ApiResponse<IAnnouncement>>,
  next: NextFunction
): Promise<void> => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!announcement) {
      res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    next(error);
  }
};




export const deleteAnnouncement = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
