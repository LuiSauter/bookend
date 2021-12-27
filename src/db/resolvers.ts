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
      const { email } = args
      if (email) {
        return await Profile.findOne({ email })
      } else {
        return null
      }
    },
    findProfile: async (root: any, args: any) => {
      const { username } = args
      const isfindProfile = await Profile.findOne({ username: username })
      return isfindProfile
    },
    allUsers: async () => {
      return await Profile.find({})
    },
    allPosts: async () => {
      const findPost = await Post.find({})
      return findPost
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
        email: root.email,
        verified: root.verified,
      }
    },
  },
  Mutation: {
    signin: async (root: any, args: any) => {
      const { email, name, image } = args
      const userFind = await User.findOne({ email })
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
    updateProfile: async (root: any, args: any) => {
      const { profile } = args
      const findProfile = await Profile.findById(profile)
      if (findProfile) {
        const profileUpdated = await Profile.findByIdAndUpdate(
          profile,
          { ...args },
          {
            new: true,
          }
        )
        return profileUpdated
      } else {
        return null
      }
    },
    follow: async (root: any, args: any) => {
      const { email, user } = args
      const findUser = await Profile.findOne({ email })
      const filterUser = findUser.following.some(
        (userString: string) => userString === user
      )
      if (filterUser) return null
      const findYourUser = await Profile.findOne({ user })
      const filterYourUSer = findYourUser.followers.some(
        (userId: string) => userId === findUser.user
      )
      if (findUser) {
        const filter = { email }
        const update = { $push: { following: user } }
        await Profile.findOneAndUpdate(filter, update)
        await Profile.findOne({ email })
      }
      if (!filterYourUSer) {
        const filter = { user }
        const update = { $push: { followers: findUser.user } }
        await Profile.findOneAndUpdate(filter, update)
        return await Profile.findOne({ user })
      }
      return null
    },
    unFollow: async (root: any, args: any) => {
      const { email, user } = args
      const findUser = await Profile.findOne({ email })
      const findTheUser = await Profile.findOne({ user })
      const filterId = findUser.following.filter(
        (userId: string) => userId !== user
      )
      const filterTheUser = findTheUser.followers.filter(
        (userId: string) => userId === findTheUser.user
      )
      const filter = { email }
      const FindFilterTheUser = { user }

      const update = { following: filterId }
      const updateTheUser = { followers: filterTheUser }

      await Profile.findOneAndUpdate(filter, update, { new: true })
      await Profile.findOneAndUpdate(FindFilterTheUser, updateTheUser, {
        new: true,
      })
      return null
    },
    addPost: async (root: any, args: any) => {
      const { bookUrl, email } = args
      const userEmail = { email }
      const findUser = await Profile.findOne(userEmail)
      if (!findUser) return null
      const findBook = await Post.findOne({ bookUrl })
      if (!findBook) {
        const post = new Post({ ...args, user: findUser.user })
        const update = { $push: { post: post._id } }
        await Profile.findOneAndUpdate(userEmail, update)
        return post.save()
      } else {
        return null
      }
    },
    deletePost: async (root: any, args: any) => {
      const { id, user } = args
      const filter = { user }
      const findUser = await Profile.findOne(filter)
      if (findUser) {
        const postFitered = findUser.post.filter(
          (postId: string) => postId !== id
        )
        console.log(postFitered)
        const update = { post: postFitered }
        await Post.findByIdAndDelete(id)
        await Profile.findOneAndUpdate(filter, update, {
          new: true,
        })
        return ''
      }
      return null
    },
    deleteUser: async (root: any, args: any) => {
      const { user } = args
      await User.findByIdAndDelete(user)
      await Profile.findOneAndDelete({ user })
      // const findPost = Post.findByIdAndDelete(user)
      return 'delete successfully'
    },
  },
}

export default resolvers
