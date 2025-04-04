import crypto from 'crypto';

/**
 * Genera un hash seguro para una contraseña
 * @param password Contraseña a hashear
 * @param salt Sal para el hash (opcional)
 * @returns Hash y sal utilizados
 */
export const hashPassword = (
  password: string,
  salt?: string
): { hash: string; salt: string } => {
  // Si no se proporciona una sal, generarla
  const usedSalt = salt || crypto.randomBytes(16).toString('hex');
  
  // Crear hash con HMAC SHA-256
  const hash = crypto
    .createHmac('sha256', usedSalt)
    .update(password)
    .digest('hex');
  
  return { hash, salt: usedSalt };
};

/**
 * Verifica si una contraseña coincide con un hash
 * @param password Contraseña a verificar
 * @param hash Hash almacenado
 * @param salt Sal utilizada para el hash
 * @returns true si coincide, false si no
 */
export const verifyPassword = (
  password: string,
  hash: string,
  salt: string
): boolean => {
  const { hash: newHash } = hashPassword(password, salt);
  return newHash === hash;
};

/**
 * Genera un token aleatorio
 * @param length Longitud del token
 * @returns Token generado
 */
export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Sanitiza una cadena para prevenir inyecciones
 * @param input Cadena a sanitizar
 * @returns Cadena sanitizada
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Verifica si una cadena contiene caracteres potencialmente peligrosos
 * @param input Cadena a verificar
 * @returns true si es segura, false si contiene caracteres peligrosos
 */
export const isSafeString = (input: string): boolean => {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi,
    /data:/gi
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Genera una contraseña aleatoria segura
 * @param length Longitud de la contraseña (default: 12)
 * @param includeSpecialChars Si debe incluir caracteres especiales (default: true)
 * @returns Contraseña generada
 */
export const generateSecurePassword = (
  length: number = 12,
  includeSpecialChars: boolean = true
): string => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
  let allChars = uppercaseChars + lowercaseChars + numberChars;
  if (includeSpecialChars) {
    allChars += specialChars;
  }
  
  // Asegurar que la contraseña tenga al menos un carácter de cada tipo
  let password = '';
  password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
  password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
  password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  
  if (includeSpecialChars) {
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  }
  
  // Completar el resto de la contraseña con caracteres aleatorios
  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Mezclar los caracteres para que no siempre siga el mismo patrón
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};