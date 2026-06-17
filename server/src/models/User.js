import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    emailHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    maskedEmail: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
      default: '',
    },
    otpExpiresAt: {
      type: Date,
    },
    lastOtpIssuedAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
