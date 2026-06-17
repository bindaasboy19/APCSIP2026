import { Router } from 'express'
import { submitIdentity } from '../controllers/identityController.js'
import { getDeviceRisk, getMuleRisk, getRiskScore } from '../controllers/insightController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate)

router.post('/input', submitIdentity)
router.get('/risk', getRiskScore)
router.get('/mule-risk', getMuleRisk)
router.get('/device-risk', getDeviceRisk)

export default router
