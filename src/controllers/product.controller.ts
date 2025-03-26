```
# Probrandon

Probrandon is a Node.js application that provides a RESTful API for managing products. It allows users to create, read, update, and delete products, with support for pagination and filtering.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Probrandon, follow these steps:

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

4. Set up your environment variables. Create a `.env` file in the root directory and configure the necessary variables (e.g., database connection string).

5. Start the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, you can interact with the API using tools like Postman or cURL. The API supports the following operations:

### API Endpoints

- **Get all products**
  - `GET /api/products`
  - Query parameters: `page`, `limit`, `category`, `minPrice`, `maxPrice`, `isActive`

- **Get a product by ID**
  - `GET /api/products/:id`

- **Create a new product**
  - `POST /api/products`
  - Request body: Product data in JSON format

- **Update an existing product**
  - `PUT /api/products/:id`
  - Request body: Updated product data in JSON format

- **Delete a product**
  - `DELETE /api/products/:id`

## Error Handling

The API provides standardized error responses. In case of an error, the response will include a `success` field set to `false` and a `message` field with a description of the error.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```