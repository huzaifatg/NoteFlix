# 📝 NoteFlix

> A modern, full-stack note-taking application built with the MERN stack, featuring a beautiful gradient UI, real-time search, and secure authentication.

---

## ✨ Features

### 📚 **Core Functionality**
- **Create & Manage Notes** - Rich text input with large, comfortable fields
- **Real-time Search** - Instantly filter notes by title or content
- **Smart Sorting** - Sort by most recent, oldest, or alphabetical order
- **Quick Actions** - Edit and delete notes with hover actions
- **Empty States** - Helpful prompts when no notes are found

### 🔐 **Security & Authentication**
- **JWT Authentication** - Secure token-based user sessions with 7-day token expiry
- **Password Hashing** - bcrypt with 10 salt rounds
- **Protected Routes** - Middleware verification on both API and frontend
- **Rate Limiting** - 100 requests per 60 seconds via Upstash Redis
- **Input Validation** - Email format validation and required fields
- **CORS Configuration** - Controlled cross-origin access

---

## 🏗️ Tech Stack

**Frontend:** React, Vite, React Router, TailwindCSS, DaisyUI, Axios, Lucide React

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Upstash Redis

---

## 📂 Project Structure

```
NoteFlix/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server entry point
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── upstash.js         # Rate limiter configuration
│   │   ├── controllers/
│   │   │   ├── authController.js  # Authentication logic
│   │   │   ├── notesController.js # Note CRUD operations
│   │   │   └── userController.js  # User management
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  # JWT verification
│   │   │   └── rateLimiter.js     # Rate limiting
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   └── Note.js            # Note schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   ├── notesRoutes.js     # Note endpoints
│   │   │   └── userRoutes.js      # User endpoints
│   │   └── utils/                 # Database utilities
│   │       ├── viewDatabase.js    # View all users & notes
│   │       ├── cleanupUsers.js    # Find duplicate users
│   │       ├── deleteAllUsers.js  # Delete all users
│   │       └── deleteEverything.js # Delete users & notes
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── favicon.svg            # Custom gradient favicon
    ├── src/
    │   ├── components/            # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   ├── NotesNotfound.jsx
    │   │   ├── RateLimitedUI.jsx
    │   │   ├── ThemeToggle.jsx
    │   │   └── ui/                # UI primitives
    │   │       ├── Button.jsx
    │   │       ├── Card.jsx
    │   │       ├── Input.jsx
    │   │       └── TextArea.jsx
    │   ├── pages/                 # Page components
    │   │   ├── LandingPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── CreatePage.jsx
    │   │   ├── NoteDetailPage.jsx
    │   │   └── auth/
    │   │       ├── LoginPage.jsx
    │   │       └── SignUpPage.jsx
    │   ├── lib/                   # Utilities & context
    │   │   ├── authContext.jsx
    │   │   ├── axios.js
    │   │   └── utils.js
    │   ├── App.jsx                # Route configuration
    │   ├── index.css              # Global styles
    │   └── main.jsx
    ├── tailwind.config.js         # Custom theme config
    └── package.json
```

---

## 🔧 API Endpoints

### **Authentication** (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user account | ❌ |
| POST | `/login` | Authenticate user & get JWT | ❌ |

### **User Management** (`/api/user`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get current user details | ✅ |

### **Notes** (`/api/notes`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all notes for user | ✅ |
| POST | `/` | Create new note | ✅ |
| GET | `/:id` | Get single note by ID | ✅ |
| PUT | `/:id` | Update note by ID | ✅ |
| DELETE | `/:id` | Delete note by ID | ✅ |

---

## 🗄️ Database Models

### **User Model**
```javascript
{
  username: String (unique, required),
  email: String (unique, required, validated),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### **Note Model**
```javascript
{
  user: ObjectId (ref: 'User', required),
  title: String (required),
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Database Utilities

Useful scripts for database management:

```bash
cd backend

# View all users and notes
npm run view-db

# Find duplicate users
npm run cleanup

# Delete all users only
npm run delete-all-users

# Delete everything (users + notes)
npm run delete-everything
```

---