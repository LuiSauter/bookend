import { Schema, model, Document, models } from 'mongoose'

interface IProfile extends Document {
  verified?: boolean;
  user: string;
  username: string;
  name: string;
  description?: string;
  photo?: string;
  gender?: string;
  website?: string;
  location?: string;
  followers?: string[];
  following?: string[];
  liked?: string[];
  email?: string;
  post?: string[];
}

const profileSchema = new Schema<IProfile>(
  {
    verified: { type: Boolean, default: false },
    user: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'username is required'],
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    followers: [String],
    following: [String],
    liked: [String],
    post: [String],
  },
  { timestamps: true, versionKey: false }
)

export default models.Profile || model<IProfile>('Profile', profileSchema)
