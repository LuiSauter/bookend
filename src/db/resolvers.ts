import User from './models/user'
import Profile from './models/profile'
import Post from './models/post'
import config from 'src/config/config'

import jwt from 'jsonwebtoken'
import escapeStringRegexp from 'escape-string-regexp'

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
    postCount: () => Post.collection.countDocuments(),
    findUser: async (root: undefined, args: { email: string }) => {
      const { email } = args
      if (email) {
        return await Profile.findOne({ email })
      } else {
        return null
      }
    },
    findUserById: async (root: undefined, args: { user: string }) => {
      const { user } = args
      return await Profile.findOne({ user })
    },
    findProfile: async (root: undefined, args: { username: string }) => {
      const { username } = args
      const isfindProfile = await Profile.findOne({ username: username })
      return isfindProfile
    },
    searchUsers: async (root: undefined, args: { name: string }) => {
      const { name } = args
      if (name) {
        const search = escapeStringRegexp(name)
        const result = await Profile.find({
          name: { $regex: '.*' + search + '.*', $options: 'i' },
          function(err: any, response: any) {
            if (err) console.error(err)
            return response
          },
        })
        if (result.length === 0) {
          return await Profile.find({
            username: { $regex: '.*' + search + '.*', $options: 'i' },
            function(err: any, response: any) {
              if (err) console.error(err)
              return response
            },
          })
        }
        return result
      }
    },
    searchBooks: async (root: undefined, args: any) => {
      const { words } = args
      if (words) {
        const search = escapeStringRegexp(words)
        return await Post.find({
          title: { $regex: '.*' + search + '.*', $options: 'i' },
          function(err: any, response: any) {
            if (err) console.error(err)
            return response
          },
        })
      }
    },
    allUsers: async () => {
      return await Profile.find({}).sort({ createdAt: 'desc' })
    },
    allPosts: async (
      root: undefined,
      args: { pageSize: number; skipValue: number }
    ) => {
      const { pageSize, skipValue } = args
      return await Post.find({})
        .sort({ createdAt: 'desc' })
        .limit(pageSize)
        .skip(skipValue)
    },
    allPostRanking: async (
      root: undefined,
      args: { pageSize: number; skipValue: number }
    ) => {
      const { pageSize, skipValue } = args
      return await Post.find({})
        .sort({ likesCount: -1, updatedAt: 'desc' })
        .limit(pageSize)
        .skip(skipValue)
    },
    allPostsByUsername: async (
      root: undefined,
      args: { pageSize: number; skipValue: number; username: string }
    ) => {
      const { pageSize, skipValue, username } = args
      const userId = await Profile.findOne({ username })
      if (userId) {
        const findPost = await Post.find({ user: userId.user })
          .sort({ createdAt: 'desc' })
          .limit(pageSize)
          .skip(skipValue)
        return findPost
      }
    },
    allPostUserCount: async (root: undefined, args: { username: string }) => {
      const { username } = args
      const userId = await Profile.findOne({ username })
      if (userId) {
        return await Post.find({ user: userId.user }).countDocuments()
      }
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
    signin: async (
      root: undefined,
      args: { email: string; name: string; image: string }
    ) => {
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
    updateProfile: async (root: undefined, args: any) => {
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
    follow: async (root: undefined, args: { email: string; user: any }) => {
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
        // await Profile.findOne({ email })
      }
      if (!filterYourUSer) {
        const filter = { user }
        const update = { $push: { followers: findUser.user } }
        await Profile.findOneAndUpdate(filter, update)
        // await Profile.findOne({ user })
        return 'Follow'
      }
      return null
    },
    unFollow: async (
      root: undefined,
      args: { email: string; user: string }
    ) => {
      const { email, user } = args
      const findUser = await Profile.findOne({ email })
      const findTheUser = await Profile.findOne({ user })
      const filterId = findUser.following.filter(
        (userId: string) => userId !== user
      )
      const filterTheUser = findTheUser.followers.filter(
        (userId: string) => userId !== findUser.user
      )
      const filter = { email }
      const FindFilterTheUser = { user }

      const update = { following: filterId }
      const updateTheUser = { followers: filterTheUser }

      await Profile.findOneAndUpdate(filter, update, { new: true })
      await Profile.findOneAndUpdate(FindFilterTheUser, updateTheUser, {
        new: true,
      })
      return 'unFollow'
    },
    likePost: async (root: undefined, args: { email: string; id: any }) => {
      const { email, id } = args
      const findUser = await Profile.findOne({ email })

      const findPost = await Post.findOne({ _id: id })
      const isLiked = findPost.likes.some(
        (userId: string) => userId === findUser.user
      )

      if (findUser) {
        const filter = { email }
        const update = { $push: { liked: id } }
        await Profile.findOneAndUpdate(filter, update)
      }
      if (!isLiked) {
        const filter = { _id: id }
        const update = {
          $push: { likes: findUser.user },
          $set: { likesCount: findPost.likes.length + 1 },
        }
        await Post.findOneAndUpdate(filter, update)
        return 'Like'
      }
      return null
    },
    disLikePost: async (root: undefined, args: { email: string; id: any }) => {
      const { email, id } = args
      const findUser = await Profile.findOne({ email })
      const filterUser = findUser.liked.some(
        (userString: string) => userString === id
      )
      if (filterUser) {
        const filterUser = { email }
        const newlikes = findUser.liked.filter(
          (postId: string) => postId !== id
        )
        await Profile.findOneAndUpdate(
          filterUser,
          { liked: newlikes },
          { new: true }
        )
        const findPost = await Post.findOne({ _id: id })
        const filterPost = { _id: id }
        const newlikesUser = findPost.likes.filter(
          (userId: string) => userId !== findUser.user
        )
        await Post.findOneAndUpdate(
          filterPost,
          { likes: newlikesUser, likesCount: newlikesUser.length },
          { new: true }
        )
        return 'dislike'
      }
    },
    addPost: async (root: undefined, args: any) => {
      const { bookUrl, email } = args
      const userEmail = { email }
      const findUser = await Profile.findOne(userEmail)
      if (!findUser) return null
      const findBook = await Post.findOne({ bookUrl })
      if (!findBook) {
        const post = new Post({ ...args, user: findUser.user })
        const update = { $push: { post: post._id } }
        await Profile.findOneAndUpdate(userEmail, update)
        await post.save()
        return 'new Post'
      } else {
        await Post.findOneAndUpdate({ bookUrl }, args)
        return 'update Post'
      }
    },
    deletePost: async (root: undefined, args: { id: string; user: string }) => {
      const { id, user } = args
      const filter = { user }
      const findUser = await Profile.findOne(filter)
      if (findUser) {
        const postFitered = findUser.post.filter(
          (postId: string) => postId !== id
        )
        const update = { post: postFitered }
        await Post.findByIdAndDelete(id)
        await Profile.findOneAndUpdate(filter, update, {
          new: true,
        })
        return 'delete successfully'
      }
      return null
    },
    deleteUser: async (root: undefined, args: { user: string }) => {
      const { user } = args
      await User.findByIdAndDelete(user)
      await Profile.findOneAndDelete({ user })
      return 'delete successfully'
    },
    giveVerification: async (
      root: undefined,
      args: { user: string; verification: any, wordSecret: string }
    ) => {
      const { user, verification, wordSecret } = args
      if (wordSecret === config.wtfThisIsASecretWord && verification) {
        const filter = { user: user }
        const update = { verified: verification }
        await Profile.findOneAndUpdate(filter, update, { new: true })
        return 'Verified successfully'
      }
    },
  },
}

export default resolvers
