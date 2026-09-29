-- COCRED Database Schema
-- Sprint 1: Student Registration, Login, and Profile Management

-- ============================================
-- STUDENTS TABLE
-- ============================================

-- Create students table
CREATE TABLE IF NOT EXISTS students (
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

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Users can view own profile" ON students;
DROP POLICY IF EXISTS "Users can update own profile" ON students;
DROP POLICY IF EXISTS "Users can insert own profile" ON students;

-- Create policy: Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON students FOR SELECT
  USING (auth.uid() = id);

-- Create policy: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON students FOR UPDATE
  USING (auth.uid() = id);

-- Create policy: Allow insert during registration
CREATE POLICY "Users can insert own profile"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (for re-running this script)
DROP TRIGGER IF EXISTS update_students_updated_at ON students;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES (for better query performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_register_number ON students(register_number);

-- ============================================
-- NOTES
-- ============================================

-- This schema supports:
-- ✅ US1 - Student Registration
-- ✅ US2 - Student Login (uses Supabase auth.users)
-- ✅ US3 - Student Profile Management

-- Security Features:
-- ✅ Row Level Security ensures students can only access their own data
-- ✅ Foreign key relationship with auth.users for authentication
-- ✅ CASCADE DELETE ensures profile is deleted if auth user is deleted

-- Future Sprints will add:
-- - credentials table
-- - qr_codes table
-- - verification_logs table
-- - institutions table
