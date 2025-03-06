import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock de los módulos
jest.mock('../../../models/user.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
      // Configurar mocks
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        comparePassword: jest.fn()
      };
      
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mocktoken');
      
      // Ejecutar función
      const result = await AuthService.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      });
      
      // Verificar resultados
      expect(User.findOne).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token', 'mocktoken');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('username', 'testuser');
    });
    
    it('debería lanzar un error si el usuario ya existe', async () => {
      // Configurar mocks
      (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
      
      // Ejecutar y verificar
      await expect(
        AuthService.register({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123'
        })
      ).rejects.toThrow('El usuario ya existe');
    });
  });
  
  describe('login', () => {
    it('debería iniciar sesión correctamente', async () => {
      // Configurar mocks
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true)
      };
      
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mocktoken');
      
      // Ejecutar función
      const result = await AuthService.login('test@example.com', 'Password123');
      
      // Verificar resultados
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('Password123');
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token', 'mocktoken');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('email', 'test@example.com');
    });
    
    it('debería lanzar un error si el usuario no existe', async () => {
      // Configurar mocks
      (User.findOne as jest.Mock).mockResolvedValue(null);
      
      // Ejecutar y verificar
      await expect(
        AuthService.login('test@example.com', 'Password123')
      ).rejects.toThrow('Credenciales inválidas');
    });
    
    it('debería lanzar un error si la contraseña es incorrecta', async () => {
      // Configurar mocks
      const mockUser = {
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      // Ejecutar y verificar
      await expect(
        AuthService.login('test@example.com', 'WrongPassword')
      ).rejects.toThrow('Credenciales inválidas');
    });
  });
});