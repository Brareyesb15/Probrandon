import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/helpers';
import { User } from '../models/user.model';
import { logger } from '../config/logger';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware para proteger rutas que requieren autenticación
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Obtener el token del header de autorización
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        success: false, 
        message: 'Acceso no autorizado. Token no proporcionado' 
      });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar el token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
      return;
    }
    
    // Buscar el usuario en la base de datos
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(401).json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
      return;
    }
    
    // Adjuntar el usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    logger.error('Error en authMiddleware:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en la autenticación' 
    });
  }
};

/**
 * Middleware para verificar roles de usuario
 * @param roles Roles permitidos
 */
export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Acceso no autorizado' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'No tienes permiso para acceder a este recurso' 
      });
    }
    
    next();
  };
};