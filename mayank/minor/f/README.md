# React + Vite Frontend for Research App

This is a minimal React + Vite frontend scaffold ready to connect to the backend described in your API documentation. It implements:

- Email check (debounced)
- Sign up (email-register)
- OTP verification (email-register/otp-verification?token=...)
- Sign in (signin)
- Check-token (protected routes)
- Submit research query (chat/query)
- Fetch chat history (chat/fetch-all-chat)
- Export PDF (export/{conversationId})

By default the frontend expects the backend API root at `/app/api`. You can change this using the Vite env variable VITE_API_BASE.

Quick start:
1. npm install
2. npm run dev
3. Open http://localhost:5173

Environment:
- Node 18+
- npmhttps://github.com/KunalKR01/Backend.git

Notes:
- All authenticated requests use credentials: 'include' so cookies (JWT) set by backend will be sent.
- The components handle basic validation and display field errors returned by the API.