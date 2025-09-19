🔐 Authentication Project (Summary)

We built a complete authentication system step by step with React frontend + Express backend + MongoDB + JWT.
Here’s everything in detail:

1️⃣ Backend Setup

Installed dependencies:

npm install express mongoose bcryptjs jsonwebtoken cors dotenv nodemon


server.js:

Configured Express.

Connected MongoDB with Mongoose.

Enabled cors() so frontend (http://localhost:3000) can talk to backend (http://localhost:5000).

Started server on port 5000.

2️⃣ User Model (MongoDB + Mongoose)

Fields:

email (unique, required).

password (hashed before saving).

Used bcryptjs to hash passwords automatically before saving with pre('save').

3️⃣ Signup API

Route: POST /api/auth/signup

Validates:

Email not already registered.

Password strength (alphanumeric, at least 8 chars).

Hashes password with bcrypt.

Saves user in DB.

Response: { message: "User created successfully" }.

4️⃣ Login API

Route: POST /api/auth/login

Validates email + password.

Compares raw password with hashed password (bcrypt.compare).

If valid → creates JWT token signed with JWT_SECRET.

Response:

{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": "mongoId", "email": "user@email.com" }
}

5️⃣ JWT Middleware

Middleware authMiddleware:

Extracts token from Authorization: Bearer <token>.

Verifies token with jwt.verify.

If valid → attaches req.user with { id, email }.

Else → returns 401 Unauthorized.

6️⃣ Validate Token API

Route: GET /api/auth/validate

Uses authMiddleware.

Returns:

{ "valid": true, "user": { "id": "xxx", "email": "xxx@email.com" } }


This is used by frontend to check if token in localStorage is still valid.

7️⃣ Frontend Setup

React app with React Router v6.

Installed dependencies:

npm install axios react-toastify react-router-dom bootstrap

8️⃣ Signin Component

UI:

Inputs for email, password.

Checkbox: enables the Login button.

Submit button turns blue only if checkbox is checked.

Logic:

Calls POST /api/auth/login.

If success → saves token in localStorage + redirects to /home.

Toastify used for success/error messages.

9️⃣ Signup Component

UI matches Signin page (Bootstrap form).

Inputs: email, password.

Calls POST /api/auth/signup.

Shows success/error with Toastify.

🔟 Protected Routes (React Router)

Created ProtectedRoute component:

Checks if token exists in localStorage.

Calls backend /validate API to confirm token validity.

If valid → render child route (like /home).

If invalid → redirect to /signin.

So /home is accessible only to logged-in users with valid JWT.

1️⃣1️⃣ Navbar with Logout

Added Bootstrap Navbar.

If logged in:

Show Logout button.

On click → remove token from localStorage + redirect to /signin.

If logged out:

Show links to Signin and Signup.

1️⃣2️⃣ Forget + Reset Password Flow

Added Forgot Password link on Signin page.

Forgot Password API (/api/auth/forgot-password):

Takes email.

Generates token (crypto.randomBytes).

Saves reset token in DB.

(Normally sends email with reset link).

Reset Password API (/api/auth/reset-password/:token):

Validates token.

Allows user to set a new password (hashed before saving).

React pages:

ForgotPassword.js → asks for email.

ResetPassword.js → asks for new password when user opens link /reset-password/:token.

🚀 Features We Have Now

✅ User Signup (with hashed password)
✅ User Login (JWT token generated)
✅ JWT token stored in localStorage
✅ Token validation with backend
✅ Protected routes (only logged-in users allowed)
✅ Navbar with Logout
✅ Forgot & Reset Password flow
✅ Toastify notifications for feedback
✅ React Router v6 navigation

👉 So in short:
We built a full authentication system with signup, login, JWT token storage, protected routes, logout, and reset password, using MERN stack + JWT in a secure and scalable way.

