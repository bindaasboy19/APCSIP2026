import { Router } from 'express'
import { submitIdentity } from '../controllers/identityController.js'
import { getInsights, getPatterns, getRecommendations, getRisk } from '../controllers/insightController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate)

router.post('/input', submitIdentity)
router.get('/risk', getRisk)
router.get('/patterns', getPatterns)
router.get('/insights', getInsights)
router.get('/recommendations', getRecommendations)

export default router
