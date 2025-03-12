# Probrandon

## Descripción
Probrandon es un proyecto que se centra en proporcionar diversas funciones de ayuda y mecanismos de seguridad. Incluye funcionalidades para conexiones a bases de datos, validación de datos, generación de contraseñas seguras y formateo de fechas.

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

### Validación de Datos
Las funciones de validación se pueden utilizar para verificar diferentes tipos de datos:
```typescript
import { ValidDataType } from './src/utils/validation';
```

### Generación de Contraseñas
Para generar una contraseña segura, utiliza la siguiente función:
```typescript
import { generateSecurePassword } from './src/utils/security';
```

### Formateo de Fechas
Utiliza la función `formatDate` para formatear una fecha en un formato específico:
```typescript
import { formatDate } from './src/utils/helpers';
```

## Contribuciones
¡Las contribuciones a este proyecto son bienvenidas! Siéntete libre de enviar un pull request o abrir un issue.

## Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más información.