import NextAut from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import config from 'src/config/config'

export default NextAut({
  providers: [
    GoogleProvider({
      clientId: config.clientGoogle,
      clientSecret: config.clientGoogleSecret,
    }),
    GithubProvider({
      clientId: config.clientGitHub,
      clientSecret: config.clientGitHubSecret,
    }),
  ],
})