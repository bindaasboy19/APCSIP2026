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
    alerts: record.alerts,
    charts: record.charts,
    telemetry: record.telemetry,
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
    alerts: assessment.alerts,
    charts: assessment.charts,
    telemetry: assessment.telemetry,
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
