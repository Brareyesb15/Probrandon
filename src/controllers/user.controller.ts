import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { logger } from '../config/logger';

export class UserController {
  /**
   * Registra un nuevo usuario
   * @route POST /api/users/register
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, role } = req.body;
      
      const result = await AuthService.register({
        username,
        email,
        password,
        role
      });
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error: any) {
      logger.error('Error en UserController.register:', error);
      
      res.status(400).json({
        success: false,
        message: error.message || 'Error al registrar usuario'
      });
    }
  }
  
  /**
   * Inicia sesión de un usuario
   * @route POST /api/users/login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      
      const result = await AuthService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result
      });
    } catch (error: any) {
      logger.error('Error en UserController.login:', error);
      
      res.status(401).json({
        success: false,
        message: error.message || 'Error al iniciar sesión'
      });
    }
  }
  
  /**
   * Obtiene el perfil del usuario actual
   * @route GET /api/users/profile
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      logger.error('Error en UserController.getProfile:', error);
      
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener perfil'
      });
    }
  }
  
  /**
   * Actualiza el perfil del usuario actual
   * @route PUT /api/users/profile
   */
  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const { username, email } = req.body;
      
      // Actualizar usuario
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: updatedUser
      });
    } catch (error: any) {
      logger.error('Error en UserController.updateProfile:', error);
      
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar perfil'
      });
    }
  }
  
  /**
   * Cambia la contraseña del usuario actual
   * @route PUT /api/users/change-password
   */
  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword } = req.body;
      
      // Obtener usuario
      const user = await User.findById(userId);
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      const isPasswordValid = await user.comparePassword(currentPassword);
      /sssss
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Contraseña actual incorrecta'
        });
        return;
      }
      
      // Actualizar contraseña
      user.password = newPassword;
      await user.save();
      
      res.status(200).json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });
    } catch (error: any) {
      logger.error('Error en UserController.changePassword:', error);
      
      res.status(400).json({
        success: false,
        message: error.message || 'Error al cambiar contraseña'
      });
    }
  }
}