import crypto from 'node:crypto'

import User from '../models/User.js'
import { isMongoReady } from '../config/db.js'

const memoryUsersById = new Map()
const memoryUsersByEmailHash = new Map()

function toUserShape(record) {
  if (!record) {
    return null
  }

  return {
    id: String(record._id ?? record.id),
    emailHash: record.emailHash,
    maskedEmail: record.maskedEmail,
    passwordHash: record.passwordHash,
    otpHash: record.otpHash,
    otpExpiresAt: record.otpExpiresAt,
    lastOtpIssuedAt: record.lastOtpIssuedAt,
    lastLoginAt: record.lastLoginAt,
  }
}

export async function findUserByEmailHash(emailHash) {
  if (isMongoReady()) {
    const user = await User.findOne({ emailHash }).lean()
    return toUserShape(user)
  }

  return toUserShape(memoryUsersByEmailHash.get(emailHash))
}

export async function findUserById(id) {
  if (isMongoReady()) {
    const user = await User.findById(id).lean()
    return toUserShape(user)
  }

  return toUserShape(memoryUsersById.get(String(id)))
}

export async function upsertLoginChallengeForUser({
  emailHash,
  maskedEmail,
  passwordHash,
  otpHash,
  otpExpiresAt,
}) {
  if (isMongoReady()) {
    const user = await User.findOneAndUpdate(
      { emailHash },
      {
        emailHash,
        maskedEmail,
        passwordHash,
        otpHash,
        otpExpiresAt,
        lastOtpIssuedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).lean()

    return toUserShape(user)
  }

  const existing = memoryUsersByEmailHash.get(emailHash)
  const nextUser = {
    id: existing?.id ?? crypto.randomUUID(),
    emailHash,
    maskedEmail,
    passwordHash: passwordHash ?? existing?.passwordHash ?? '',
    otpHash,
    otpExpiresAt,
    lastOtpIssuedAt: new Date(),
    lastLoginAt: existing?.lastLoginAt ?? null,
  }

  memoryUsersById.set(nextUser.id, nextUser)
  memoryUsersByEmailHash.set(emailHash, nextUser)

  return toUserShape(nextUser)
}

export async function markUserAuthenticated(userId) {
  const now = new Date()

  if (isMongoReady()) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        lastLoginAt: now,
        otpHash: '',
        otpExpiresAt: null,
      },
      {
        new: true,
      },
    ).lean()

    return toUserShape(user)
  }

  const user = memoryUsersById.get(String(userId))

  if (!user) {
    return null
  }

  user.lastLoginAt = now
  user.otpHash = ''
  user.otpExpiresAt = null
  memoryUsersById.set(user.id, user)
  memoryUsersByEmailHash.set(user.emailHash, user)

  return toUserShape(user)
}
