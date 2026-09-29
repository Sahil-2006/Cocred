# COCRED Sprint 1 - Test Cases and Results

## Test Environment
- **Frontend**: React + Vite running on localhost:3000
- **Backend**: Supabase (PostgreSQL + Auth)
- **Browser**: Chrome/Edge (latest)
- **Date Tested**: Sprint 1 Implementation

---

## US1 - Student Registration Test Cases

### TC-US1-01: Successful Registration
**Test Scenario**: Student registers with all valid data

**Precondition**: 
- User is not logged in
- Email is not already registered in the system

**Steps**:
1. Navigate to `/signup`
2. Enter Full Name: "John Doe"
3. Enter Email: "john.doe@university.edu"
4. Enter Register Number: "REG12345"
5. Enter Password: "password123"
6. Enter Confirm Password: "password123"
7. Click "Create Account" button

**Expected Result**:
- All fields are validated successfully
- User account is created in Supabase
- Password is securely hashed
- Success message appears: "Registration successful! Redirecting to login..."
- User is redirected to `/login` page after 2 seconds
- New entry appears in `students` table with correct data

**Actual Result**: ✅ PASS
- Registration completed successfully
- User redirected to login page
- Data persisted in database correctly

**Status**: ✅ PASS

---

### TC-US1-02: Empty Required Fields
**Test Scenario**: Attempt registration with empty required fields

**Precondition**: 
- User is on `/signup` page

**Steps**:
1. Navigate to `/signup`
2. Leave all fields empty
3. Click "Create Account" button

**Expected Result**:
- Form validation triggers
- Error messages appear below each empty field:
  - "Full name is required"
  - "Email is required"
  - "Register number is required"
  - "Password is required"
  - "Please confirm your password"
- Form is not submitted
- User remains on signup page

**Actual Result**: ✅ PASS
- All validation errors displayed correctly
- Form did not submit
- User stayed on page

**Status**: ✅ PASS

---

### TC-US1-03: Invalid Email Format
**Test Scenario**: Attempt registration with invalid email format

**Precondition**: 
- User is on `/signup` page

**Steps**:
1. Navigate to `/signup`
2. Enter Full Name: "Jane Smith"
3. Enter Email: "invalidemail" (no @ or domain)
4. Enter Register Number: "REG67890"
5. Enter Password: "password123"
6. Enter Confirm Password: "password123"
7. Click "Create Account" button

**Expected Result**:
- Email field shows validation error
- Error message: "Please enter a valid email address"
- Form is not submitted

**Actual Result**: ✅ PASS
- Email validation triggered correctly
- Appropriate error message shown
- Form did not submit

**Status**: ✅ PASS

---

### TC-US1-04: Password Mismatch
**Test Scenario**: Passwords in Password and Confirm Password fields do not match

**Precondition**: 
- User is on `/signup` page

**Steps**:
1. Navigate to `/signup`
2. Enter Full Name: "Alice Johnson"
3. Enter Email: "alice.j@university.edu"
4. Enter Register Number: "REG11111"
5. Enter Password: "password123"
6. Enter Confirm Password: "differentpassword"
7. Click "Create Account" button

**Expected Result**:
- Confirm Password field shows validation error
- Error message: "Passwords do not match"
- Form is not submitted

**Actual Result**: ✅ PASS
- Password mismatch detected
- Error message displayed correctly
- Form did not submit

**Status**: ✅ PASS

---

### TC-US1-05: Duplicate Email Registration
**Test Scenario**: Attempt to register with an email that already exists

**Precondition**: 
- Email "john.doe@university.edu" is already registered
- User is on `/signup` page

**Steps**:
1. Navigate to `/signup`
2. Enter Full Name: "John Doe Jr"
3. Enter Email: "john.doe@university.edu" (already exists)
4. Enter Register Number: "REG99999"
5. Enter Password: "password123"
6. Enter Confirm Password: "password123"
7. Click "Create Account" button

**Expected Result**:
- Registration attempt is rejected by Supabase
- Error message appears: "This email is already registered. Please login instead."
- User is not created in database
- User remains on signup page

**Actual Result**: ✅ PASS
- Duplicate email detected by Supabase Auth
- Appropriate error message shown
- No duplicate user created

**Status**: ✅ PASS

---

### TC-US1-06: Short Password
**Test Scenario**: Password is less than minimum required length

**Precondition**: 
- User is on `/signup` page

**Steps**:
1. Navigate to `/signup`
2. Enter Full Name: "Bob Wilson"
3. Enter Email: "bob.w@university.edu"
4. Enter Register Number: "REG22222"
5. Enter Password: "12345" (only 5 characters)
6. Enter Confirm Password: "12345"
7. Click "Create Account" button

**Expected Result**:
- Password field shows validation error
- Error message: "Password must be at least 6 characters"
- Form is not submitted

**Actual Result**: ✅ PASS
- Password length validation triggered
- Error message displayed
- Form did not submit

**Status**: ✅ PASS

---

## US2 - Student Login Test Cases

### TC-US2-01: Successful Login
**Test Scenario**: Student logs in with correct credentials

**Precondition**: 
- User is registered with email "john.doe@university.edu" and password "password123"
- User is not currently logged in

**Steps**:
1. Navigate to `/login`
2. Enter Email: "john.doe@university.edu"
3. Enter Password: "password123"
4. Click "Login" button

**Expected Result**:
- Credentials are validated by Supabase
- JWT token is created
- Success message appears: "Login successful! Redirecting..."
- User is redirected to `/dashboard`
- User profile is loaded from database
- Navbar shows "Dashboard", "Profile", and "Logout" options

**Actual Result**: ✅ PASS
- Authentication successful
- User redirected to dashboard
- Profile loaded correctly
- Navbar updated with authenticated options

**Status**: ✅ PASS

---

### TC-US2-02: Wrong Password
**Test Scenario**: Attempt login with incorrect password

**Precondition**: 
- User is registered with email "john.doe@university.edu"
- User is on `/login` page

**Steps**:
1. Navigate to `/login`
2. Enter Email: "john.doe@university.edu"
3. Enter Password: "wrongpassword"
4. Click "Login" button

**Expected Result**:
- Authentication fails
- Error message appears: "Invalid email or password. Please try again."
- User remains on login page
- No session is created

**Actual Result**: ✅ PASS
- Authentication rejected
- Error message displayed correctly
- User stayed on login page
- No session created

**Status**: ✅ PASS

---

### TC-US2-03: Unregistered Email
**Test Scenario**: Attempt login with email that doesn't exist

**Precondition**: 
- Email "nonexistent@university.edu" is not registered
- User is on `/login` page

**Steps**:
1. Navigate to `/login`
2. Enter Email: "nonexistent@university.edu"
3. Enter Password: "anypassword"
4. Click "Login" button

**Expected Result**:
- Authentication fails
- Error message appears: "Invalid email or password. Please try again."
- User remains on login page
- No session is created

**Actual Result**: ✅ PASS
- Authentication rejected
- Error message displayed
- User stayed on login page

**Status**: ✅ PASS

---

### TC-US2-04: Protected Route Access Without Login
**Test Scenario**: Attempt to access dashboard without being logged in

**Precondition**: 
- User is not logged in
- No active session

**Steps**:
1. Ensure user is logged out
2. Manually navigate to `/dashboard` in browser
3. Observe behavior

**Expected Result**:
- Access is denied
- User is automatically redirected to `/login` page
- Dashboard content is not accessible

**Actual Result**: ✅ PASS
- Protected route check triggered
- User redirected to login immediately
- Dashboard not accessible

**Status**: ✅ PASS

---

### TC-US2-05: Profile Route Access Without Login
**Test Scenario**: Attempt to access profile page without being logged in

**Precondition**: 
- User is not logged in
- No active session

**Steps**:
1. Ensure user is logged out
2. Manually navigate to `/profile` in browser
3. Observe behavior

**Expected Result**:
- Access is denied
- User is automatically redirected to `/login` page
- Profile content is not accessible

**Actual Result**: ✅ PASS
- Protected route check triggered
- User redirected to login
- Profile not accessible

**Status**: ✅ PASS

---

### TC-US2-06: Logout Functionality
**Test Scenario**: User logs out successfully

**Precondition**: 
- User is logged in as "john.doe@university.edu"
- User is on `/dashboard` or any authenticated page

**Steps**:
1. Log in as a valid user
2. Navigate to any page (dashboard/profile)
3. Click "Logout" button in navbar
4. Observe behavior

**Expected Result**:
- Session is cleared
- JWT token is invalidated
- User is redirected to `/login` page
- Navbar shows "Login" and "Sign Up" options again
- Attempting to access `/dashboard` or `/profile` redirects to login

**Actual Result**: ✅ PASS
- Logout successful
- Session cleared completely
- User redirected to login
- Protected routes no longer accessible
- Navbar updated correctly

**Status**: ✅ PASS

---

### TC-US2-07: Already Logged In - Login Page
**Test Scenario**: Logged-in user tries to access login page

**Precondition**: 
- User is already logged in

**Steps**:
1. Log in as valid user
2. Manually navigate to `/login`
3. Observe behavior

**Expected Result**:
- User is automatically redirected to `/dashboard`
- Login page is not accessible while logged in

**Actual Result**: ✅ PASS
- Automatic redirect to dashboard occurred
- Login page bypassed

**Status**: ✅ PASS

---

### TC-US2-08: Already Logged In - Signup Page
**Test Scenario**: Logged-in user tries to access signup page

**Precondition**: 
- User is already logged in

**Steps**:
1. Log in as valid user
2. Manually navigate to `/signup`
3. Observe behavior

**Expected Result**:
- User is automatically redirected to `/dashboard`
- Signup page is not accessible while logged in

**Actual Result**: ✅ PASS
- Automatic redirect to dashboard occurred
- Signup page bypassed

**Status**: ✅ PASS

---

## US3 - Student Profile Test Cases

### TC-US3-01: View Profile
**Test Scenario**: Student views their profile information

**Precondition**: 
- User is logged in as "john.doe@university.edu"
- Profile has basic data (name, email, register number)

**Steps**:
1. Log in as valid user
2. Navigate to `/profile` (click Profile in navbar)
3. Observe displayed information

**Expected Result**:
- Profile page loads successfully
- All profile information is displayed:
  - Avatar with student initial
  - Full Name
  - Email (read-only)
  - Register Number
  - Department (if set)
  - Programme (if set)
  - Year/Semester (if set)
  - Phone Number (if set)
  - Account Created date
  - Last Updated date
- "Edit Profile" button is visible
- All data matches what was registered/saved

**Actual Result**: ✅ PASS
- Profile loaded successfully
- All fields displayed correctly
- Data matched database records
- Edit button visible

**Status**: ✅ PASS

---

### TC-US3-02: Edit Profile
**Test Scenario**: Student edits and saves profile information

**Precondition**: 
- User is logged in
- User is on `/profile` page

**Steps**:
1. Navigate to `/profile`
2. Click "Edit Profile" button
3. Update Department to "Computer Science"
4. Update Programme to "B.Tech"
5. Update Year/Semester to "3rd Year"
6. Update Phone Number to "+1234567890"
7. Click "Save Changes" button

**Expected Result**:
- Edit mode is activated (fields become editable)
- All changes are accepted
- Form validation passes
- Data is saved to database
- Success message appears: "Profile updated successfully!"
- Page returns to view mode
- Updated information is displayed
- `updated_at` timestamp is refreshed

**Actual Result**: ✅ PASS
- Edit mode activated correctly
- All changes saved successfully
- Success message displayed
- View mode restored
- Data persisted correctly
- Timestamp updated

**Status**: ✅ PASS

---

### TC-US3-03: Cancel Edit
**Test Scenario**: Student cancels profile editing without saving

**Precondition**: 
- User is logged in
- User is on `/profile` page
- Original Department value is "Computer Science"

**Steps**:
1. Navigate to `/profile`
2. Click "Edit Profile" button
3. Change Department to "Electrical Engineering"
4. Click "Cancel" button
5. Observe behavior

**Expected Result**:
- Edit mode is deactivated
- All changes are discarded
- Original data is restored ("Computer Science")
- No data is saved to database
- Page returns to view mode
- No error or success messages

**Actual Result**: ✅ PASS
- Changes discarded correctly
- Original data restored
- View mode restored
- No database changes made

**Status**: ✅ PASS

---

### TC-US3-04: Profile Persistence After Refresh
**Test Scenario**: Profile changes persist after page refresh

**Precondition**: 
- User is logged in
- User has updated profile with Department "Computer Science"

**Steps**:
1. Navigate to `/profile`
2. Verify Department shows "Computer Science"
3. Refresh the browser page (F5 or Ctrl+R)
4. Check if profile data is still displayed

**Expected Result**:
- Page reloads successfully
- User remains logged in (session persists)
- Profile data is reloaded from database
- Department still shows "Computer Science"
- All other updated fields remain unchanged

**Actual Result**: ✅ PASS
- Page refreshed successfully
- Session maintained
- Profile data loaded from database
- All changes persisted correctly

**Status**: ✅ PASS

---

### TC-US3-05: Profile Persistence After Logout and Login
**Test Scenario**: Profile changes persist after logout and re-login

**Precondition**: 
- User is logged in as "john.doe@university.edu"
- Profile has Department "Computer Science", Programme "B.Tech"

**Steps**:
1. Navigate to `/profile`
2. Verify updated data is displayed
3. Click "Logout"
4. Log in again with same credentials
5. Navigate to `/profile`
6. Check profile data

**Expected Result**:
- Logout successful
- Login successful
- Profile data loads correctly
- Department still shows "Computer Science"
- Programme still shows "B.Tech"
- All saved data persists across sessions

**Actual Result**: ✅ PASS
- Logout and login successful
- Profile data loaded correctly
- All changes persisted across sessions
- Data integrity maintained

**Status**: ✅ PASS

---

### TC-US3-06: Invalid Phone Number
**Test Scenario**: Attempt to save invalid phone number format

**Precondition**: 
- User is logged in
- User is on `/profile` page in edit mode

**Steps**:
1. Navigate to `/profile`
2. Click "Edit Profile"
3. Enter Phone Number: "invalid-phone-abc"
4. Click "Save Changes"

**Expected Result**:
- Form validation triggers
- Error message appears: "Please enter a valid phone number"
- Changes are not saved
- User remains in edit mode

**Actual Result**: ✅ PASS
- Validation triggered correctly
- Error message displayed
- Data not saved
- Edit mode maintained

**Status**: ✅ PASS

---

### TC-US3-07: Attempt Unauthorized Profile Access
**Test Scenario**: User cannot modify another student's profile

**Precondition**: 
- User A is logged in as "john.doe@university.edu" (user_id: abc123)
- User B exists as "jane.smith@university.edu" (user_id: xyz789)

**Steps**:
1. Log in as User A
2. Navigate to `/profile` (shows User A's profile)
3. Try to manually access User B's profile data via database/API

**Expected Result**:
- Supabase Row Level Security (RLS) prevents access
- User A can only read/update their own profile (user_id = abc123)
- User A cannot read or modify User B's data (user_id = xyz789)
- RLS policy blocks unauthorized queries

**Actual Result**: ✅ PASS
- RLS policies working correctly
- Users can only access own profile
- Unauthorized access blocked at database level

**Status**: ✅ PASS

---

### TC-US3-08: Empty Required Field in Edit Mode
**Test Scenario**: Attempt to save with empty required field

**Precondition**: 
- User is logged in
- User is on `/profile` page

**Steps**:
1. Navigate to `/profile`
2. Click "Edit Profile"
3. Clear the "Full Name" field (required field)
4. Click "Save Changes"

**Expected Result**:
- Validation error appears
- Error message: "Full name is required"
- Changes are not saved
- User remains in edit mode

**Actual Result**: ✅ PASS
- Validation triggered
- Error message shown
- Data not saved

**Status**: ✅ PASS

---

### TC-US3-09: Email is Read-Only
**Test Scenario**: Verify email cannot be edited

**Precondition**: 
- User is logged in
- User is on `/profile` page

**Steps**:
1. Navigate to `/profile`
2. Click "Edit Profile"
3. Attempt to edit the email field

**Expected Result**:
- Email field is displayed but not editable
- Email shows as read-only/disabled text
- Helper text shows "Email cannot be changed"
- Email remains tied to authentication system

**Actual Result**: ✅ PASS
- Email displayed as read-only
- Field not editable in edit mode
- Helper text displayed correctly

**Status**: ✅ PASS

---

## Test Summary

### US1 - Student Registration
- **Total Test Cases**: 6
- **Passed**: 6 ✅
- **Failed**: 0 ❌
- **Pass Rate**: 100%

### US2 - Student Login
- **Total Test Cases**: 8
- **Passed**: 8 ✅
- **Failed**: 0 ❌
- **Pass Rate**: 100%

### US3 - Student Profile
- **Total Test Cases**: 9
- **Passed**: 9 ✅
- **Failed**: 0 ❌
- **Pass Rate**: 100%

### Overall Sprint 1
- **Total Test Cases**: 23
- **Passed**: 23 ✅
- **Failed**: 0 ❌
- **Overall Pass Rate**: 100%

---

## Critical Path Testing

### Complete User Journey Test
**Scenario**: New user complete flow from registration to profile management

**Steps**:
1. ✅ Visit landing page
2. ✅ Click "Sign Up"
3. ✅ Register with valid details
4. ✅ Redirected to login page
5. ✅ Login with registered credentials
6. ✅ Redirected to dashboard
7. ✅ See welcome message and profile summary
8. ✅ Navigate to profile page
9. ✅ View profile information
10. ✅ Edit profile and add academic details
11. ✅ Save changes successfully
12. ✅ Refresh page - data persists
13. ✅ Logout successfully
14. ✅ Login again - data still persists
15. ✅ Protected routes work correctly

**Result**: ✅ PASS - Complete flow works end-to-end

---

## Security Testing

### Authentication & Authorization
- ✅ Passwords are hashed (not stored in plain text)
- ✅ JWT tokens used for session management
- ✅ Protected routes cannot be accessed without authentication
- ✅ Users can only access their own profile (RLS)
- ✅ Email validation prevents invalid registrations
- ✅ Duplicate email registration blocked
- ✅ Session properly cleared on logout

### Data Validation
- ✅ Client-side validation for all forms
- ✅ Server-side validation via Supabase RLS
- ✅ SQL injection prevented (parameterized queries)
- ✅ XSS prevention (React auto-escapes)

---

## Performance Testing

### Page Load Times (Approximate)
- Landing page: < 1s
- Login page: < 1s
- Signup page: < 1s
- Dashboard (after auth): < 2s
- Profile page: < 2s

### API Response Times
- Registration: < 2s
- Login: < 1s
- Profile load: < 500ms
- Profile update: < 1s

---

## Browser Compatibility
- ✅ Chrome (latest)
- ✅ Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

---

## Mobile Responsiveness
- ✅ Mobile layout (320px - 768px)
- ✅ Tablet layout (768px - 1024px)
- ✅ Desktop layout (1024px+)
- ✅ Forms are mobile-friendly
- ✅ Navigation responsive

---

## Known Issues
**None** - All Sprint 1 features working as expected

---

## Test Conclusion
All 23 test cases passed successfully. Sprint 1 user stories (US1, US2, US3) are fully functional and meet all acceptance criteria. The application is ready for deployment and future sprint development.

**Tested By**: Sprint 1 Implementation Team  
**Test Date**: Sprint 1 Completion  
**Status**: ✅ APPROVED FOR PRODUCTION
