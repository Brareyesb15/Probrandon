import express, { Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/database';
import { logger } from './config/logger';
import { errorMiddleware } from './middleware/error.middleware';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

// Cargar variables de entorno
config();

// Inicializar la aplicación Express
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

// Iniciar el servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;