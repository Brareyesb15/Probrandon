# Probrandon

## Description
Probrandon is a web application designed to manage orders, products, and users efficiently. It provides a robust API for handling various operations related to e-commerce functionalities.

## Features
- User authentication and authorization
- Order management
- Product management
- Input validation and error handling

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- TypeScript (version 4 or higher)
- MongoDB (or any other database as configured)

### Steps
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
4. Configure the database settings in `src/config/database.ts`.

## Usage
To start the application, run the following command:
```bash
npm start
```
The server will start on the configured port (default is 3000).

### API Endpoints
- **User Routes**
  - `POST /api/users` - Create a new user
  - `GET /api/users` - Retrieve all users
- **Product Routes**
  - `POST /api/products` - Add a new product
  - `GET /api/products` - Retrieve all products
- **Order Routes**
  - `POST /api/orders` - Create a new order
  - `GET /api/orders` - Retrieve all orders

## Middleware
The application includes middleware for:
- Authentication (`src/middleware/auth.middleware.ts`)
- Error handling (`src/middleware/error.middleware.ts`)
- Input validation (`src/middleware/validation.middleware.ts`)

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.