import mongoose from 'mongoose'

import { env } from './env.js'

let persistenceMode = 'memory'

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn('[db] MONGODB_URI not set. Using in-memory persistence for demo mode.')
    return persistenceMode
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })

    persistenceMode = 'mongo'
    console.log('[db] Connected to MongoDB.')
  } catch (error) {
    persistenceMode = 'memory'
    console.warn(`[db] MongoDB unavailable. Falling back to in-memory persistence. ${error.message}`)
  }

  return persistenceMode
}

export function getPersistenceMode() {
  return persistenceMode
}

export function isMongoReady() {
  return persistenceMode === 'mongo' && mongoose.connection.readyState === 1
}
