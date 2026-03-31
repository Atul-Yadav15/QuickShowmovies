# QuickShow 🎬

A full-stack movie ticket booking application built with the MERN stack.

## Live Demo
- Frontend: https://your-frontend.onrender.com
- Backend: https://your-backend.onrender.com

## Features
- 🎥 Browse now playing movies from TMDB
- 🪑 Interactive seat selection
- 💳 Online payment via Stripe
- 🔐 Authentication via Clerk
- ❤️ Favorite movies
- 📋 Booking history
- 👨‍💼 Admin panel to manage shows

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Clerk (Authentication)
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Clerk (Authorization)
- Stripe (Payments)
- Inngest (Background jobs)
- Nodemailer (Emails)

## Project Structure
```
QuickShowMovie/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # All pages
│   │   ├── components/ # Reusable components
│   │   ├── context/    # App context
│   │   └── lib/        # Utility functions
└── server/          # Node.js backend
    ├── controllers/ # Route controllers
    ├── models/      # Mongoose models
    ├── routes/      # API routes
    ├── middleware/  # Auth middleware
    └── configs/     # Database config
```

## Environment Variables

### Frontend (client/.env)
```
VITE_BASE_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CURRENCY=$
```

### Backend (server/.env)
```
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
TMDB_API_KEY=your_tmdb_key
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
FRONTEND_URL=your_frontend_url
```

## Installation

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run server
```

## API Routes

### Shows
- `GET /api/show/all` - Get all shows
- `GET /api/show/:movieId` - Get single show
- `POST /api/show/add` - Add show (admin)

### Bookings
- `POST /api/booking/create` - Create booking
- `GET /api/booking/seats/:showId` - Get occupied seats

### Users
- `GET /api/user/bookings` - Get user bookings
- `GET /api/user/favorites` - Get favorite movies
- `POST /api/user/update-favorite` - Update favorites

### Admin
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/all-shows` - All shows
- `GET /api/admin/all-bookings` - All bookings

## Author
Atul Yadav