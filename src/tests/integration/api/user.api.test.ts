import request from 'supertest';
import app from '../../../app';
import { User } from '../../../models/user.model';
import mongoose from 'mongoose';

// Mock del modelo
jest.mock('../../../models/user.model');

describe('User API', () => {
  beforeAll(async () => {
    // Configuración antes de todas las pruebas
  });

  afterAll(async () => {
    // Limpieza después de todas las pruebas
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users/register', () => {
    it('debería registrar un nuevo usuario', async () => {
      // Configurar mocks
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user'
      };
      
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockImplementation(() => ({
        ...mockUser,
        toJSON: () => mockUser
      }));
      
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123'
        });
      
      // Verificar respuesta
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('token');
    });
    
    it('debería devolver error si faltan campos requeridos', async () => {
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser'
          // Falta email y password
        });
      
      // Verificar respuesta
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('errors');
    });
  });
  
  describe('POST /api/users/login', () => {
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
      
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'Password123'
        });
      
      // Verificar respuesta
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('token');
    });
    
    it('debería devolver error si las credenciales son incorrectas', async () => {
      // Configurar mocks
      const mockUser = {
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });
      
      // Verificar respuesta
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
    });
  });
});