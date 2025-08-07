# Categories and Services API

A complete REST API for managing categories and services with JWT authentication, built with Node.js, Express, and MySQL.

## Features

- JWT-based authentication
- CRUD operations for categories
- CRUD operations for services within categories
- Price options management for services
- MySQL database with stored procedures
- Proper error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BackendCodesFT
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
```

4. Set up the database:
   - Create a MySQL database
   - Run the SQL commands from `database_schema.sql`
   - Run the stored procedures from `stored_procedures.sql`

5. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication (No Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Login and get JWT token |

### Categories (Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/category` | Create a new category |
| GET | `/api/categories` | Get all categories |
| PUT | `/api/category/:categoryId` | Update a category |
| DELETE | `/api/category/:categoryId` | Delete a category (only if empty) |

### Services (Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/category/:categoryId/service` | Add a service to a category |
| GET | `/api/category/:categoryId/services` | Get all services in a category |
| PUT | `/api/category/:categoryId/service/:serviceId` | Update a service |
| DELETE | `/api/category/:categoryId/service/:serviceId` | Delete a service |

### Price Options (Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/service/:serviceId/price-option` | Add a price option to a service |
| GET | `/api/service/:serviceId/price-options` | Get all price options for a service |
| PUT | `/api/price-option/:priceOptionId` | Update a price option |
| DELETE | `/api/price-option/:priceOptionId` | Delete a price option |

## Request/Response Examples

### Login
```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@codesfortomorrow.com",
  "password": "Admin123!@#"
}
```

Response:
```json
{
  "success": true,
  "message": "User login successful",
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "email": "admin@codesfortomorrow.com"
  }
}
```

### Create Category
```bash
POST /api/category
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "categoryName": "Cleaning Services"
}
```

### Add Service
```bash
POST /api/category/1/service
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "serviceName": "House Cleaning",
  "serviceType": "Normal"
}
```

### Update Service with Price Options
```bash
PUT /api/category/1/service/1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "serviceName": "Premium House Cleaning",
  "serviceType": "VIP",
  "priceOptions": [
    {
      "duration": 2,
      "price": 50.00,
      "priceType": "Hourly"
    },
    {
      "duration": 1,
      "price": 200.00,
      "priceType": "Weekly"
    }
  ]
}
```

## Database Schema

### Tables

1. **tbl_user_profiles** - User authentication
2. **tbl_categories** - Service categories
3. **tbl_services** - Services within categories
4. **tbl_service_price_options** - Price options for services

### Enums

- **Service Type**: `Normal`, `VIP`
- **Price Type**: `Hourly`, `Weekly`, `Monthly`

## Authentication

All endpoints except `/api/register` and `/api/login` require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Testing with Postman

1. Import the `API_Documentation.postman_collection.json` file into Postman
2. Set the `base_url` variable to your server URL (default: `http://localhost:3000/api`)
3. Run the "Login" request to get a JWT token
4. The token will be automatically set for subsequent requests

## Default Credentials

- Email: `admin@codesfortomorrow.com`
- Password: `Admin123!@#`

## Project Structure

```
BackendCodesFT/
├── DBconfig/
│   └── dbConfig.js
├── src/
│   ├── controller/
│   │   ├── controller.js
│   │   └── loginregistration.controller.js
│   ├── Midilware/
│   │   └── verifyToken.js
│   ├── model/
│   │   ├── model.js
│   │   └── loginregistration.model.js
│   └── route/
│       └── route.js
├── index.js
├── package.json
├── database_schema.sql
├── stored_procedures.sql
├── API_Documentation.postman_collection.json
└── README.md
```

## Dependencies

- express - Web framework
- mysql2 - MySQL database driver
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- dotenv - Environment variables

## License

This project is licensed under the MIT License. 