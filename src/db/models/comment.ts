import { Schema, models, model } from 'mongoose'

interface ICommnet extends Document {
  text: string;
  user: string;
}

const commnetSchema = new Schema<ICommnet>(
  {
    text: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

export default models.Post || model<ICommnet>('Post', commnetSchema)