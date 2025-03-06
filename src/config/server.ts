import { Application } from 'express';
import { logger } from './logger';

export const configureServer = (app: Application): void => {
  // Configuración de seguridad
  app.disable('x-powered-by');
  
  // Configuración de límites
  app.set('trust proxy', 1);
  
  logger.info('Configuración del servidor aplicada');
};