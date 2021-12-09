import { Schema, models, model } from 'mongoose'

interface IPost extends Document {
  description: string;
  image: string;
  comments?: string;
  user: string;
}

const postSchema = new Schema<IPost>(
  {
    description: {
      type: String,
      maxlength: [250, 'description cannot be grater than 250 characters'],
    },
    image: {
      type: String,
    },
    comments: {
      type: Map,
      of: {
        user: {
          type: String,
        },
        comment: {
          type: String,
        },
      },
      default: {},
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

export default models.Post || model<IPost>('Post', postSchema)