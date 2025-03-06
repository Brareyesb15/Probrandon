import { Order, IOrder, IOrderItem } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { logger } from '../config/logger';
import { validateDataType } from '../utils/validation';
import { calculateTotalPrice } from '../utils/helpers';

export class OrderService {
  /**
   * Crea un nuevo pedido
   * @param userId ID del usuario que realiza el pedido
   * @param orderData Datos del pedido
   * @returns Pedido creado
   */
  static async createOrder(
    userId: string,
    orderData: {
      items: Array<{ product: string; quantity: number }>;
      shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    }
  ): Promise<IOrder> {
    try {
      // Validar ID de usuario
      if (!validateDataType(userId, 'objectId')) {
        throw new Error('ID de usuario inválido');
      }
      
      // Verificar que el usuario existe
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      
      // Verificar que hay items en el pedido
      if (!orderData.items || orderData.items.length === 0) {
        throw new Error('El pedido debe contener al menos un producto');
      }
      
      // Procesar los items del pedido
      const orderItems: IOrderItem[] = [];
      let totalAmount = 0;
      
      for (const item of orderData.items) {
        // Validar ID de producto
        if (!validateDataType(item.product, 'objectId')) {
          throw new Error('ID de producto inválido');
        }
        
        // Obtener el producto
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Producto no encontrado: ${item.product}`);
        }
        
        // Verificar stock
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para el producto: ${product.name}`);
        }
        
        // Agregar item al pedido
        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price
        });
        
        // Actualizar stock del producto
        await Product.findByIdAndUpdate(product._id, {
          $inc: { stock: -item.quantity }
        });
      }
      
      // Calcular el total del pedido
      totalAmount = calculateTotalPrice(orderItems);
      
      // Crear el pedido
      const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        status: 'pending',
        paymentStatus: 'pending'
      });
      
      return order;
    } catch (error) {
      logger.error('Error en OrderService.createOrder:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene todos los pedidos de un usuario
   * @param userId ID del usuario
   * @returns Lista de pedidos
   */
  static async getUserOrders(userId: string): Promise<IOrder[]> {
    try {
      // Validar ID de usuario
      if (!validateDataType(userId, 'objectId')) {
        throw new Error('ID de usuario inválido');
      }
      
      // Obtener pedidos
      const orders = await Order.find({ user: userId })
        .populate('items.product', 'name price')
        .sort({ createdAt: -1 });
      
      return orders;
    } catch (error) {
      logger.error('Error en OrderService.getUserOrders:', error);
      throw error;
    }
  }
  
  /**
   * Obtiene un pedido por su ID
   * @param orderId ID del pedido
   * @returns Pedido encontrado
   */
  static async getOrderById(orderId: string): Promise<IOrder> {
    try {
      // Validar ID de pedido
      if (!validateDataType(orderId, 'objectId')) {
        throw new Error('ID de pedido inválido');
      }
      
      // Obtener pedido
      const order = await Order.findById(orderId)
        .populate('user', 'username email')
        .populate('items.product', 'name price imageUrl');
      
      if (!order) {
        throw new Error('Pedido no encontrado');
      }
      
      return order;
    } catch (error) {
      logger.error('Error en OrderService.getOrderById:', error);
      throw error;
    }
  }
  
  /**
   * Actualiza el estado de un pedido
   * @param orderId ID del pedido
   * @param status Nuevo estado
   * @returns Pedido actualizado
   */
  static async updateOrderStatus(
    orderId: string,
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ): Promise<IOrder> {
    try {
      // Validar ID de pedido
      if (!validateDataType(orderId, 'objectId')) {
        throw new Error('ID de pedido inválido');
      }
      
      // Obtener pedido
      const order = await Order.findById(orderId);
      
      if (!order) {
        throw new Error('Pedido no encontrado');
      }
      
      // Si se cancela un pedido, restaurar el stock
      if (status === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity }
          });
        }
      }
      
      // Actualizar estado
      order.status = status;
      await order.save();
      
      return order;
    } catch (error) {
      logger.error('Error en OrderService.updateOrderStatus:', error);
      throw error;
    }
  }
  
  /**
   * Actualiza el estado de pago de un pedido
   * @param orderId ID del pedido
   * @param paymentStatus Nuevo estado de pago
   * @returns Pedido actualizado
   */
  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: 'pending' | 'paid' | 'failed'
  ): Promise<IOrder> {
    try {
      // Validar ID de pedido
      if (!validateDataType(orderId, 'objectId')) {
        throw new Error('ID de pedido inválido');
      }
      
      // Actualizar estado de pago
      const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus },
        { new: true }
      );
      
      if (!order) {
        throw new Error('Pedido no encontrado');
      }
      
      return order;
    } catch (error) {
      logger.error('Error en OrderService.updatePaymentStatus:', error);
      throw error;
    }
  }
}