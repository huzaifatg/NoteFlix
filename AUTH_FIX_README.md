# Authentication Fix & Database Cleanup Guide

## Problem Identified
Your authentication was failing due to **double password hashing**:
- The User model has a `pre('save')` hook that hashes passwords
- The authController was ALSO manually hashing passwords
- Result: Passwords were hashed twice during registration, but only checked once during login

## Fix Applied
✅ Removed manual password hashing from `authController.js`
✅ Now the User model's pre-save hook handles all password hashing (single hash)

## Database Management Scripts

### View Database Contents
```bash
cd backend
npm run view-db
```
This will:
- Show all users in the database
- Show all notes and their owners
- Identify orphaned notes (notes from deleted users)

### Delete Only Users
```bash
cd backend
npm run delete-all-users
```
This will:
- Delete ALL user accounts
- Keep notes in database (creates orphaned notes)

### Delete Everything (Recommended)
```bash
cd backend
npm run delete-everything
```
This will:
- Delete ALL users
- Delete ALL notes
- Complete clean slate

### Check for Duplicates
```bash
cd backend
npm run cleanup
```
This will:
- List all users
- Find duplicate email accounts
- Show which would be kept/deleted

## Understanding Database Connections

**Important**: When you see "Database connection closed" in the terminal, it's ONLY from the utility script, not your main server.

- **Main Backend Server** (`npm run dev`): Keeps connection open continuously
- **Utility Scripts** (`view-db`, `delete-everything`, etc.): Open connection → do work → close connection

These are independent connections. Your backend server continues to work normally after scripts close their connection.

## Testing Steps

After cleanup:
1. Make sure backend server is running (`npm run dev` in backend folder)
2. Go to signup page
3. Create a new account (e.g., `test@test.com` / `12345678`)
4. Try to login with the same credentials
5. Should work perfectly now! ✅

## What Changed in the Code

**Before (authController.js):**
```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt); // ❌ Manual hashing

const user = new User({
    username,
    email: normalizedEmail,
    password: hashedPassword, // ❌ Already hashed
});
```

**After (authController.js):**
```javascript
const user = new User({
    username,
    email: normalizedEmail,
    password: password, // ✅ Plain password - model will hash it
});
```

## Why This Happened

The User model already has this code:
```javascript
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hashing here
    next();
});
```

So when you manually hashed in the controller AND the model hashed again, passwords got double-hashed.

## Available Scripts

- `npm run dev` - Start backend server with nodemon
- `npm run start` - Start backend server (production)
- `npm run view-db` - View all users and notes in database
- `npm run cleanup` - View users and find duplicates
- `npm run delete-all-users` - Delete only users (leaves notes)
- `npm run delete-everything` - Delete users AND notes (complete reset)

## Notes Created
- `backend/src/utils/viewDatabase.js` - View database contents
- `backend/src/utils/cleanupUsers.js` - View and clean duplicates
- `backend/src/utils/deleteAllUsers.js` - Delete all users only
- `backend/src/utils/deleteEverything.js` - Delete users and notes
