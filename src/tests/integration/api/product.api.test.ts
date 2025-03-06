import request from 'supertest';
import app from '../../../app';
import { Product } from '../../../models/product.model';
import { generateToken } from '../../../utils/helpers';
import mongoose from 'mongoose';

// Mock del modelo y utilidades
jest.mock('../../../models/product.model');
jest.mock('../../../utils/helpers');

describe('Product API', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(() => {
    // Generar tokens para pruebas
    adminToken = 'admin-token';
    userToken = 'user-token';
    
    (generateToken as jest.Mock).mockImplementation((user) => {
      return user.role === 'admin' ? adminToken : userToken;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('debería obtener una lista de productos', async () => {
      // Configurar mocks
      const mockProducts = [
        { _id: 'prod1', name: 'Product 1', price: 100 },
        { _id: 'prod2', name: 'Product 2', price: 200 }
      ];
      
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockProducts)
          })
        })
      });
      
      (Product.countDocuments as jest.Mock).mockResolvedValue(2);
      
      // Ejecutar solicitud
      const response = await request(app).get('/api/products');
      
      // Verificar respuesta
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(2);
    });
  });
  
  describe('GET /api/products/:id', () => {
    it('debería obtener un producto por ID', async () => {
      // Configurar mocks
      const mockProduct = { _id: 'prod1', name: 'Product 1', price: 100 };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
      
      // Ejecutar solicitud
      const response = await request(app).get('/api/products/prod1');
      
      // Verificar respuesta
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toEqual(mockProduct);
    });
    
    it('debería devolver 404 si el producto no existe', async () => {
      // Configurar mocks
      (Product.findById as jest.Mock).mockResolvedValue(null);
      
      // Ejecutar solicitud
      const response = await request(app).get('/api/products/nonexistent');
      
      // Verificar respuesta
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
    });
  });
  
  describe('POST /api/products', () => {
    it('debería crear un producto si el usuario es admin', async () => {
      // Configurar mocks
      const productData = {
        name: 'New Product',
        price: 150,
        category: 'electronics',
        stock: 10
      };
      
      const mockProduct = { _id: 'newprod', ...productData };
      (Product.create as jest.Mock).mockResolvedValue(mockProduct);
      
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData);
      
      // Verificar respuesta
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toEqual(mockProduct);
    });
    
    it('debería devolver 403 si el usuario no es admin', async () => {
      // Ejecutar solicitud
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'New Product',
          price: 150,
          category: 'electronics',
          stock: 10
        });
      
      // Verificar respuesta
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
    });
  });
});