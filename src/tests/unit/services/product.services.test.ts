import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

// Mock del modelo
jest.mock('../../../models/product.model');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('debería obtener productos con filtros correctamente', async () => {
      // Configurar mocks
      const mockProducts = [
        { _id: 'prod1', name: 'Product 1', price: 100 },
        { _id: 'prod2', name: 'Product 2', price: 200 }
      ];
      
      (Product.countDocuments as jest.Mock).mockResolvedValue(2);
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockProducts)
          })
        })
      });
      
      // Ejecutar función
      const result = await ProductService.getAllProducts({
        page: 1,
        limit: 10,
        category: 'electronics',
        minPrice: 50,
        maxPrice: 500
      });
      
      // Verificar resultados
      expect(Product.countDocuments).toHaveBeenCalled();
      expect(Product.find).toHaveBeenCalled();
      expect(result).toHaveProperty('products', mockProducts);
      expect(result).toHaveProperty('total', 2);
      expect(result).toHaveProperty('page', 1);
      expect(result).toHaveProperty('totalPages', 1);
    });
  });
  
  describe('getProductById', () => {
    it('debería obtener un producto por ID correctamente', async () => {
      // Configurar mocks
      const mockProduct = { _id: 'prod1', name: 'Product 1', price: 100 };
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
      
      // Ejecutar función
      const result = await ProductService.getProductById('prod1');
      
      // Verificar resultados
      expect(Product.findById).toHaveBeenCalledWith('prod1');
      expect(result).toEqual(mockProduct);
    });
    
    it('debería lanzar un error si el producto no existe', async () => {
      // Configurar mocks
      (Product.findById as jest.Mock).mockResolvedValue(null);
      
      // Ejecutar y verificar
      await expect(
        ProductService.getProductById('nonexistent')
      ).rejects.toThrow('Producto no encontrado');
    });
  });
  
  describe('createProduct', () => {
    it('debería crear un producto correctamente', async () => {
      // Configurar mocks
      const productData = {
        name: 'New Product',
        price: 150,
        category: 'electronics',
        stock: 10
      };
      
      const mockProduct = { _id: 'newprod', ...productData };
      (Product.create as jest.Mock).mockResolvedValue(mockProduct);
      
      // Ejecutar función
      const result = await ProductService.createProduct(productData);
      
      // Verificar resultados
      expect(Product.create).toHaveBeenCalledWith(productData);
      expect(result).toEqual(mockProduct);
    });
    
    it('debería lanzar un error si faltan campos requeridos', async () => {
      // Ejecutar y verificar
      await expect(
        ProductService.createProduct({ name: 'Incomplete Product' })
      ).rejects.toThrow('Faltan campos requeridos');
    });
  });
});