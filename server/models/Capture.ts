import mongoose, { Schema, Document } from 'mongoose';

export interface ICapture extends Document {
  tripId: mongoose.Types.ObjectId;
  type: 'video' | 'photo' | 'audio';
  url: string;
  timestamp: Date;
  location?: {
    lat: number;
    lng: number;
  };
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const CaptureSchema: Schema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    type: {
      type: String,
      enum: ['video', 'photo', 'audio'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export const Capture = mongoose.model<ICapture>('Capture', CaptureSchema);
