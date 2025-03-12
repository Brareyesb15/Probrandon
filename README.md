# Probrandon

## Description
Probrandon is a robust application designed to facilitate various functionalities, including secure password generation, date formatting, and data validation. This repository serves as a comprehensive toolkit for developers looking to enhance their applications with essential utilities. The application is built with TypeScript and utilizes MongoDB for data storage, ensuring a reliable and scalable solution.

## Features
- **Database Connection**: Connects to a MongoDB database using Mongoose, allowing for seamless data management.
- **Date Formatting**: Formats dates into specified formats, supporting various output styles.
- **Secure Password Generation**: Generates strong, random passwords with customizable options, ensuring security best practices.
- **Data Validation**: Validates various data types, including email, password, object IDs, and arrays, to maintain data integrity.

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
To connect to the MongoDB database, use the `connectDB` function from the `src/config/database.ts` file. Ensure that your MongoDB connection string is correctly configured.

### Formatting Dates
To format a date, use the `formatDate` function from the `src/utils/helpers.ts` file:
```typescript
import { formatDate } from './utils/helpers';

const formatted = formatDate(new Date(), 'MM/DD/YYYY');
console.log(formatted);
```
This function accepts a date and a format string (default is 'DD/MM/YYYY') and returns the formatted date as a string.

### Generating Secure Passwords
To generate a secure password, use the `generateSecurePassword` function from the `src/utils/security.ts` file:
```typescript
import { generateSecurePassword } from './utils/security';

const password = generateSecurePassword(16, true);
console.log(password);
```
This function allows you to specify the length of the password and whether to include special characters.

### Validating Data
To validate data types, use the `isSafeString` function from the `src/utils/security.ts` file and the `ValidDataType` type from the `src/utils/validation.ts` file. The validation now includes support for arrays as a valid data type.

## Project Structure
```
Probrandon/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── security.ts
│   │   └── validation.ts
│   └── ...
├── package.json
└── README.md
```

## API Documentation
### `connectDB()`
- Connects to the MongoDB database.
- **Returns**: Promise<void>

### `formatDate(date: Date | string, format: string = 'DD/MM/YYYY'): string`
- Formats a given date into a specified format.
- **Parameters**:
  - `date`: The date to format.
  - `format`: The desired format (default: 'DD/MM/YYYY').
- **Returns**: Formatted date as a string.

### `generateSecurePassword(length: number = 12, includeSpecialChars: boolean = true): string`
- Generates a secure random password.
- **Parameters**:
  - `length`: Length of the password (default: 12).
  - `includeSpecialChars`: Whether to include special characters (default: true).
- **Returns**: Generated password.

### `isSafeString(input: string): boolean`
- Validates if a string is safe based on predefined patterns.
- **Returns**: boolean indicating safety.

## Dependencies
- **Mongoose**: For MongoDB object modeling.
- **TypeScript**: For type safety and development.
- **Node.js**: Runtime environment.

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.