import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Rutas públicas
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Rutas protegidas (solo admin)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  validateBody('product', 'create'),
  ProductController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  validateBody('product', 'update'),
  ProductController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  ProductController.deleteProduct
);

export default router;