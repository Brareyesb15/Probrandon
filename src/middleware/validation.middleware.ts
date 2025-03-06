import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../config/logger';
import { validateObject, validationSchemas } from '../utils/validation';

/**
 * Middleware para validar el cuerpo de la solicitud usando nuestros esquemas personalizados
 * @param entityType Tipo de entidad a validar (user, product, order)
 * @param operation Operación a validar (create, update, login)
 */
export const validateBody = (
  entityType: 'user' | 'product' | 'order',
  operation: 'create' | 'update' | 'login'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Obtener el esquema de validación
      const schema = validationSchemas[entityType][operation];
      
      if (!schema) {
        logger.error(`Esquema de validación no encontrado: ${entityType}.${operation}`);
        return res.status(500).json({ 
          success: false, 
          message: 'Error interno del servidor' 
        });
      }
      
      // Validar el cuerpo de la solicitud
      const errors = validateObject(req.body, schema);
      
      if (errors) {
        return res.status(400).json({ 
          success: false, 
          message: 'Error de validación', 
          errors 
        });
      }
      
      next();
    } catch (error) {
      logger.error('Error en validateBody:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error en la validación' 
      });
    }
  };
};
/**
 * Middleware para validar el cuerpo de la solicitud usando Zod
 * @param schema Esquema de validación Zod
 */
export const validateWithZod = (schema: z.ZodType<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        // Validar el cuerpo de la solicitud con Zod
        const result = schema.safeParse(req.body);
        
        if (!result.success) {
          const errors = result.error.errors.reduce((acc: Record<string, string>, error) => {
            const path = error.path.join('.');
            acc[path] = error.message;
            return acc;
          }, {});
          
          return res.status(400).json({ 
            success: false, 
            message: 'Error de validación', 
            errors 
          });
        }
        
        // Si la validación es exitosa, continuar
        next();
      } catch (error) {
        logger.error('Error en validateWithZod:', error);
        res.status(500).json({ 
          success: false, 
          message: 'Error en la validación' 
        });
      }
    };
  };