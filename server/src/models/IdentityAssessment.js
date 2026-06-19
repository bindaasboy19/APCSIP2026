import mongoose from 'mongoose'

const breakdownSchema = new mongoose.Schema(
  {
    key: String,
    label: String,
    points: Number,
  },
  { _id: false },
)

const detectionSchema = new mongoose.Schema(
  {
    identityMisuseRisk: String,
    muleRisk: String,
    simSwapRisk: String,
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

const patternSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    severity: String,
    explanation: String,
  },
  { _id: false },
)

const insightSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
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

const recommendationSchema = new mongoose.Schema(
  {
    priority: String,
    title: String,
    description: String,
  },
  { _id: false },
)

const fraudFlowStepSchema = new mongoose.Schema(
  {
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
      has2FA: Boolean,
      hasInactiveAccounts: Boolean,
    },
    risk: {
      score: Number,
      visualScore: Number,
      level: String,
      formula: String,
      breakdown: [breakdownSchema],
    },
    detections: detectionSchema,
    patterns: [patternSchema],
    insights: [insightSchema],
    recommendations: [recommendationSchema],
    alerts: [alertSchema],
    fraudFlow: [fraudFlowStepSchema],
    charts: {
      breakdown: [chartPointSchema],
      signalSummary: [chartPointSchema],
    },
  },
  {
    timestamps: true,
  },
)

const IdentityAssessment =
  mongoose.models.IdentityAssessment || mongoose.model('IdentityAssessment', assessmentSchema)

export default IdentityAssessment
