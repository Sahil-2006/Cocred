# COCRED - Digital Credential Management Platform

COCRED is a secure, blockchain-powered platform for managing and verifying academic credentials. This repository contains the Sprint 1 implementation focusing on core student account functionality.

## 🎯 Sprint 1 Objective

Implement core student account functionality including registration, login, and profile management.

## 📋 Sprint 1 User Stories

### ✅ US1 – Student Registration
**As a Student**, I want to create an account using my basic details so that I can access the COCRED platform.

**Branch**: `us1-student-registration`

**Status**: ✅ Implemented

### 🔄 US2 – Student Login
**As a Student**, I want to securely log in using my email and password so that I can access my account.

**Branch**: `us2-student-login`

**Status**: 🔄 In Progress

### 📝 US3 – Student Profile
**As a Student**, I want to view and edit my profile so that my personal and academic information can be stored and managed.

**Branch**: `us3-student-profile`

**Status**: ⏳ Pending

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Custom mint/green theme** - Following COCRED design system

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication with JWT
  - Row Level Security (RLS)
  - Serverless functions

### Deployment
- **Vercel** - Frontend hosting
- **Supabase Cloud** - Backend and database hosting

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/Sahil-2006/Cocred.git
cd Cocred
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to be provisioned (~2 minutes)

#### Create Database Table

Run this SQL in the Supabase SQL Editor (Database → SQL Editor → New Query):

```sql
-- Create students table
CREATE TABLE students (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  register_number TEXT NOT NULL,
  department TEXT,
  programme TEXT,
  year_or_semester TEXT,
  phone_number TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON students FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON students FOR UPDATE
  USING (auth.uid() = id);

-- Allow insert during registration
CREATE POLICY "Users can insert own profile"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Get API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy the following:
   - Project URL
   - `anon` `public` key

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **IMPORTANT**: Never commit the `.env` file to Git!

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment to Vercel

### Deploy Frontend

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy using Vercel CLI:
```bash
vercel
```

Or push to GitHub and import the repository in Vercel Dashboard.

3. Add environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## 📱 Sprint 1 Demo Flow

### Current Working Flow (US1 Completed)

1. **Landing Page** (`/`)
   - View platform features
   - Navigate to Signup or Login

2. **Student Registration** (`/signup`) ✅
   - Fill registration form
   - Validate all required fields
   - Check email format
   - Verify password match
   - Prevent duplicate email registration
   - Secure password hashing (handled by Supabase Auth)
   - Success message and redirect to login

3. **Login** (`/login`) 🔄
   - Coming in US2

4. **Dashboard** (`/dashboard`) 🔄
   - Coming in US2

5. **Profile** (`/profile`) ⏳
   - Coming in US3

## 🌿 Branch Structure

```
main (stable, production-ready)
├── us1-student-registration (Student Registration)
├── us2-student-login (Student Login & Auth)
└── us3-student-profile (Student Profile Management)
```

### Branch Workflow

1. **US1** (`us1-student-registration`)
   - Implemented student registration
   - Form validation
   - Duplicate prevention
   - Merged to `main` after testing

2. **US2** (`us2-student-login`)
   - Will implement login functionality
   - Session management
   - Protected routes
   - Logout

3. **US3** (`us3-student-profile`)
   - Will implement profile view/edit
   - Profile persistence
   - Access control

## 🧪 Testing

### Manual Testing Checklist

#### US1 - Student Registration

**Test Case 1: Successful Registration**
- Navigate to `/signup`
- Fill all required fields with valid data
- Click "Create Account"
- Verify success message appears
- Verify redirect to login page

**Test Case 2: Empty Required Fields**
- Navigate to `/signup`
- Leave fields empty and click "Create Account"
- Verify error messages appear for all required fields

**Test Case 3: Invalid Email Format**
- Navigate to `/signup`
- Enter invalid email (e.g., "notanemail")
- Verify email validation error appears

**Test Case 4: Password Mismatch**
- Navigate to `/signup`
- Enter different passwords in Password and Confirm Password
- Verify "Passwords do not match" error appears

**Test Case 5: Duplicate Email**
- Navigate to `/signup`
- Register with email that already exists
- Verify duplicate email error message

**Test Case 6: Short Password**
- Navigate to `/signup`
- Enter password with less than 6 characters
- Verify password length error appears

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (Supabase Auth)
- ✅ JWT-based authentication
- ✅ Row Level Security (RLS) in database
- ✅ Environment variables for sensitive data
- ✅ `.env` excluded from Git
- ✅ Input validation and sanitization
- ✅ Protected routes (requires authentication)
- ✅ HTTPS enforced in production

## 📂 Project Structure

```
cocred/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── ProtectedRoute.jsx   # Route protection HOC
│   ├── contexts/
│   │   └── AuthContext.jsx      # Authentication context & logic
│   ├── pages/
│   │   ├── LandingPage.jsx      # Home page
│   │   ├── SignupPage.jsx       # ✅ US1 - Registration
│   │   ├── LoginPage.jsx        # 🔄 US2 - Login
│   │   ├── DashboardPage.jsx    # 🔄 US2 - Dashboard
│   │   └── ProfilePage.jsx      # ⏳ US3 - Profile
│   ├── utils/
│   │   └── supabase.js          # Supabase client
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # This file
```

## 🎨 Design System

### Colors
- **Primary Mint**: `#5DBEA3`
- **Primary Green**: `#4CAF93`
- **Dark**: `#2C5F4F`

### Component Classes
- `btn-primary` - Primary action button (mint background)
- `btn-secondary` - Secondary action button (white background)
- `input-field` - Form input styling
- `card` - Content card container

## 🐛 Known Issues

None currently. Report issues on GitHub.

## 📝 Todos

- [ ] Implement US2 - Student Login
- [ ] Implement US3 - Student Profile
- [ ] Add comprehensive unit tests
- [ ] Add E2E tests with Playwright
- [ ] Add profile image upload
- [ ] Email verification flow
- [ ] Password reset functionality

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👥 Authors

- Sprint 1 Implementation - COCRED Team

## 🔗 Links

- [GitHub Repository](https://github.com/Sahil-2006/Cocred)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Sprint 1 Status**: US1 ✅ | US2 🔄 | US3 ⏳

Last Updated: Sprint 1 - US1 Complete
