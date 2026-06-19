import { getPersistenceMode } from '../config/db.js'
import { findLatestAssessment } from '../services/assessmentStore.js'

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

export async function getRisk(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        assessmentId: assessment.id,
        profile: assessment.profile,
        risk: assessment.risk,
        detections: assessment.detections,
        alerts: assessment.alerts,
        fraudFlow: assessment.fraudFlow,
        charts: assessment.charts,
        submittedAt: assessment.createdAt,
        persistenceMode: getPersistenceMode(),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getPatterns(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        patterns: assessment.patterns,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getInsights(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        insights: assessment.insights,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getRecommendations(req, res, next) {
  try {
    const assessment = await requireAssessment(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        recommendations: assessment.recommendations,
      },
    })
  } catch (error) {
    next(error)
  }
}
