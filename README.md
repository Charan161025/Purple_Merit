# User Management System (RBAC) – MERN Stack

## Overview

This project is a **full-stack User Management System** built using the MERN stack.
It implements:

* Secure authentication (JWT)
* Role-Based Access Control (RBAC)
* User lifecycle management (CRUD)

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based login system
* Protected routes (frontend + backend)
* Role-based access control (Admin, Manager, User)

---

### 👥 User Roles

| Role    | Permissions                                              |
| ------- | -------------------------------------------------------- |
| Admin   | Full access (create, update, delete users, assign roles) |
| Manager | View users, update non-admin users                       |
| User    | View/update own profile                                  |

---

### User Management

* Create users
* View users list
* Update user (name + role)
* Delete users (hard delete)
* Profile management

---

---

## Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Authentication

* JSON Web Tokens (JWT)

---

## Project Structure

```plaintext
project-root/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── authRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Users.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   └── store/
│   └── dist/
│
└── README.md
```

---

## Environment Setup

### Backend `.env`

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  Installation & Setup

### Clone Repository

```bash
git clone <your-repo-url>
cd project-root
```

---

###  Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Build Frontend (Production)

```bash
cd frontend
npm run build
```

---

## Serve Frontend via Backend

Backend serves frontend:

```js
app.use(express.static(path.join(__dirname, "../frontend/dist")));
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/auth/login | Login user  |

---

### User Routes

| Method | Endpoint       | Access         |
| ------ | -------------- | -------------- |
| GET    | /api/users     | Admin, Manager |
| POST   | /api/users     | Admin          |
| PUT    | /api/users/:id | Admin, Manager |
| DELETE | /api/users/:id | Admin          |
| GET    | /api/users/me  | All users      |
| PUT    | /api/users/me  | All users      |

---

## Database Schema

### User Model

```js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user"
  },
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Migration / Seed Script (Optional)

You can create an initial admin manually:

```js
// Run in backend once
await User.create({
  name: "Admin",
  email: "admin@test.com",
  password: hashedPassword,
  role: "admin"
});
```

---

## Deployment

Recommended platforms:

* Render 


---

## Security Best Practices

* Password hashing (bcrypt)
* JWT authentication
* Protected API routes
* Role-based authorization
* Admin protection (cannot delete/modify)

---

## Future Improvements

* Pagination & search
* Activity logs
* Email verification
* Refresh tokens
* UI enhancements

---



