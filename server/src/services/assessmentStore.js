import crypto from 'node:crypto'

import IdentityAssessment from '../models/IdentityAssessment.js'
import { isMongoReady } from '../config/db.js'

const memoryAssessmentsByUserId = new Map()

function toAssessmentShape(record) {
  if (!record) {
    return null
  }

  const createdAt = record.createdAt ? new Date(record.createdAt).toISOString() : new Date().toISOString()
  const updatedAt = record.updatedAt ? new Date(record.updatedAt).toISOString() : createdAt

  return {
    id: String(record._id ?? record.id),
    profile: record.profile,
    risk: record.risk,
    muleRisk: record.muleRisk,
    deviceRisk: record.deviceRisk,
    fraudCheck: record.fraudCheck,
    transactionPattern: record.transactionPattern,
    healthScore: record.healthScore,
    timeline90Days: record.timeline90Days ?? [],
    telemetry: record.telemetry,
    detections: record.detections ?? {
      identityMisuseRisk: record?.risk?.level ?? 'Low',
      muleRisk: 'Low',
      simSwapRisk: 'Low',
    },
    patterns: record.patterns ?? [],
    insights: record.insights ?? [],
    recommendations: record.recommendations ?? [],
    alerts: record.alerts ?? [],
    fraudFlow: record.fraudFlow ?? [],
    charts: record.charts ?? {
      breakdown: [],
      signalSummary: [],
    },
    createdAt,
    updatedAt,
  }
}

export async function saveAssessment({ userId, emailHash, assessment }) {
  const payload = {
    userId,
    emailHash,
    profile: assessment.profile,
    risk: assessment.risk,
    muleRisk: assessment.muleRisk,
    deviceRisk: assessment.deviceRisk,
    fraudCheck: assessment.fraudCheck,
    transactionPattern: assessment.transactionPattern,
    healthScore: assessment.healthScore,
    timeline90Days: assessment.timeline90Days,
    telemetry: assessment.telemetry,
    detections: assessment.detections,
    patterns: assessment.patterns,
    insights: assessment.insights,
    recommendations: assessment.recommendations,
    alerts: assessment.alerts,
    fraudFlow: assessment.fraudFlow,
    charts: assessment.charts,
  }

  if (isMongoReady()) {
    const created = await IdentityAssessment.create(payload)
    return toAssessmentShape(created.toObject())
  }

  const nextAssessment = {
    id: crypto.randomUUID(),
    ...payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const assessments = memoryAssessmentsByUserId.get(String(userId)) ?? []
  assessments.push(nextAssessment)
  memoryAssessmentsByUserId.set(String(userId), assessments)

  return toAssessmentShape(nextAssessment)
}

export async function findLatestAssessment(userId) {
  if (isMongoReady()) {
    const assessment = await IdentityAssessment.findOne({ userId }).sort({ createdAt: -1 }).lean()
    return toAssessmentShape(assessment)
  }

  const assessments = memoryAssessmentsByUserId.get(String(userId)) ?? []
  return toAssessmentShape(assessments.at(-1))
}
