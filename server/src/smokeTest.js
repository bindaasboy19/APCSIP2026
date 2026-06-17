import { login, verifyOtp } from './controllers/authController.js'
import { connectDatabase } from './config/db.js'
import { submitIdentity } from './controllers/identityController.js'
import { getMuleRisk, getRecommendations, getRiskScore } from './controllers/insightController.js'
import { getThreats } from './controllers/threatController.js'
import { authenticate } from './middleware/authMiddleware.js'

function createMockResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

async function invoke(handler, requestState = {}) {
  const req = {
    body: requestState.body ?? {},
    headers: requestState.headers ?? {},
    query: requestState.query ?? {},
    user: requestState.user ?? null,
  }
  const res = createMockResponse()

  let capturedError = null

  await handler(req, res, (error) => {
    if (error) {
      capturedError = error
    }
  })

  if (capturedError) {
    throw capturedError
  }

  return {
    req,
    res,
    status: res.statusCode,
    body: res.body,
  }
}

async function runSmokeTest() {
  await connectDatabase()

  const loginResult = await invoke(login, {
    body: {
      email: 'demo.user@example.com',
      password: 'HackathonDemo@123',
    },
  })

  const verifyResult = await invoke(verifyOtp, {
    body: {
      email: 'demo.user@example.com',
      otp: loginResult.body.data.demoOtp,
    },
  })

  const authResult = await invoke(authenticate, {
    headers: {
      authorization: `Bearer ${verifyResult.body.data.token}`,
    },
  })

  const identityResult = await invoke(submitIdentity, {
    user: authResult.req.user,
    body: {
      numberOfBankAccounts: 4,
      simCount: 2,
      upiApps: 3,
      has2FA: false,
      hasInactiveAccounts: true,
      accountAgeDays: 365,
      avgTransactionsPerDay: 2,
    },
  })

  const riskResult = await invoke(getRiskScore, {
    user: authResult.req.user,
  })

  const muleRiskResult = await invoke(getMuleRisk, {
    user: authResult.req.user,
  })

  const recommendationResult = await invoke(getRecommendations, {
    user: authResult.req.user,
  })

  const threatResult = await invoke(getThreats)

  const summary = {
    loginStatus: loginResult.status,
    verifyStatus: verifyResult.status,
    submitIdentityStatus: identityResult.status,
    riskStatus: riskResult.status,
    muleRiskStatus: muleRiskResult.status,
    recommendationsStatus: recommendationResult.status,
    threatStatus: threatResult.status,
    riskScore: riskResult.body.data.assessment.risk.score,
    riskLevel: riskResult.body.data.assessment.risk.level,
    muleRiskLevel: muleRiskResult.body.data.muleRisk.level,
    recommendationCount: recommendationResult.body.data.recommendations.length,
    topScenario: threatResult.body.data.scenarios[0].title,
    submittedAssessmentId: identityResult.body.data.assessment.id,
  }

  console.log(JSON.stringify(summary, null, 2))
}

runSmokeTest().catch((error) => {
  console.error(error)
  process.exit(1)
})
