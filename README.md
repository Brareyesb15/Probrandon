# Probrandon

## Description

Probrandon is a robust application designed to manage products efficiently. It provides various utilities for product management, including the ability to delete products, validate data, and generate secure passwords. This repository is structured to facilitate easy integration and usage in various projects.

## Features

- **Product Management**: Add, update, and delete products.
- **Data Validation**: Ensure data integrity with built-in validation functions.
- **Secure Password Generation**: Create strong passwords with customizable options.
- **Date Formatting**: Format dates in a specified format.

## Installation

To install Probrandon, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Probrandon
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

### Deleting a Product

One of the key functionalities of Probrandon is the `deleteProduct` function. This function allows you to remove a product from the database efficiently. 

#### Example Usage:

```javascript
import { deleteProduct } from './src/utils/productManager';

// Delete a product by its ID
const productId = '12345';
deleteProduct(productId)
  .then(response => {
    console.log('Product deleted successfully:', response);
  })
  .catch(error => {
    console.error('Error deleting product:', error);
  });
```

### Other Utilities

- **Generate Secure Password**: Use the `generateSecurePassword` function to create a strong password.
  
  ```javascript
  import { generateSecurePassword } from './src/utils/security';

  const password = generateSecurePassword(16, true);
  console.log('Generated Password:', password);
  ```

- **Format Date**: Format dates using the `formatDate` function.

  ```javascript
  import { formatDate } from './src/utils/helpers';

  const formattedDate = formatDate(new Date(), 'MM/DD/YYYY');
  console.log('Formatted Date:', formattedDate);
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.