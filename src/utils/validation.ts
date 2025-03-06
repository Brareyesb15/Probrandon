import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

// Tipos de datos básicos que manejamos en la aplicación
export type ValidDataType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'date' 
  | 'email' 
  | 'password'
  | 'objectId';

/**
 * Valida que un valor sea del tipo especificado
 * @param value Valor a validar
 * @param type Tipo de dato esperado
 * @param options Opciones adicionales de validación
 * @returns true si es válido, false si no lo es
 */
export const validateDataType = (
  value: any, 
  type: ValidDataType,
  options: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
  } = {}
): boolean => {
  try {
    switch (type) {
      case 'string':
        if (typeof value !== 'string') return false;
        if (options.minLength && value.length < options.minLength) return false;
        if (options.maxLength && value.length > options.maxLength) return false;
        if (options.pattern && !options.pattern.test(value)) return false;
        return true;
        
      case 'number':
        if (typeof value !== 'number' || isNaN(value)) return false;
        if (options.min !== undefined && value < options.min) return false;
        if (options.max !== undefined && value > options.max) return false;
        return true;
        
      case 'boolean':
        return typeof value === 'boolean';
        
      case 'date':
        if (!(value instanceof Date) && isNaN(Date.parse(value))) return false;
        return true;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value);
        
      case 'password':
        if (typeof value !== 'string') return false;
        // Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(value);
        
      case 'objectId':
        // Validación simple de ObjectId de MongoDB (24 caracteres hexadecimales)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return typeof value === 'string' && objectIdRegex.test(value);
        
      default:
        return false;
    }
  } catch (error) {
    logger.error('Error en validateDataType:', error);
    return false;
  }
};

/**
 * Valida un objeto completo según un esquema definido
 * @param data Objeto a validar
 * @param schema Esquema de validación
 * @returns Objeto con errores si hay alguno, o null si todo es válido
 */
export const validateObject = (
  data: Record<string, any>,
  schema: Record<string, { type: ValidDataType; required?: boolean; options?: any }>
): Record<string, string> | null => {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    // Si el campo es requerido y no existe o es undefined
    if (rules.required && (data[field] === undefined || data[field] === null)) {
      errors[field] = `El campo ${field} es requerido`;
      continue;
    }

    // Si el campo existe, validar su tipo
    if (data[field] !== undefined && data[field] !== null) {
      const isValid = validateDataType(data[field], rules.type, rules.options);
      if (!isValid) {
        errors[field] = `El campo ${field} no es un ${rules.type} válido`;
      }
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Middleware para validar los datos de una solicitud
 * @param schema Esquema de validación para el cuerpo de la solicitud
 * @returns Middleware de Express
 */
export const validateRequest = (
  schema: Record<string, { type: ValidDataType; required?: boolean; options?: any }>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validateObject(req.body, schema);
    
    if (errors) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error de validación', 
        errors 
      });
    }
    
    next();
  };
};

/**
 * Esquemas de validación predefinidos para diferentes entidades
 */
export const validationSchemas = {
  user: {
    create: {
      username: { type: 'string', required: true, options: { minLength: 3, maxLength: 50 } },
      email: { type: 'email', required: true },
      password: { type: 'password', required: true },
      role: { type: 'string', required: false }
    },
    update: {
      username: { type: 'string', required: false, options: { minLength: 3, maxLength: 50 } },
      email: { type: 'email', required: false },
      password: { type: 'password', required: false }
    },
    login: {
      email: { type: 'email', required: true },
      password: { type: 'string', required: true }
    }
  },
  product: {
    create: {
      name: { type: 'string', required: true, options: { maxLength: 100 } },
      description: { type: 'string', required: true, options: { maxLength: 1000 } },
      price: { type: 'number', required: true, options: { min: 0 } },
      stock: { type: 'number', required: true, options: { min: 0 } },
      category: { type: 'string', required: true },
      imageUrl: { type: 'string', required: false },
      isActive: { type: 'boolean', required: false }
    },
    update: {
      name: { type: 'string', required: false, options: { maxLength: 100 } },
      description: { type: 'string', required: false, options: { maxLength: 1000 } },
      price: { type: 'number', required: false, options: { min: 0 } },
      stock: { type: 'number', required: false, options: { min: 0 } },
      category: { type: 'string', required: false },
      imageUrl: { type: 'string', required: false },
      isActive: { type: 'boolean', required: false }
    }
  },
  order: {
    create: {
      items: { type: 'string', required: true }, // Esto se validará manualmente
      shippingAddress: { type: 'string', required: true }, // Esto se validará manualmente
      paymentMethod: { type: 'string', required: true }
    },
    update: {
      status: { type: 'string', required: false },
      paymentStatus: { type: 'string', required: false }
    }
  }
};

// Validadores específicos con Zod para validaciones más complejas
export const zodSchemas = {
  user: {
    create: z.object({
      username: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
      role: z.enum(['user', 'admin']).optional()
    }),
    update: z.object({
      username: z.string().min(3).max(50).optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).optional()
    })
  },
  product: {
    create: z.object({
      name: z.string().max(100),
      description: z.string().max(1000),
      price: z.number().min(0),
      stock: z.number().min(0),
      category: z.string(),
      imageUrl: z.string().optional(),
      isActive: z.boolean().optional()
    })
  },
  order: {
    create: z.object({
      items: z.array(z.object({
        product: z.string().regex(/^[0-9a-fA-F]{24}$/),
        quantity: z.number().min(1),
        price: z.number().min(0)
      })),
      shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string()
      }),
      paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer'])
    })
  }
};