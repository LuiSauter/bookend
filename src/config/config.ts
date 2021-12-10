export default {
  MONGO_DATABASE: process.env.MONGODB_URI || '',
  MONGO_DATABASE_TEST: process.env.MONGODB_URI_TEST || '',
  jwtSecret: process.env.JWT_SECRET || 'tokentest',
  connectionURI: process.env.CONNECTION_URI || '',
  clientGoogle: process.env.GOOGLE_CLIENT || '',
  clientGoogleSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  clientGitHub: process.env.GITHUB_CLIENT || '',
  clientGitHubSecret: process.env.GITHUB_CLIENT_SECRET || '',
}