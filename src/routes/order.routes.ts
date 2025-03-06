import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas para usuarios normales
router.post('/', validateBody('order', 'create'), OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.get('/:id', OrderController.getOrderById);

// Rutas solo para admin
router.put(
  '/:id/status',
  roleMiddleware(['admin']),
  validateBody('order', 'update'),
  OrderController.updateOrderStatus
);

router.put(
  '/:id/payment',
  roleMiddleware(['admin']),
  validateBody('order', 'update'),
  OrderController.updatePaymentStatus
);

export default router;