# Creavers Backend 🚀

A production-ready, scalable Node.js backend application built with **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**. Designed for performance, security, and clean architectural separation of concerns.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Running the Server](#-running-the-server)
- [API Documentation](#-api-documentation)
- [Future Features](#-future-features)

---

## ℹ️ Project Overview

**Creavers Backend** provides the core foundational REST API services for the Creavers Marketplace platform. It is engineered with:
- **Strict TypeScript** type safety across controllers, services, and configuration.
- **Prisma ORM** for type-safe database queries and migrations targeting PostgreSQL.
- **Enterprise Security & Reliability**: Rate limiting (`express-rate-limit`), HTTP header security (`helmet`), CORS configuration, and response compression (`compression`).
- **Clean Architecture**: Modular layer separation (Routes -> Controllers -> Services -> Database).

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Runtime Environment** | [Node.js](https://nodejs.org/) (v18+) |
| **Framework** | [Express.js](https://expressjs.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma ORM](https://www.prisma.io/) |
| **Security & Middleware** | Helmet, CORS, Express Rate Limit, Compression |
| **Logging & Utilities** | Morgan, dotenv, ts-node, nodemon |

---

## 📂 Folder Structure

```text
creavers-backend/
│
├── src/
│   ├── config/          # Database connection & environment configuration
│   ├── controllers/     # Route controller functions
│   ├── middleware/      # Custom Express middlewares (error handling, rate limiting)
│   ├── models/          # Data models & schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # Custom TypeScript types and interface declarations
│   ├── utils/           # Utility functions and loggers
│   ├── app.ts           # Express application setup
│   └── server.ts        # Server entry point & lifecycle listeners
│
├── prisma/              # Prisma schema & migration configuration
├── logs/                # Application & error log storage
│
├── .env                 # Local environment variables
├── .env.example         # Environment template file
├── package.json         # Node.js dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── README.md            # Repository documentation
└── .gitignore           # Git ignore configuration
```

---

## 🔑 Environment Variables

Environment variables are managed using `dotenv`. Create a `.env` file in the root directory based on `.env.example`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Server listener port | `5000` |
| `NODE_ENV` | Environment mode (`development` \| `production`) | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/creavers_db?schema=public` |
| `JWT_SECRET` | Secret key for signing authentication tokens | *Secret key* |
| `CORS_ORIGIN` | Allowed cross-origin resource sharing origins | `*` |

> ⚠️ **Security Warning**: Never commit `.env` or expose production secrets to version control.

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/creavers-backend.git
   cd creavers-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Update .env with your local PostgreSQL credentials
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Run Database Migrations** *(Optional when PostgreSQL instance is running)*:
   ```bash
   npx prisma migrate dev
   ```

---

## 🚀 Running the Server

### Development Mode
Runs the server with live reloading via `nodemon` and `ts-node`:
```bash
npm run dev
```

### Production Build & Execution
Build the TypeScript code into `dist/` and run the compiled JavaScript:
```bash
# Compile TypeScript code
npm run build

# Start production server
npm start
```

---

## 📑 API Documentation

### Base URL
```http
http://localhost:5000/api/v1
```

### Health Check Endpoint
Verify server status, uptime, and timestamp.

- **URL**: `/api/v1/health`
- **Method**: `GET`

### User Management Endpoints

#### 1. Register User
- **URL**: `/api/v1/users/register`
- **Method**: `POST`
- **Body**:
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "CUSTOMER"
}
```
*(Role options: `CUSTOMER`, `PROVIDER`, `ADMIN`. Defaults to `CUSTOMER` if omitted).*

#### 2. Get All Users
- **URL**: `/api/v1/users`
- **Method**: `GET`
- **Description**: Returns list of registered users (passwords excluded).

#### 3. Get User By ID
- **URL**: `/api/v1/users/:id`
- **Method**: `GET`
- **Description**: Fetches user profile by UUID (password excluded).

---

## 🔮 Future Features

- [ ] **JWT Authentication & Authorization**: User registration, login, token refresh, and role-based access control (RBAC).
- [ ] **User & Profile Management**: Extended database models and profile management services.
- [ ] **Marketplace Product & Order Catalog**: Comprehensive CRUD APIs for marketplace items.
- [ ] **Swagger / OpenAPI Interactive Docs**: UI documentation served directly at `/api/docs`.
- [ ] **Automated Testing**: Unit and integration test suites using Jest and Supertest.
- [ ] **Docker Containerization**: Dockerfile and `docker-compose` support for database and application orchestration.

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
