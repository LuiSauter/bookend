import { Schema, models, model } from 'mongoose'

interface IPost extends Document {
  title: string
  description?: string[]
  image: string
  bookUrl: string
  tags?: string[]
  comments?: string
  user: string
  likes?: string[]
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
    tags: [String],
    user: {
      type: String,
      required: true,
    },
    likes: [String]
  },
  { timestamps: true, versionKey: false }
)

export default models.Post || model<IPost>('Post', postSchema)