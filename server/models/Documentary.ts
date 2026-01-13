import mongoose, { Schema, Document } from 'mongoose';

export interface IDocumentary extends Document {
  tripId: mongoose.Types.ObjectId;
  title: string;
  duration: string;
  status: 'processing' | 'ready';
  versions: {
    full: string;
    social: string;
    highlight: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const DocumentarySchema: Schema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'ready'],
      default: 'processing',
    },
    versions: {
      full: String,
      social: String,
      highlight: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Documentary = mongoose.model<IDocumentary>('Documentary', DocumentarySchema);
