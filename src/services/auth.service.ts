import { User, IUser } from '../models/user.model';
import { generateToken } from '../utils/helpers';
import { logger } from '../config/logger';
import { validateDataType } from '../utils/validation';

export class AuthService {
  /**
   * Registra un nuevo usuario
   * @param userData Datos del usuario a registrar
   * @returns Usuario registrado y token
   */
  static async register(userData: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<{ user: Partial<IUser>; token: string }> {
    try {
      // Validar datos de entrada
      if (!validateDataType(userData.email, 'email')) {
        throw new Error('Email inválido');
      }
      
      if (!validateDataType(userData.password, 'password')) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      }
      
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { username: userData.username }]
      });
      
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }
      
      // Crear el nuevo usuario
      const user = await User.create(userData);
      
      // Generar token
      const token = generateToken(user);
      
      // Excluir la contraseña de la respuesta
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      return { user: userResponse, token };
    } catch (error) {
      logger.error('Error en AuthService.register:', error);
      throw error;
    }
  }
  
  /**
   * Inicia sesión de un usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Usuario autenticado y token
   */
  static async login(email: string, password: string): Promise<{ user: Partial<IUser>; token: string }> {
    try {
      // Buscar el usuario por email
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('Credenciales inválidas');
      }
      
      // Verificar la contraseña
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
      }
      
      // Generar token
      const token = generateToken(user);
      
      // Excluir la contraseña de la respuesta
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      return { user: userResponse, token };
    } catch (error) {
      logger.error('Error en AuthService.login:', error);
      throw error;
    }
  }
}