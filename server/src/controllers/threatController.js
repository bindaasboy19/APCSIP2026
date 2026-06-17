import { INTERACTIVE_SCENARIOS } from '../constants/interactiveScenarios.js'

export async function getThreats(_req, res, next) {
  try {
    res.status(200).json({
      success: true,
      data: {
        scenarios: INTERACTIVE_SCENARIOS,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function playThreatScenario(req, res, next) {
  try {
    const { scenarioId, choices = {} } = req.body

    const scenario = INTERACTIVE_SCENARIOS.find((item) => item.id === scenarioId)
    if (!scenario) {
      const error = new Error('Threat scenario not found.')
      error.status = 404
      throw error
    }

    // Convert choices object/array to lookup key e.g., "share_approve"
    const choiceKeys = []
    scenario.stages.forEach((_, index) => {
      choiceKeys.push(choices[String(index)] || choices[index] || '')
    })
    const lookupKey = choiceKeys.join('_')

    const outcome = scenario.outcomes[lookupKey] ?? scenario.outcomes['default']

    res.status(200).json({
      success: true,
      data: {
        scenarioId,
        choices,
        lookupKey,
        outcome,
      },
    })
  } catch (error) {
    next(error)
  }
}
