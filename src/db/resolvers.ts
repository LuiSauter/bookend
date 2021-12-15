import User from './models/user'
import Profile from './models/profile'
import Post from './models/post'
import jwt from 'jsonwebtoken'
import config from 'src/config/config'
interface IUser {
  email: string;
  name: string;
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
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret)
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
    signin: async (root: any, args: any) => {
      const { email, name } = args
      const userFind = await User.findOne({ email, name })
      if (!userFind) {
        const user = new User({ email, name })
        user.save()
        user.message = 'signup'
        return user
      } else {
        const token = createToken(userFind)
        return { message: token }
      }
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
