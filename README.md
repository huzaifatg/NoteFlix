# 📝 NoteFlix

> A modern, full-stack note-taking application built with the MERN stack, featuring a beautiful gradient UI, real-time search, and secure authentication.

![NoteFlix Banner](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Custom Gradient Theme** - Professional blue-to-purple gradient design system
- **Modern Typography** - Inter font family for clean, readable text
- **Smooth Animations** - Floating cards, hover effects, and transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Custom Branding** - Gradient favicon and BookText icon throughout

### 📚 **Core Functionality**
- **Create & Manage Notes** - Rich text input with large, comfortable fields
- **Real-time Search** - Instantly filter notes by title or content
- **Smart Sorting** - Sort by most recent, oldest, or alphabetical order
- **Quick Actions** - Edit and delete notes with hover actions
- **Empty States** - Helpful prompts when no notes are found

### 🔐 **Security & Authentication**
- **JWT Authentication** - Secure token-based user sessions (7-day expiry)
- **Password Hashing** - bcrypt with 10 salt rounds
- **Protected Routes** - Middleware-based API and frontend route protection
- **Rate Limiting** - Upstash Redis limiting (100 requests/60s)

### 🎯 **User Experience**
- **Landing Page** - Stunning marketing page with animated features showcase
- **Dashboard Stats** - Quick overview of total notes and weekly activity
- **Toast Notifications** - Beautiful feedback for all user actions
- **Loading States** - Animated spinners for better perceived performance
- **Gradient Buttons** - Consistent, eye-catching call-to-action elements

---

## 🏗️ Tech Stack

### **Frontend**
- **React 19** - Latest React with modern hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing with protected routes
- **TailwindCSS 3.4** - Utility-first CSS framework
- **DaisyUI 4.12** - Component library with custom "noteflix" theme
- **Axios** - Promise-based HTTP client
- **React Hot Toast** - Toast notification system
- **Lucide React** - Modern icon library

### **Backend**
- **Node.js & Express** - RESTful API server
- **MongoDB & Mongoose** - NoSQL database with ODM
- **JWT** - JSON Web Tokens for stateless authentication
- **bcrypt** - Secure password hashing
- **Upstash Redis** - Serverless rate limiting
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting for React
- **PostCSS & Autoprefixer** - CSS processing

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
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/            # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   └── ui/                # UI primitives
    │   ├── pages/                 # Page components
    │   │   ├── LandingPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── CreatePage.jsx
    │   │   ├── NoteDetailPage.jsx
    │   │   └── auth/
    │   ├── lib/                   # Utilities & context
    │   │   ├── authContext.jsx
    │   │   ├── axios.js
    │   │   └── utils.js
    │   └── App.jsx                # Route configuration
    └── package.json
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or Atlas cluster)
- Upstash Redis account (free tier available)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/huzaifatg/NoteFlix.git
   cd NoteFlix
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (backend + frontend)
   npm run build
   ```

3. **Set up environment variables**

   Create `.env` file in the `backend/` directory:
   ```env
   # MongoDB
   MONGO_URI=your_mongodb_connection_string
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key
   
   # Server
   PORT=5001
   NODE_ENV=development
   
   # Upstash Redis
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Run the application**

   **Development mode** (separate terminals):
   ```bash
   # Terminal 1 - Backend (port 5001)
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend (port 5173)
   cd frontend
   npm run dev
   ```
   
   **Production mode**:
   ```bash
   # Build frontend
   npm run build
   
   # Start server (serves frontend + API)
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173` (development)
   - Backend API: `http://localhost:5001/api`

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

## 🎨 Design System

### **Color Palette**
- **Primary:** Blue (#3B82F6) - Trust, professionalism
- **Secondary:** Purple (#8B5CF6) - Creativity, modern
- **Accent:** Cyan (#06B6D4) - Highlights
- **Gradients:** Blue-to-purple transitions

### **Typography**
- **Font Family:** Inter (Google Fonts)
- **Font Smoothing:** Enabled for crisp rendering

### **Components**
- **Buttons:** Gradient backgrounds with hover effects
- **Cards:** White backgrounds with subtle shadows
- **Note Cards:** Gradient left border (blue → indigo → purple)
- **Inputs:** Blue focus rings with smooth transitions

---

## 🔐 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Authentication** - 7-day token expiry
- ✅ **Protected Routes** - Middleware verification on API and frontend
- ✅ **Rate Limiting** - 100 requests per 60 seconds via Upstash Redis
- ✅ **Input Validation** - Email format validation, required fields
- ✅ **CORS Configuration** - Controlled cross-origin access

---

## 📸 Screenshots

<!-- Add screenshots here when available -->
_Coming soon: Landing page, Dashboard, Note detail, and mobile views_

---

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist/` folder
3. Set environment variables (API base URL)

### **Backend (Render/Railway/Heroku)**
1. Set `NODE_ENV=production`
2. Configure environment variables
3. Deploy from `backend/` directory
4. Ensure MongoDB and Upstash are accessible

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Huzaifa**
- GitHub: [@huzaifatg](https://github.com/huzaifatg)
- Repository: [NoteFlix](https://github.com/huzaifatg/NoteFlix)

---

## 🙏 Acknowledgments

- React team for React 19
- TailwindCSS for the amazing utility framework
- Upstash for serverless Redis
- MongoDB for the flexible database
- All open-source contributors

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
