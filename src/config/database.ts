import mongoose from 'mongoose';
import { logger } from './logger';
import process from "node:process";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/backend-test';
    await mongoose.connect(mongoURI);
    logger.info('Conexión a MongoDB establecida');
  } catch (error) {
    logger.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};