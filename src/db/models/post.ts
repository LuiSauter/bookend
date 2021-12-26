import { Schema, models, model } from 'mongoose'

interface IPost extends Document {
  title: string;
  description?: string[];
  image: string;
  bookUrl: string;
  comments?: string;
  user: string;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: [String],
    image: {
      type: String,
    },
    bookUrl: {
      type: String,
      required: true,
    },
    comments: [String],
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

export default models.Post || model<IPost>('Post', postSchema)