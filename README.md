# CRM Backend API

A RESTful backend for a Customer Relationship Management (CRM) application built with **Node.js**, **Express.js**, and **MongoDB**. The API provides secure authentication using JWT and full CRUD functionality for customer management.

---

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Customer Routes
* Create Customer
* Get All Customers
* Get Customer by ID
* Update Customer
* Delete Customer
* MongoDB Integration with Mongoose
* Global Error Handling Middleware
* CORS Enabled
* Environment Variable Support

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* dotenv
* cors

---

## Project Structure

```text
backend
│
├── config
│   └── ConnectDB.js
│
├── controllers
│   ├── CustomerController.js
│   └── UserController.js
│
├── middleware
│   ├── authmiddleware.js
│   └── errorHandler.js
│
├── models
│   ├── CustomerModel.js
│   └── UserModel.js
│
├── routes
│   └── UserRoutes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/<your-username>/CRM_Server.git
```

Navigate to the project directory

```bash
cd CRM_Server
```

Install dependencies

```bash
npm start
```

Start the development server

```bash
npm run dev
```

The server will start at

```text
http://localhost:3000
```

---

## Authentication

### Register User

**POST**

```text
/user/auth/signup
```

### Login User

**POST**

```text
/user/auth/login
```

---

## Customer API

All customer endpoints require a valid JWT token.

### Create Customer

**POST**

```text
/user/createcustomers
```

---

### Get All Customers

**GET**

```text
/user/getallcustomers
```

### Get Customer By ID

**GET**

```text
/user/getcustomer/:id
```

---

### Update Customer

**PUT**

```text
/user/updatecustomer/:id
```

---

### Delete Customer

**DELETE**

```text
/user/deletecustomer/:id
```

---

## Authorization Header

Include the JWT token in every protected request.

Example:

```http
Authorization: Bearer <your_jwt_token>
```

---

## Request Body Example

```json
{
  "name": "John Smith",
  "email": "john@gmail.com",
  "phone": "9876543210",
  "company": "Google",
  "status": "Active",
  "notes": "Premium customer"
}
```

---

## Environment Variables

| Variable   | Description                       |
| ---------- | --------------------------------- |
| PORT       | Server Port                       |
| MONGO_URI  | MongoDB Connection String         |
| JWT_SECRET | Secret Key for JWT Authentication |

---

## Error Handling

The application uses a global error-handling middleware to return consistent API responses for unexpected errors.

Example response:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Future Improvements

* Customer Profile Image Upload
* Pagination
* Sorting
* Advanced Search
* Dashboard Analytics
* Role-Based Access Control
* Email Verification
* Password Reset
* API Documentation with Swagger

---


