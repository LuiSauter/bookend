import Vibrant from 'node-vibrant'
import escapeStringRegexp from 'escape-string-regexp'

import User from './models/user'
import Profile from './models/profile'
import Post from './models/post'
import config from 'src/config/config'


interface User {
  username: string
  name: string
  photo: string
  id: string
}

const getDominantColor = async (image: string) => {
  const palette = await Vibrant.from(image).getPalette()
  return palette
}

const resolvers = {
  Query: {
    userCount: () => User.collection.countDocuments(),
    postCount: () => Post.collection.countDocuments(),
    findUser: async (_root: undefined, args: { email: string }) => {
      const { email } = args
      try {
        return await Profile.findOne({ email })
      } catch (error) {
        return null
      }
    },
    findUserById: async (_root: undefined, args: { user: string }) => {
      try {
        return await Profile.findOne({ user: args.user })
      } catch (error) {
        return null
      }
    },
    findProfile: async (_root: undefined, args: { username: string }) => {
      const isfindProfile = await Profile.findOne({ username: args.username })
      if (isfindProfile) {
        return isfindProfile
      } else {
        return null
      }
    },
    searchUsers: async (_root: undefined, args: { name: string }) => {
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
    searchBooks: async (_root: undefined, args: any) => {
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
    searchBooksAuthor: async (_root: undefined, args: any) => {
      const { words } = args
      if (words) {
        const search = escapeStringRegexp(words)
        return await Post.find({
          author: { $regex: '.*' + search + '.*', $options: 'i' },
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
      _root: undefined,
      args: { pageSize: number; skipValue: number }
    ) => {
      const { pageSize, skipValue } = args
      return await Post.find({})
        .sort({ createdAt: 'desc' })
        .limit(pageSize)
        .skip(skipValue)
    },
    allPostRanking: async (
      _root: undefined,
      args: { pageSize: number; skipValue: number }
    ) => {
      const { pageSize, skipValue } = args
      return await Post.find({})
        .sort({ likesCount: -1, updatedAt: 'desc' })
        .limit(pageSize)
        .skip(skipValue)
    },
    allPostsByUsername: async (
      _root: undefined,
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
    allPostUserCount: async (_root: undefined, args: { username: string }) => {
      const { username } = args
      const userId = await Profile.findOne({ username })
      if (userId) {
        return await Post.find({ user: userId.user }).countDocuments()
      }
    },
    findPost: async (_root: any, args: any) => {
      try {
        return await Post.find({ _id: args.id })
      } catch (error) {
        return null
      }
    },
    getColors: async (_root: any, args: { image: string }) => {
      const { image } = args
      if (image) {
        const data = await getDominantColor(image)
        const newArray = Object.entries(data)
        const currentArray: any[] = []
        newArray.map((data) => {
          const population = data[1]?.population
          return currentArray.push(population)
        })
        const maxPopulation = Math.max(...currentArray)
        let dominantColor
        newArray.map((max) => {
          if (max[1]?.population === maxPopulation) {
            dominantColor = max[1]?.rgb.join()
            return dominantColor
          }
        })
        return dominantColor ? dominantColor : null
      }
    },
  },
  Profile: {
    me: (_root: any) => {
      return {
        name: _root.name,
        username: _root.username,
        photo: _root.photo,
        user: _root.user,
        email: _root.email,
        verified: _root.verified,
      }
    },
  },
  Mutation: {
    signin: async (
      _root: undefined,
      args: { email: string; name: string; image: string }
    ) => {
      const { email, name, image } = args
      const userFind = await User.findOne({ email })
      if (userFind === null) {
        try {
          const createUser = new User({ email, name })
          await createUser.save()
          const userName = email.split('@')[0] + name.length
          const profile = new Profile({
            user: createUser._id,
            photo: image,
            name: name,
            email: email,
            username: userName,
          })
          await profile.save()
          const newUser = {
            profile: profile._id,
          }
          await User.findByIdAndUpdate(createUser._id, newUser, { new: true })
          return 'signup'
        } catch (error: any) {
          console.log(error.message)
          return null
        }
      } else {
        return 'signin'
      }
    },
    updateProfile: async (_root: undefined, args: any) => {
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
    follow: async (_root: undefined, args: { email: string; user: any }) => {
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
      _root: undefined,
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
    likePost: async (_root: undefined, args: { email: string; id: any }) => {
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
    disLikePost: async (_root: undefined, args: { email: string; id: any }) => {
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
    addPost: async (_root: undefined, args: any) => {
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
    deletePost: async (
      _root: undefined,
      args: { id: string; user: string }
    ) => {
      const { id, user } = args
      const filter = { user }
      const findUser = await Profile.findOne(filter)
      if (findUser) {
        const postFiltered = findUser.post.filter(
          (postId: string) => postId !== id
        )
        const update = { post: postFiltered }
        await Post.findByIdAndDelete(id)
        await Profile.findOneAndUpdate(filter, update, {
          new: true,
        })
        return 'delete successfully'
      }
      return null
    },
    deleteUser: async (_root: undefined, args: { user: string }) => {
      const { user } = args
      await User.findByIdAndDelete(user)
      await Profile.findOneAndDelete({ user })
      return 'delete successfully'
    },
    giveVerification: async (
      _root: undefined,
      args: { user: string; verification: any; wordSecret: string }
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
