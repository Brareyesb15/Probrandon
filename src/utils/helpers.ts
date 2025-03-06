import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

/**
 * Genera un token JWT para un usuario
 * @param user Usuario para el que se generará el token
 * @returns Token JWT
 */
export const generateToken = (user: IUser): string => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  const options = { expiresIn: '24h' };

  return jwt.sign(payload, secret, options);
};

/**
 * Verifica un token JWT
 * @param token Token JWT a verificar
 * @returns Payload decodificado o null si es inválido
 */
export const verifyToken = (token: string): any | null => {
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

/**
 * Formatea un error para la respuesta API
 * @param error Error a formatear
 * @returns Objeto de error formateado
 */
export const formatError = (error: any): { message: string; stack?: string } => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    message: error.message || 'Error interno del servidor',
    ...(isDev && { stack: error.stack })
  };
};

/**
 * Calcula el precio total de una lista de productos
 * @param items Lista de items con precio y cantidad
 * @returns Precio total
 */
export const calculateTotalPrice = (
  items: Array<{ price: number; quantity: number }>
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Pagina una lista de resultados
 * @param array Array a paginar
 * @param page Número de página
 * @param limit Límite de elementos por página
 * @returns Elementos paginados
 */
export const paginateResults = <T>(
  array: T[],
  page: number = 1,
  limit: number = 10
): { data: T[]; total: number; page: number; totalPages: number } => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    total: array.length,
    page,
    totalPages: Math.ceil(array.length / limit)
  };
};