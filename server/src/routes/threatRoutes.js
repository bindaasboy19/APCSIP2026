import { Router } from 'express'
import { getThreats, playThreatScenario } from '../controllers/threatController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate)

router.get('/', getThreats)
router.post('/play', playThreatScenario)

export default router
