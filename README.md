# Probrandon

## Description
Probrandon is a robust application designed to facilitate various functionalities, including secure password generation, date formatting, and data validation. This repository serves as a comprehensive toolkit for developers looking to enhance their applications with essential utilities.

## Features
- **Database Connection**: Connects to a MongoDB database using Mongoose.
- **Date Formatting**: Formats dates into specified formats.
- **Secure Password Generation**: Generates strong, random passwords with customizable options.
- **Data Validation**: Validates various data types, including email, password, object IDs, and arrays.

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
### Connecting to the Database
To connect to the MongoDB database, use the `connectDB` function from the `src/config/database.ts` file.

### Formatting Dates
To format a date, use the `formatDate` function from the `src/utils/helpers.ts` file:
```typescript
import { formatDate } from './utils/helpers';

const formatted = formatDate(new Date(), 'MM/DD/YYYY');
console.log(formatted);
```

### Generating Secure Passwords
To generate a secure password, use the `generateSecurePassword` function from the `src/utils/security.ts` file:
```typescript
import { generateSecurePassword } from './utils/security';

const password = generateSecurePassword(16, true);
console.log(password);
```

### Validating Data
To validate data types, use the `isSafeString` function from the `src/utils/security.ts` file and the `ValidDataType` type from the `src/utils/validation.ts` file.

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.