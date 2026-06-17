import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import insightRoutes from './routes/insightRoutes.js'
import threatRoutes from './routes/threatRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.clientOrigin,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Aadhaar-based digital identity misuse and mule risk API is healthy.',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/threats', threatRoutes)
app.use('/api', insightRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
