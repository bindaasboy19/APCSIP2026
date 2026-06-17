import { getPersistenceMode } from '../config/db.js'
import { findLatestAssessment } from '../services/assessmentStore.js'
import { buildRecommendations } from '../utils/recommendationEngine.js'

function createError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

async function requireAssessment(userId) {
  const assessment = await findLatestAssessment(userId)

  if (!assessment) {
    throw createError(404, 'No assessment found. Submit identity inputs first.')
  }

  return assessment
}

export async function getRiskScore(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        assessment,
        persistenceMode: getPersistenceMode(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getMuleRisk(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        muleRisk: assessment.muleRisk,
        persistenceMode: getPersistenceMode(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getDeviceRisk(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        deviceRisk: assessment.deviceRisk,
        persistenceMode: getPersistenceMode(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getRecommendations(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)
    const recommendations = buildRecommendations(assessment)

    res.status(200).json({
      success: true,
      data: {
        recommendations,
        riskLevel: assessment.risk.level,
        muleRiskLevel: assessment.muleRisk.level,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getFraudCheck(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        fraudCheck: assessment.fraudCheck,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getTransactionPattern(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        transactionPattern: assessment.transactionPattern,
      },
    })
  } catch (error) {
    next(error)
  }
}
