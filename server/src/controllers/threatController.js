import { ATTACK_SCENARIOS } from '../constants/attackScenarios.js'

export async function getThreats(_req, res, next) {
  try {
    res.status(200).json({
      success: true,
      data: {
        scenarios: ATTACK_SCENARIOS,
      },
    })
  } catch (error) {
    next(error)
  }
}
