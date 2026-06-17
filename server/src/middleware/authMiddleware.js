import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'
import { findUserById } from '../services/userStore.js'

export async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization ?? ''

    if (!authorization.startsWith('Bearer ')) {
      const error = new Error('Authentication required. Provide a valid bearer token.')
      error.status = 401
      throw error
    }

    const token = authorization.slice('Bearer '.length)
    const payload = jwt.verify(token, env.jwtSecret)
    const user = await findUserById(payload.sub)

    if (!user) {
      const error = new Error('Session is no longer valid. Please sign in again.')
      error.status = 401
      throw error
    }

    req.user = {
      id: user.id,
      emailHash: user.emailHash,
      maskedEmail: user.maskedEmail,
    }

    next()
  } catch (error) {
    if (!error.status) {
      error.status = 401
      error.message = 'Your session token is invalid or expired.'
    }

    next(error)
  }
}
