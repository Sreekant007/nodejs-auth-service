# 🔐 Node.js Authentication Service (TypeScript)

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)

---

## 📖 Overview

This project is a **production-ready authentication and authorization service** built using **Node.js, Express, and TypeScript**.

It demonstrates how to design **secure, scalable backend APIs** using:

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Clean and maintainable architecture

🎯 The primary goal of this project is to showcase **backend engineering best practices**, not UI.

---

## 🛠 Tech Stack

- 🟢 **Node.js**
- 🚀 **Express.js**
- 🔷 **TypeScript**
- 🔑 **JWT (JSON Web Tokens)**
- 🗄 **PostgreSQL / MongoDB**
- 🔒 **bcrypt** (password hashing)
- ⚙️ **dotenv** (environment variables)
- 🧪 **ts-node / ts-node-dev**

---

## ✨ Key Features

- 👤 User registration & login
- 🔐 JWT-based authentication
- 🧭 Role-based authorization (Admin / User)
- 🔒 Secure password hashing
- 🧩 Centralized error handling
- 🧠 Strong typing with TypeScript
- 📦 Environment-based configuration
- 🧱 Clean and scalable folder structure

---

## 📂 Folder Structure

The project follows a **layered architecture** with clear separation of concerns to ensure scalability, maintainability, and testability.

```
src/
├── app.ts # Express application configuration
├── server.ts # Application entry point
│
├── config/ # Configuration files
│ ├── env.ts # Environment variable validation & loading
│ └── database.ts # Database connection setup
│
├── routes/ # Route definitions
│ ├── auth.routes.ts # Authentication routes
│ └── user.routes.ts # User-related routes
│
├── controllers/ # HTTP request/response handlers
│ ├── auth.controller.ts
│ └── user.controller.ts
│
├── services/ # Business logic layer
│ ├── auth.service.ts
│ └── user.service.ts
│
├── middlewares/ # Express middlewares
│ ├── auth.middleware.ts # JWT authentication
│ ├── role.middleware.ts # Role-based access control
│ └── error.middleware.ts # Centralized error handling
│
├── models/ # Database models / schemas
│ └── user.model.ts
│
├── utils/ # Utility/helper functions
│ ├── jwt.ts # JWT generation & verification
│ ├── password.ts # Password hashing & comparison
│ └── response.ts # Standard API responses
│
├── types/ # Custom TypeScript types
│ └── express.d.ts # Extended Express request interface
│
└── constants/ # Application-wide constants
└── roles.ts # User role definitions

```

---

### 🧠 Architecture Notes

- **Controllers** handle HTTP concerns only
- **Services** contain core business logic
- **Middlewares** handle cross-cutting concerns (auth, errors)
- **Utils** keep reusable logic isolated
- **Types** ensure strong typing across the application

---

## 🧾 Commit Message Convention

This project follows a **conventional commit format** to maintain a clean and readable Git history.

```
For JIRA ID
<JIRA-ID> <type>: <short, imperative description>

<type>: <short, imperative description>
```

---

## 🏷 Allowed Commit Types

| Type       | Description                                |
| ---------- | ------------------------------------------ |
| `feat`     | A new feature                              |
| `fix`      | A bug fix                                  |
| `docs`     | Documentation changes only                 |
| `style`    | Code style changes (formatting, linting)   |
| `refactor` | Code refactoring without changing behavior |
| `test`     | Adding or updating tests                   |
| `chore`    | Tooling, configuration, setup tasks        |

---

## ✍️ Writing Good Commit Messages

### ✅ Do

- Use **present tense**
- Keep it **concise** (≤ 72 characters)
- Describe **what** changed, not how
- Make each commit **logically independent**

### ❌ Don’t

- Use vague messages (`update`, `fix stuff`)
- Combine unrelated changes
- Write long paragraphs

---

## 🧠 Examples

### Features

### Examples

```
For JIRA ID
AUTH-123 feat: implement JWT-based authentication

feat: implement JWT-based authentication
fix: handle invalid token errors
docs: update README with folder structure
```

---

## 🔐 Authentication Flow

1. 📝 User registers with email & password
2. 🔒 Password is hashed using bcrypt
3. 🎟 JWT is generated on successful login
4. 🛡 Protected routes validate JWT via middleware
5. 👮 Role middleware controls access

---

## 🚀 API Endpoints

- POST /api/auth/register → Register a new user
- POST /api/auth/login → Login & receive JWT
- GET /api/users/me → Logged-in user profile
- GET /api/admin/users → Admin-only route`

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

- PORT=3000
- JWT_SECRET=your_secret_key
- DB_URI=your_database_connection
- NODE_ENV=development

---

## 🧪 Error Handling

- ❌ Centralized error handling middleware
- 📛 Proper HTTP status codes
- 🛑 No sensitive information leaked
- 🔷 Typed error objects for consistency

---

## 🧠 Design Decisions & Trade-offs

- 🔑 **JWT** enables stateless authentication and horizontal scalability
- 🔷 **TypeScript** reduces runtime errors and improves maintainability
- 🧩 **RBAC** implemented via middleware for separation of concerns
- 🧱 Layered architecture improves readability and testability

---

## ▶️ Getting Started

### 📦 Install dependencies

```bash
npm install
```

### 🚀 Run in development

```
npm run dev
```

### 🏗 Build for production

```
npm run build
npm start
```

## 📈 Future Improvements

- ♻️ Refresh token implementation

- 🚦 Rate limiting

- 🧭 API versioning

- ⚡ Redis caching & token blacklisting

- 🔐 OAuth (Google / GitHub)

- 🧪 Unit & integration tests (Jest)

## 👤 Author

### Shrikant Govande

- Senior Full Stack Engineer

## ⭐ Why This Project Matters

- ✔ Shows real-world backend architecture
- ✔ Demonstrates security best practices
- ✔ TypeScript-first development
- ✔ Interview & recruiter friendly
