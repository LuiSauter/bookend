import { Schema, model, Document, models } from 'mongoose'

interface IProfile extends Document {
  verified?: boolean;
  user: string;
  username: string;
  accountType?: string;
  name: string;
  description?: string;
  photo?: string;
  gender?: string;
  website?: string;
  location?: string;
  followers?: string[];
  following?: string[];
  liked?: string[];
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
      minlength: [5, 'username cannot be greater than 5 characters'],
      required: [true, 'username is required'],
    },
    accountType: {
      type: String,
      enum: ['normal', 'creator'],
      default: 'normal',
    },
    name: {
      type: String,
      maxlength: [30, 'name cannot be grater than 30 characters'],
      minlength: [5, 'name cannot be greater than 5 characters'],
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'description cannot be grater than 200 characters'],
    },
    photo: {
      type: String,
      default:
        'https://raw.githubusercontent.com/LuiSauter/bookend/main/public/default-user.webp',
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
    followers: [String],
    following: [String],
    liked: [String],
  },
  { timestamps: true, versionKey: false }
)

export default models.Profile || model<IProfile>('Profile', profileSchema)
