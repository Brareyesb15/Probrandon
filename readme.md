 Consiste en una API RESTful para un sistema de comercio electrónico simple, desarrollada con Node.js, Express y TypeScript.

## Estructura del Proyecto

El proyecto sigue una arquitectura en capas:

- **Modelos**: Definen la estructura de los datos y la interacción con la base de datos.
- **Controladores**: Manejan las solicitudes HTTP y delegan la lógica de negocio a los servicios.
- **Servicios**: Contienen la lógica de negocio principal.
- **Rutas**: Definen los endpoints de la API.
- **Middleware**: Funciones intermedias para autenticación, validación, manejo de errores, etc.
- **Utilidades**: Funciones auxiliares reutilizables.

## Características

- Autenticación con JWT
- Validación de datos de entrada
- Manejo de errores centralizado
- Registro de actividad (logging)
- Pruebas unitarias e integración

## Entidades Principales

- **Usuarios**: Gestión de usuarios y autenticación
- **Productos**: Catálogo de productos
- **Pedidos**: Gestión de pedidos de usuarios

## Requisitos

- Node.js 14+
- MongoDB
- TypeScript

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno (ver `.env.example`)
4. Compilar TypeScript: `npm run build`
5. Iniciar servidor: `npm start`

## Desarrollo

- Iniciar en modo desarrollo: `npm run dev`
- Ejecutar pruebas: `npm test`
- Lint: `npm run lint`

## API Endpoints

### Usuarios
- `POST /api/users/register` - Registrar nuevo usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile` - Obtener perfil (requiere autenticación)
- `PUT /api/users/profile` - Actualizar perfil (requiere autenticación)
- `PUT /api/users/change-password` - Cambiar contraseña (requiere autenticación)

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto (requiere admin)
- `PUT /api/products/:id` - Actualizar producto (requiere admin)
- `DELETE /api/products/:id` - Eliminar producto (requiere admin)

### Pedidos
- `POST /api/orders` - Crear pedido (requiere autenticación)
- `GET /api/orders` - Obtener pedidos del usuario (requiere autenticación)
- `GET /api/orders/:id` - Obtener pedido por ID (requiere autenticación)
- `PUT /api/orders/:id/status` - Actualizar estado del pedido (requiere admin)
- `PUT /api/orders/:id/payment` - Actualizar estado de pago (requiere admin)
