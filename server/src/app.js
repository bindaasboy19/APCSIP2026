import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import threatRoutes from './routes/threatRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(helmet())
const allowedOrigins = (env.clientOrigin || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true)
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Digital Identity Fraud Intelligence & Risk Analyzer API is healthy.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/threats', threatRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
