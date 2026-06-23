import dotenv from 'dotenv'

dotenv.config({ override: true })

function parseCorsOrigins(value) {
  if (!value) return 'http://localhost:5175'
  if (value.includes(',')) {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return value.trim()
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.parseInt(process.env.PORT ?? '5001', 10),
  clientOrigin: parseCorsOrigins(process.env.CLIENT_ORIGIN ?? 'http://localhost:5175'),
  jwtSecret: process.env.JWT_SECRET ?? 'demo-jwt-secret-change-me',
  mongoUri: process.env.MONGODB_URI ?? '',
  host: process.env.HOST ?? '0.0.0.0',
  allowedOrigin: parseCorsOrigins(process.env.CLIENT_ORIGIN ?? 'http://localhost:5175'),
}
