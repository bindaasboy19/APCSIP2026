import { Router } from 'express'
import { getThreats } from '../controllers/threatController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.use(authenticate)

router.get('/', getThreats)

export default router
