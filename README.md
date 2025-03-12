# Probrandon

## Description
Probrandon is a comprehensive application designed for managing products through a RESTful API. It provides functionalities for creating, updating, deleting, and retrieving product information, ensuring efficient product management and data integrity.

## Features
- **Create Product**: Add new products to the database.
- **Update Product**: Modify existing product details.
- **Delete Product**: Mark products as inactive without removing them from the database.
- **Retrieve Products**: Fetch all products or a specific product by ID.

## Important Functions

### `deleteProduct`
The `deleteProduct` function is a crucial part of the product management system. It allows for the deletion of a product by marking it as inactive. This is done by updating the `isActive` property of the product to `false`, using the provided `productId` to identify the product in the database.

#### Usage
To use the `deleteProduct` function, you need to call it from the `ProductController` class, which handles the HTTP request. The function expects the `productId` to be passed as a parameter from the request.

```typescript
// Example of deleting a product
app.delete('/products/:id', productController.deleteProduct);
```

Upon successful execution, it returns a 200 status with a success message. If the product is not found, it responds with a 404 status, and for other errors, a 500 status is returned.

## Installation
To set up the Probrandon application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Probrandon
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables as needed (e.g., database connection).
5. Start the application:
   ```bash
   npm start
   ```

## Usage
Once the application is running, you can interact with the API using tools like Postman or cURL. The following endpoints are available:

- **Create Product**: `POST /products`
- **Get All Products**: `GET /products`
- **Get Product by ID**: `GET /products/:id`
- **Update Product**: `PUT /products/:id`
- **Delete Product**: `DELETE /products/:id`

## Folder Structure
```
src
├── app.ts
├── config
│   ├── database.ts
│   ├── logger.ts
│   └── server.ts
├── controllers
│   ├── order.controller.ts
│   ├── product.controller.ts
│   └── user.controller.ts
├── middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validation.middleware.ts
├── models
│   ├── order.model.ts
│   ├── product.model.ts
│   └── user.model.ts
├── routes
│   ├── order.routes.ts
│   ├── product.routes.ts
│   └── user.routes.ts
└── utils
    ├── helpers.ts
    ├── security.ts
    └── validation.ts
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.