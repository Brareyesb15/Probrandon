import { Product, IProduct } from '../models/product.model';
import { logger } from '../config/logger';
import { validateDataType } from '../utils/validation';

export class ProductService {
  /**
   * Obtiene todos los productos
   * @param query Parámetros de consulta (filtros, paginación, etc.)
   * @returns Lista de productos
   */
  static async getAllProducts(query: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
  }): Promise<{ products: IProduct[]; total: number; page: number; totalPages: number }> {
    try {
      const { 
        page = 1, 
        limit = 10, 
        category, 
        minPrice, 
        maxPrice, 
        isActive = true 
      } = query;
      
      // Construir filtros
      const filter: any = { isActive };
      
      if (category) {
        filter.category = category;
      }
      
      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
      }
      
      // Contar total de productos
      const total = await Product.countDocuments(filter);
      
      // Calcular total de páginas
      const totalPages = Math.ceil(total / limit);
      
      // Obtener productos paginados
      const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      
      return { products, total, page, totalPages };
    } catch (error) {
      logger.error('Error en ProductService.getAllProducts:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene un producto por su ID
   * @param productId ID del producto
   * @returns Producto encontrado
   */
  static async getProductById(productId: string): Promise<IProduct> {
    try {
      // Validar ID
      if (!validateDataType(productId, 'objectId')) {
        throw new Error('ID de producto inválido');
      }
      
      const product = await Product.findById(productId);
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      
      return product;
    } catch (error) {
      logger.error('Error en ProductService.getProductById:', error);
      throw error;
    }
  }
  
  /**
   * Crea un nuevo producto
   * @param productData Datos del producto
   * @returns Producto creado
   */
  static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    try {
      // Validar datos requeridos
      if (!productData.name || !productData.price || !productData.category) {
        throw new Error('Faltan campos requeridos');
      }
      
      // Crear el producto
      const product = await Product.create(productData);
      
      return product;
    } catch (error) {
      logger.error('Error en ProductService.createProduct:', error);
      throw error;
    }
  }
  
  /**
   * Actualiza un producto existente
   * @param productId ID del producto
   * @param updateData Datos a actualizar
   * @returns Producto actualizado
   */
  static async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct> {
    try {
      // Validar ID
      if (!validateDataType(productId, 'objectId')) {
        throw new Error('ID de producto inválido');
      }
      
      // Actualizar el producto
      const product = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      
      return product;
    } catch (error) {
      logger.error('Error en ProductService.updateProduct:', error);
      throw error;
    }
  }
  
  /**
   * Elimina un producto (marcándolo como inactivo)
   * @param productId ID del producto
   * @returns Producto eliminado
   */
  static async deleteProduct(productId: string): Promise<IProduct> {
    try {
      // Validar ID
      if (!validateDataType(productId, 'objectId')) {
        throw new Error('ID de producto inválido');
      }
      
      // Marcar como inactivo en lugar de eliminar
      const product = await Product.findByIdAndUpdate(
        productId,
        { isActive: false },
        { new: true }
      );
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      
      return product;
    } catch (error) {
      logger.error('Error en ProductService.deleteProduct:', error);
      throw error;
    }
  }
}