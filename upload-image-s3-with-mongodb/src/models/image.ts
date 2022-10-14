import mongoose, { Schema, Document } from 'mongoose';

import { Image } from '../interfaces';

export interface ImageMongoose extends Document, Image {}

const schema = new Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const ImageModel = mongoose.model<ImageMongoose>('image', schema);
