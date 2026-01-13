# StoryTrip - Your Journey. Your Story. Your Film.

An AI-powered travel platform that designs away-game trips as narrative adventures, then automatically produces documentary-quality films of your journey.

## Features

- **Narrative-Driven Trip Planning**: Choose from curated story templates (Rivalry Conquest, Family Legacy, etc.)
- **AI-Generated Itineraries**: Get personalized trip itineraries structured as story arcs
- **Real-Time Capture Guidance**: Receive AI prompts during your trip to capture key moments
- **Automatic Documentary Production**: Get a professionally edited film of your journey within 72 hours
- **Full Booking System**: Complete trip booking with flights, hotels, and experiences

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Zustand** for state management
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Axios** for API calls
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcrypt** for password hashing
- **TypeScript** for type safety

## Project Structure

```
StoryTrip/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── common/             # Shared components (Header, Nav, etc.)
│   │   └── booking/            # Booking flow components
│   ├── pages/                  # Route pages
│   │   ├── HomePage.tsx
│   │   ├── StorySelectPage.tsx
│   │   ├── TripDetailsPage.tsx
│   │   ├── LiveCapturePage.tsx
│   │   └── DocumentaryPage.tsx
│   ├── services/               # API service layer
│   ├── store/                  # Zustand stores
│   ├── types/                  # TypeScript types
│   ├── data/                   # Static data (narratives, itineraries)
│   └── App.tsx                 # Main app component
├── server/                      # Backend source
│   ├── controllers/            # Request handlers
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── middleware/             # Express middleware
│   ├── config/                 # Configuration
│   └── index.ts                # Server entry point
├── docs/                        # Project documentation
│   ├── storytrip_concept.md
│   ├── hybrid_concepts.md
│   └── sports_travel_ideas.md
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6+ (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd StoryTrip
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/storytrip
JWT_SECRET=your-secret-key-here
```

### Development

Run both frontend and backend concurrently:
```bash
npm run dev:all
```

Or run separately:

**Frontend only** (http://localhost:3000):
```bash
npm run dev
```

**Backend only** (http://localhost:5000):
```bash
npm run server
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Endpoints

### Trips
- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get trip by ID
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `POST /api/trips/:id/book` - Book a trip

### Narratives
- `GET /api/narratives` - Get all narrative templates
- `GET /api/narratives/:id` - Get specific narrative
- `POST /api/narratives/:id/generate-itinerary` - Generate AI itinerary

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/confirm` - Confirm booking

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Key Components

### Booking Flow
The booking modal (`BookingModal.tsx`) implements a 3-step form:
1. **Traveler Information** - Contact details and party size
2. **Travel Preferences** - Flight times, hotel preferences, room types
3. **Review & Payment** - Summary and payment method selection

Form validation is handled by **Zod** schemas with **React Hook Form**.

### State Management
- **Zustand** store (`tripStore.ts`) manages:
  - Current trip data
  - Selected narrative
  - Game information
  - Booking state

### Routing
React Router handles navigation between:
- `/` - Home page
- `/select-story` - Narrative selection
- `/trip/:narrativeId` - Trip details and itinerary
- `/live/:tripId` - Live capture mode
- `/documentary/:tripId` - Documentary viewer

## Database Models

### User
- name, email, password
- favoriteTeam
- trips[] (references)

### Trip
- userId (reference)
- narrativeId
- gameInfo (embedded)
- itinerary (embedded map)
- status: planning | booked | in-progress | completed
- bookingDetails (embedded)
- captures[] (references)
- documentary (reference)

### Capture
- tripId (reference)
- type: video | photo | audio
- url, timestamp, location
- metadata

### Documentary
- tripId (reference)
- title, duration, status
- versions (full, social, highlight)

## Future Enhancements

- [ ] AI-powered itinerary generation
- [ ] Real-time video capture with mobile app
- [ ] Automatic documentary editing pipeline
- [ ] Payment processing (Stripe)
- [ ] Social sharing features
- [ ] Multi-team support
- [ ] Advanced analytics dashboard
- [ ] Push notifications for story moments

## Contributing

This is a prototype/demo application. For production use, additional features would be needed:
- Authentication middleware
- Input sanitization
- Rate limiting
- Error logging
- File upload handling
- Video processing pipeline

## License

MIT

## Contact

For questions or feedback about this project, please open an issue.
