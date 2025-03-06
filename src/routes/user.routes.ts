import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Rutas públicas
router.post('/register', validateBody('user', 'create'), UserController.register);
router.post('/login', validateBody('user', 'login'), UserController.login);

// Rutas protegidas
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, validateBody('user', 'update'), UserController.updateProfile);
router.put('/change-password', authMiddleware, UserController.changePassword);

export default router;