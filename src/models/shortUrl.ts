import { Schema, Model, model, models } from 'mongoose';

interface IShortUrl {
  originalUrl: string;
  shortKey: string;
  createdAt: Date;
  updatedAt: Date;
}

const shortUrlSchema = new Schema<IShortUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ShortUrl: Model<IShortUrl> =
  models.ShortUrl ?? model('ShortUrl', shortUrlSchema);

export default ShortUrl;
