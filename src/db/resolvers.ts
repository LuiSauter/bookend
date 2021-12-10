import User from './models/user'
import Profile from './models/profile'
import Post from './models/post'
import jwt from 'jsonwebtoken'
import config from 'src/config/config'
interface IUser {
  email: string;
  password: string;
  _id?: string;
  __v?: number;
}
interface User {
  username: string;
  name: string;
  photo: string;
  id: string;
}

function createToken(user: IUser) {
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400,
  })
}

const resolvers = {
  Query: {
    userCount: () => User.collection.countDocuments(),
    findUser: async (root: any, args: any) => {
      const { username } = args
      return await Profile.findOne({ username: username })
    },
    allPosts: async () => {
      return await Post.find({})
    },
    findPost: async (root: any, args: any) => {
      const { id } = args
      return await Post.findById(id)
    },
  },
  Mutation: {
    signup: async (root: any, args: any) => {
      const { email, password, confirm_password } = args
      if (password !== confirm_password) return null
      if (password.lenght < 8) return null
      const emailFind = await User.findOne({ email })
      if (emailFind) return null
      const user = new User({ email, password })
      user.save()
      return {
        message: 'signup successfully!',
      }
    },
    signin: async (root: any, args: any) => {
      const { email, password } = args
      const userFind = await User.findOne({ email })
      if (!userFind) return null
      const isMatch = await userFind.comparePassword(password)
      if (!isMatch) return null
      const token = createToken(userFind)
      return { token }
    },
    addPost: (root: any, args: any) => {
      const post = new Post({ ...args })
      return post.save()
    },
  },
  // Profile: {
  //   User: (root: User) => {
  //     return {
  //       username: root.username,
  //       name: root.name,
  //       photo: root.photo,
  //       id: root.id,
  //     }
  //   },
  // },
}

export default resolvers
