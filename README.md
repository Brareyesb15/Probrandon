# Probrandon

## Description
Probrandon is a robust application designed to manage various functionalities related to user accounts, products, and orders. It provides a structured approach to handle authentication, data validation, and secure password generation, making it suitable for modern web applications.

## Features
- **User Management**: Create, read, update, and delete user accounts with secure authentication.
- **Product Management**: Manage product listings, including adding new products, updating existing ones, and deleting products.
- **Order Processing**: Handle order creation and management efficiently.
- **Data Validation**: Ensure that all inputs are validated against specified criteria to maintain data integrity.
- **Security Utilities**: Generate secure passwords and validate input strings to prevent security vulnerabilities.
- **Date Formatting**: Format dates into specified formats for better readability.

## Installation
To set up the Probrandon application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   cd Probrandon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   Ensure you have MongoDB installed and running. Update the database configuration in `src/config/database.ts` as needed.

4. **Run the application**:
   ```bash
   npm start
   ```

## Usage
After setting up the application, you can access the API endpoints for user, product, and order management. Below are some examples of how to use the main functionalities:

### User Management
- **Create User**: Send a POST request to `/api/users` with user details.
- **Get User**: Send a GET request to `/api/users/:id` to retrieve user information.

### Product Management
- **Add Product**: Send a POST request to `/api/products` with product details.
- **Update Product**: Send a PUT request to `/api/products/:id` to update product information.
- **Delete Product**: Send a DELETE request to `/api/products/:id` to remove a product from the inventory.

### Order Processing
- **Create Order**: Send a POST request to `/api/orders` with order details.
- **Get Order**: Send a GET request to `/api/orders/:id` to retrieve order information.

## Utilities
### Password Generation
To generate a secure password, use the `generateSecurePassword` function from `src/utils/security.ts`. You can specify the length and whether to include special characters.

### Date Formatting
Use the `formatDate` function from `src/utils/helpers.ts` to format dates into a specified format.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.