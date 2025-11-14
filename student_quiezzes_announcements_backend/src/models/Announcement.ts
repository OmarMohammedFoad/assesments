import mongoose, { Schema } from 'mongoose';
import { IAnnouncement } from '../types';

const announcementSchema = new Schema<IAnnouncement>({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IAnnouncement>('Announcement', announcementSchema);
