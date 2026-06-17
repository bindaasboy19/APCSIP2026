import { saveAssessment } from '../services/assessmentStore.js'
import { buildAlerts } from '../utils/alertEngine.js'
import { calculateRiskAssessment } from '../utils/riskEngine.js'
import { validateIdentityPayload } from '../utils/validation.js'

export async function submitIdentity(req, res, next) {
  try {
    const validationErrors = validateIdentityPayload(req.body)

    if (validationErrors.length > 0) {
      const error = new Error(validationErrors.join(' '))
      error.status = 400
      throw error
    }

    const computedAssessment = calculateRiskAssessment(req.body)
    const alerts = buildAlerts(computedAssessment)

    const assessment = await saveAssessment({
      userId: req.user.id,
      emailHash: req.user.emailHash,
      assessment: {
        ...computedAssessment,
        alerts,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Identity footprint submitted and analyzed successfully.',
      data: {
        assessment,
      },
    })
  } catch (error) {
    next(error)
  }
}
