import User from './models/user'
import Profile from './models/profile'
import Post from './models/post'
import jwt from 'jsonwebtoken'
import config from 'src/config/config'
import { UserInputError } from 'apollo-server-micro'
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
    findProfile: async (root: any, args: any) => {
      const { username } = args
      const isfindProfile =  await Profile.findOne({ username: username })
      return isfindProfile
    },
    allPosts: async () => {
      return await Post.find({})
    },
    findPost: async (root: any, args: any) => {
      const { id } = args
      return await Post.findById(id)
    },
  },
  Profile: {
    me: (root: any) => {
      return {
        name: root.name,
        username: root.username,
        photo: root.photo,
        user: root.user,
      }
    }
  },
  Mutation: {
    signin: async (root: any, args: any) => {
      const { email, name, image } = args
      const userFind = await User.findOne({ email, name })
      if (!userFind) {
        const user = new User({ email, name })
        await user.save()
        const userName = email.split('@')[0] + name.length
        const profile = new Profile({
          user: user._id,
          photo: image,
          name: name,
          email: email,
          username: userName,
        })
        await profile.save()
        const newUser = {
          email: user.email,
          name: user.name,
          profile: profile._id,
        }
        const updateUser = await User.findByIdAndUpdate(user._id, newUser, {
          new: true,
        })
        updateUser.message = 'signup'
        return updateUser
      } else {
        const token = createToken(userFind)
        userFind.message = token
        return userFind
      }
    },
    createProfile: async (root: any, args: any) => {
      const { username, profile } = args
      const findProfile = await Profile.findOne({ profile })
      console.log(findProfile, 'findprofile', username, profile)
      if (findProfile) {
        // const NewProfile = {

        // }
        const profileUpdated = await Profile.findOneAndUpdate(
          profile,
          { ...args },
          {
            new: true,
          }
        )
        console.log(profileUpdated)
        return profileUpdated
      } else {
        return null
      }
    },
    addPost: (root: any, args: any) => {
      const post = new Post({ ...args })
      return post.save()
    },
  },
}

export default resolvers
