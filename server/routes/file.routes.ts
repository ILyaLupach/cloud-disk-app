import { Router, Request, Response } from 'express'
import authMiddleware from '../middleware/auth.middleware'
import fileController from '../controllers/file.controller'

const router = Router()

router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFiles)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchQuery)
router.delete('/remove', authMiddleware, fileController.removeFiles)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.delete('/avatar', authMiddleware, fileController.removeAvatar)

export default router
