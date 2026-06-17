import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'
import {
  generateOtp,
  hashEmail,
  isValidEmail,
  maskEmail,
  normalizeEmail,
} from '../utils/emailFingerprint.js'
import {
  findUserByEmailHash,
  markUserAuthenticated,
  upsertLoginChallengeForUser,
} from '../services/userStore.js'
import { sanitizePassword } from '../utils/validation.js'

function createError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

export async function login(req, res, next) {
  try {
    const email = normalizeEmail(req.body?.email)
    const password = sanitizePassword(req.body?.password)

    if (!isValidEmail(email)) {
      throw createError(400, 'Enter a valid email address.')
    }

    if (password.length < 8 || password.length > 72) {
      throw createError(400, 'Password must be between 8 and 72 characters.')
    }

    const emailHash = hashEmail(email)
    const existingUser = await findUserByEmailHash(emailHash)
    let passwordHash = existingUser?.passwordHash ?? ''
    let accountProvisioned = false

    if (!existingUser) {
      passwordHash = await bcrypt.hash(password, 12)
      accountProvisioned = true
    } else {
      const passwordMatches = await bcrypt.compare(password, existingUser.passwordHash)

      if (!passwordMatches) {
        throw createError(401, 'Email or password is incorrect.')
      }
    }

    const demoOtp = generateOtp()
    const otpHash = await bcrypt.hash(demoOtp, 10)
    const maskedEmail = existingUser?.maskedEmail ?? maskEmail(email)
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await upsertLoginChallengeForUser({
      emailHash,
      maskedEmail,
      passwordHash,
      otpHash,
      otpExpiresAt,
    })

    res.status(200).json({
      success: true,
      message: 'Credentials accepted. OTP generated successfully for the simulated login flow.',
      data: {
        maskedEmail,
        accountProvisioned,
        otpExpiresInSeconds: 300,
        demoOtp: env.nodeEnv === 'production' ? undefined : demoOtp,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const email = normalizeEmail(req.body?.email)
    const otp = String(req.body?.otp ?? '').trim()

    if (!isValidEmail(email)) {
      throw createError(400, 'Enter the same valid email address used to request the OTP.')
    }

    if (!/^\d{6}$/.test(otp)) {
      throw createError(400, 'OTP must be a 6-digit code.')
    }

    const emailHash = hashEmail(email)
    const user = await findUserByEmailHash(emailHash)

    if (!user || !user.otpHash) {
      throw createError(401, 'No active OTP request found for this email address.')
    }

    if (!user.otpExpiresAt || new Date(user.otpExpiresAt).getTime() < Date.now()) {
      throw createError(401, 'The OTP has expired. Request a fresh code and try again.')
    }

    const matches = await bcrypt.compare(otp, user.otpHash)

    if (!matches) {
      throw createError(401, 'The OTP entered is incorrect.')
    }

    const authenticatedUser = await markUserAuthenticated(user.id)

    if (!authenticatedUser) {
      throw createError(500, 'Unable to finalize authentication for this session.')
    }

    const token = jwt.sign(
      {
        sub: authenticatedUser.id,
        emailHash: authenticatedUser.emailHash,
        maskedEmail: authenticatedUser.maskedEmail,
      },
      env.jwtSecret,
      {
        expiresIn: '8h',
      },
    )

    res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: {
        token,
        expiresIn: '8h',
        user: {
          id: authenticatedUser.id,
          maskedEmail: authenticatedUser.maskedEmail,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}
