import { Schema, model, Document, models } from 'mongoose'
// import bcrypt from 'bcrypt'

interface IUser extends Document {
  email: string;
  name?: string;
  profile?: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    profile: {
      type: String,
      unique: [true, 'profile already exist'],
    },
  },
  { timestamps: true, versionKey: false }
)

// userSchema.pre('save', async function (next): Promise<void> {
//   const salt = await bcrypt.genSalt(10)
//   const hash = await bcrypt.hash(this.password, salt)
//   this.password = hash
//   next()
// })

// userSchema.methods.comparePassword = async function (password: string) {
//   return await bcrypt.compare(password, this.password)
// }

export default models.User || model<IUser>('User', userSchema)
