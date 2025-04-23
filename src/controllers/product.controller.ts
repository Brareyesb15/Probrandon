import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { logger } from '../config/logger';

export class ProductController {
  /**
   * Obtiene todos los productos cambiossss en 
   * @route GET /api/products
   */
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const { 
        page, 
        limit, 
        category, 
        minPrice, 
        maxPrice, 
        isActive 
      } = req.query;
      
      const result = await ProductService.getAllProducts({
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        category: category as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        isActive: isActive === 'false' ? false : true
      });
      
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error: any) {
      logger.error('Error en ProductController.getAllProducts:', error);
      
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener productos'
      });
    }
  }
  
  /**
   * Obtiene un producto por su ID
   * @route GET /api/products/:id
   */
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      
      const product = await ProductService.getProductById(productId);
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error: any) {
      logger.error('Error en ProductController.getProductById:', error);
      
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        success: false,
        message: error.message || 'Error al obtener producto'
      });
    }
  }
  
  /**
   * Crea un nuevo producto
   * @route POST /api/products
   */
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body;
      
      const product = await ProductService.createProduct(productData);
      
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: product
      });
    } catch (error: any) {
      logger.error('Error en ProductController.createProduct:', error);
      
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear producto'
      });
    }
  }
  
  /**
   * Actualiza un producto existente
   * @route PUT /api/products/:id
   */
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      
      const product = await ProductService.updateProduct(productId, updateData);
      
      res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: product
      });
    } catch (error: any) {
      logger.error('Error en ProductController.updateProduct:', error);
      
      res.status(error.message.includes('no encontrado') ? 404 : 400).json({
        success: false,
        message: error.message || 'Error al actualizar producto'
      });
    }
  }
  
  /**
   * Elimina un producto (marcándolo como inactivo)
   * @route DELETE /api/products/:id
   */
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      
      await ProductService.deleteProduct(productId);
      
      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente'
      });
    } catch (error: any) {
      logger.error('Error en ProductController.deleteProduct:', error);
      
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        success: false,
        message: error.message || 'Error al eliminar producto'
      });
    }
  }
}