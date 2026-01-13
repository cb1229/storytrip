# StoryTrip Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Or use MongoDB Atlas** (cloud):
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 3. Run the Application
```bash
npm run dev:all
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## What You'll See

### Frontend (Port 3000)
A mobile phone mockup showing the StoryTrip interface:
- **Home**: Browse past trips and upcoming games
- **Story Selection**: Choose your narrative (Rivalry Conquest, Family Legacy, etc.)
- **Trip Details**: View AI-generated itinerary with story moments
- **Booking Flow**: Complete 3-step booking form with validation
- **Live Capture**: Camera interface with story prompts
- **Documentary**: View finished films

### Backend API (Port 5000)
RESTful API with these endpoints:
- `/api/health` - Health check
- `/api/trips` - Trip management
- `/api/narratives` - Story templates
- `/api/bookings` - Booking system
- `/api/users` - User authentication

## Testing the Booking Flow

1. Click "New Story" on the home page
2. Select any narrative template
3. View the generated itinerary
4. Click "Book This Story"
5. Fill out the 3-step form:
   - **Step 1**: Contact information
   - **Step 2**: Travel preferences (flights, hotel, room type)
   - **Step 3**: Review pricing & payment
6. Submit to see the booking confirmed

The form includes real validation with Zod schemas!

## Project Structure Overview

```
StoryTrip/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/        # UI components
│   ├── pages/            # Route pages
│   ├── services/         # API clients
│   ├── store/            # Zustand state
│   ├── types/            # TypeScript types
│   └── data/             # Static data
│
├── server/                # Backend (Express + MongoDB)
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   └── middleware/      # Express middleware
│
└── docs/                 # Concept documents
```

## Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router, Zustand
- **Forms**: React Hook Form + Zod validation
- **Backend**: Express, MongoDB, Mongoose, JWT
- **Build**: Vite

## Environment Variables

The `.env` file is already set up with defaults:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/storytrip
JWT_SECRET=storytrip-secret-key-change-in-production
```

## Common Commands

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev:all

# Run frontend only
npm run dev

# Run backend only
npm run server

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### MongoDB Connection Error
**Error**: "Failed to connect to MongoDB"

**Solution**:
- Ensure MongoDB is running: `brew services start mongodb-community`
- Or update `.env` with MongoDB Atlas connection string

### Port Already in Use
**Error**: "Port 3000 or 5000 already in use"

**Solution**:
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or change the port in `.env` (backend) or `vite.config.ts` (frontend)

### TypeScript Errors
**Error**: Module not found or type errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Now that you have the app running:

1. **Explore the UI**: Click through all the screens
2. **Test the Booking**: Complete a full booking flow
3. **Check the API**: Visit http://localhost:5000/api/health
4. **Review the Code**: Start with `src/App.tsx` and `server/index.ts`
5. **Customize**: Add your own narrative templates or modify the itinerary

## Architecture Highlights

### Frontend
- **Routing**: React Router with clean URL structure
- **State**: Zustand for lightweight state management
- **Forms**: React Hook Form with Zod schemas for validation
- **Styling**: Tailwind CSS with custom gradient designs
- **API Layer**: Axios with interceptors for auth

### Backend
- **RESTful API**: Express with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt
- **Validation**: Express validator middleware
- **Error Handling**: Centralized error handler

### Key Features
1. **Narrative-Driven Planning**: Choose story templates
2. **Smart Itineraries**: AI-structured trip plans with story beats
3. **Real Booking Flow**: Multi-step forms with validation
4. **Capture Mode**: UI for recording trip moments
5. **Documentary Viewer**: Display finished films

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **TypeScript**: Full type safety across the stack
- **API Testing**: Use the `/api/health` endpoint to verify backend
- **Database**: Use MongoDB Compass to view your data
- **Debugging**: Check browser console and terminal logs

## What's Working vs. What's Mocked

### ✅ Fully Functional
- Complete UI with all screens
- React Router navigation
- Booking form with validation
- Backend API endpoints
- Database models
- State management
- API service layer

### 🔄 Mocked/Demo Data
- AI itinerary generation (uses sample data)
- Video capture (UI only)
- Documentary production (placeholder)
- Payment processing (no actual charges)
- User authentication (basic JWT, no email verification)

## Production Considerations

To make this production-ready, you'd need:
- [ ] Email verification
- [ ] Password reset flow
- [ ] Real payment integration (Stripe)
- [ ] File upload for captures
- [ ] Video processing pipeline
- [ ] AI itinerary generation (GPT-4 integration)
- [ ] Push notifications
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] Security headers
- [ ] Logging & monitoring

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Express.js Guide](https://expressjs.com/)

---

**Ready to start building?** Run `npm run dev:all` and open http://localhost:3000! 🚀
