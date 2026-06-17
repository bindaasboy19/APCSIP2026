import { Router } from 'express'
import { getFraudCheck, getRecommendations, getTransactionPattern } from '../controllers/insightController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate)

router.get('/recommendations', getRecommendations)
router.get('/fraud-check', getFraudCheck)
router.get('/transactions/pattern', getTransactionPattern)

export default router
