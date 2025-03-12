# Probrandon

## Descripción
Probrandon es un proyecto que se centra en proporcionar diversas funciones de ayuda y mecanismos de seguridad. Incluye funcionalidades para conexiones a bases de datos, validación de datos, generación de contraseñas seguras, formateo de fechas y paginación de resultados. Este proyecto está diseñado para ser flexible y fácil de usar, permitiendo a los desarrolladores integrar estas funcionalidades en sus aplicaciones de manera eficiente.

## Instalación
Para instalar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd Probrandon
   ```
3. Instala las dependencias requeridas:
   ```bash
   npm install
   ```

## Uso
Aquí hay algunas de las funciones principales disponibles en este proyecto:

### Conexión a la Base de Datos
La conexión a la base de datos se puede realizar con la siguiente función:
```typescript
import { connectDB } from './src/config/database';
```
Esta función establece una conexión a la base de datos utilizando Mongoose y maneja errores de conexión.

### Validación de Datos
Las funciones de validación se pueden utilizar para verificar diferentes tipos de datos:
```typescript
import { ValidDataType } from './src/utils/validation';
```
Ahora incluye la validación de arrays, además de los tipos existentes como 'email', 'password' y 'objectId'.

### Generación de Contraseñas
Para generar una contraseña segura, utiliza la siguiente función:
```typescript
import { generateSecurePassword } from './src/utils/security';
```
Esta función permite especificar la longitud de la contraseña y si debe incluir caracteres especiales, asegurando que la contraseña generada sea aleatoria y segura.

### Formateo de Fechas
Utiliza la función `formatDate` para formatear una fecha en un formato específico:
```typescript
import { formatDate } from './src/utils/helpers';
```
Esta función permite formatear fechas en el formato deseado, con un formato predeterminado de 'DD/MM/YYYY'.

### Paginación de Resultados
La función `paginateResults` permite paginar un conjunto de resultados, facilitando la gestión de grandes volúmenes de datos.

## Contribuciones
¡Las contribuciones a este proyecto son bienvenidas! Siéntete libre de enviar un pull request o abrir un issue.

## Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más información.