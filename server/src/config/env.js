import dotenv from 'dotenv'

dotenv.config({ override: true })

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.parseInt(process.env.PORT ?? '5001', 10),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET ?? 'demo-jwt-secret-change-me',
  mongoUri: process.env.MONGODB_URI ?? '',
}
