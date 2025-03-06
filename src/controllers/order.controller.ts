import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { logger } from '../config/logger';

export class OrderController {
  /**
   * Crea un nuevo pedido
   * @route POST /api/orders
   */
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const orderData = req.body;
      
      const order = await OrderService.createOrder(userId, orderData);
      
      res.status(201).json({
        success: true,
        message: 'Pedido creado exitosamente',
        data: order
      });
    } catch (error: any) {
      logger.error('Error en OrderController.createOrder:', error);
      
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear pedido'
      });
    }
  }
  
  /**
   * Obtiene todos los pedidos del usuario actual
   * @route GET /api/orders
   */
  static async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      
      const orders = await OrderService.getUserOrders(userId);
      
      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error: any) {
      logger.error('Error en OrderController.getUserOrders:', error);
      
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener pedidos'
      });
    }
  }
  
  /**
   * Obtiene un pedido por su ID
   * @route GET /api/orders/:id
   */
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      
      const order = await OrderService.getOrderById(orderId);
      
      // Verificar que el pedido pertenece al usuario actual (a menos que sea admin)
      if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'No tienes permiso para ver este pedido'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error: any) {
      logger.error('Error en OrderController.getOrderById:', error);
      
      res.status(error.message.includes('no encontrado') ? 404 : 500).json({
        success: false,
        message: error.message || 'Error al obtener pedido'
      });
    }
  }
  
  /**
   * Actualiza el estado de un pedido
   * @route PUT /api/orders/:id/status
   */
  static async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const { status } = req.body;
      
            // Verificar que el usuario es admin
            if (req.user.role !== 'admin') {
                res.status(403).json({
                  success: false,
                  message: 'No tienes permiso para actualizar el estado del pedido'
                });
                return;
              }
              
              const order = await OrderService.updateOrderStatus(orderId, status);
              
              res.status(200).json({
                success: true,
                message: 'Estado del pedido actualizado exitosamente',
                data: order
              });
            } catch (error: any) {
              logger.error('Error en OrderController.updateOrderStatus:', error);
              
              res.status(error.message.includes('no encontrado') ? 404 : 400).json({
                success: false,
                message: error.message || 'Error al actualizar estado del pedido'
              });
            }
          }
          
          /**
           * Actualiza el estado de pago de un pedido
           * @route PUT /api/orders/:id/payment
           */
          static async updatePaymentStatus(req: Request, res: Response): Promise<void> {
            try {
              const orderId = req.params.id;
              const { paymentStatus } = req.body;
              
              // Verificar que el usuario es admin
              if (req.user.role !== 'admin') {
                res.status(403).json({
                  success: false,
                  message: 'No tienes permiso para actualizar el estado de pago'
                });
                return;
              }
              
              const order = await OrderService.updatePaymentStatus(orderId, paymentStatus);
              
              res.status(200).json({
                success: true,
                message: 'Estado de pago actualizado exitosamente',
                data: order
              });
            } catch (error: any) {
              logger.error('Error en OrderController.updatePaymentStatus:', error);
              
              res.status(error.message.includes('no encontrado') ? 404 : 400).json({
                success: false,
                message: error.message || 'Error al actualizar estado de pago'
              });
            }
          }
        }