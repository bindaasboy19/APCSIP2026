import mongoose from 'mongoose'

const breakdownSchema = new mongoose.Schema(
  {
    key: String,
    label: String,
    points: Number,
  },
  { _id: false },
)

const chartPointSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
  },
  { _id: false },
)

const alertSchema = new mongoose.Schema(
  {
    severity: String,
    title: String,
    description: String,
  },
  { _id: false },
)

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    emailHash: {
      type: String,
      required: true,
      index: true,
    },
    profile: {
      numberOfBankAccounts: Number,
      simCount: Number,
      upiApps: Number,
      has2FA: Boolean,
      hasInactiveAccounts: Boolean,
      accountAgeDays: Number,
      avgTransactionsPerDay: Number,
    },
    risk: {
      score: Number,
      visualScore: Number,
      level: String,
      formula: String,
      breakdown: [breakdownSchema],
    },
    muleRisk: {
      score: Number,
      level: String,
      drivers: [String],
      rationale: String,
      probabilityPercentage: Number,
    },
    deviceRisk: {
      score: Number,
      flags: [String],
    },
    fraudCheck: {
      phoneFlag: Boolean,
      emailFlag: Boolean,
      upiFlag: Boolean,
    },
    transactionPattern: {
      patternDetected: Boolean,
      patternType: String,
      severity: String,
    },
    healthScore: Number,
    timeline90Days: [
      {
        day: Number,
        riskScore: Number,
        status: String,
      }
    ],
    alerts: [alertSchema],
    charts: {
      breakdown: [breakdownSchema],
      surfaceBreakdown: [chartPointSchema],
      muleSignals: [chartPointSchema],
    },
    telemetry: {
      digitalSurfaceIndex: Number,
      recoveryChannelStrength: String,
      inactiveExposureWindow: String,
    },
  },
  {
    timestamps: true,
  },
)

const IdentityAssessment =
  mongoose.models.IdentityAssessment || mongoose.model('IdentityAssessment', assessmentSchema)

export default IdentityAssessment
