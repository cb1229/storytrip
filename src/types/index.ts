export interface Narrative {
  id: string;
  title: string;
  tagline: string;
  color: string;
  desc: string;
  iconName: string;
}

export interface ItineraryEvent {
  time: string;
  title: string;
  location: string;
  iconName: string;
  story: string;
  type: 'story' | 'travel' | 'lodging' | 'food' | 'climax';
}

export interface DayItinerary {
  title: string;
  events: ItineraryEvent[];
}

export interface Trip {
  _id?: string;
  userId: string;
  narrativeId: string;
  gameInfo: GameInfo;
  itinerary: Record<number, DayItinerary>;
  status: 'planning' | 'booked' | 'in-progress' | 'completed';
  bookingDetails?: BookingDetails;
  captures?: Capture[];
  documentary?: Documentary;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GameInfo {
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  city: string;
}

export interface BookingDetails {
  flights?: {
    departure: FlightDetails;
    return: FlightDetails;
  };
  hotel?: HotelDetails;
  estimatedTotal: number;
  daysCount: number;
  nightsCount: number;
}

export interface FlightDetails {
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  price: number;
}

export interface HotelDetails {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  price: number;
}

export interface Capture {
  id: string;
  tripId: string;
  type: 'video' | 'photo' | 'audio';
  url: string;
  timestamp: Date;
  location?: {
    lat: number;
    lng: number;
  };
  metadata?: Record<string, any>;
}

export interface Documentary {
  id: string;
  tripId: string;
  title: string;
  duration: string;
  status: 'processing' | 'ready';
  versions: {
    full: string;
    social: string;
    highlight: string;
  };
  createdAt: Date;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  favoriteTeam?: string;
  trips?: string[];
  createdAt?: Date;
}

export interface PastTrip {
  id: string;
  title: string;
  date: string;
  team: string;
  result: string;
  thumbnail: string;
  status: 'ready' | 'processing';
}

export interface UpcomingGame {
  opponent: string;
  date: string;
  location: string;
}

// Form types
export interface BookingFormData {
  travelers: number;
  email: string;
  phone: string;
  specialRequests?: string;
  // Flight preferences
  departureAirport: string;
  preferredDepartureTime: 'morning' | 'afternoon' | 'evening';
  // Hotel preferences
  hotelPreference: 'budget' | 'mid-range' | 'luxury';
  roomType: 'single' | 'double' | 'suite';
  // Payment
  paymentMethod: 'card' | 'paypal';
}

// Timeline and Progress
export interface TripTimeline {
  tripId: string;
  gameDate: Date;
  status: 'upcoming' | 'in-progress' | 'completed' | 'processing-documentary';
  daysUntilTrip: number;
  milestones: TimelineMilestone[];
}

export interface TimelineMilestone {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: 'booking' | 'departure' | 'arrival' | 'game' | 'return' | 'documentary';
}

// Social and Sharing
export interface TripInvitation {
  id: string;
  tripId: string;
  invitedBy: string;
  invitedEmail: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: Date;
}

export interface ShareContent {
  type: 'trip' | 'documentary' | 'itinerary';
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

// Gamification
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
}

export interface UserStats {
  tripsCompleted: number;
  filmsCreated: number;
  citiesVisited: number;
  stadiumsVisited: string[];
  totalPoints: number;
  level: number;
  achievements: Achievement[];
}

// Live Game Integration
export interface GameScore {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: string;
  timeRemaining: string;
  status: 'scheduled' | 'in-progress' | 'final';
}

export interface GameEvent {
  type: 'touchdown' | 'field-goal' | 'turnover' | 'halftime' | 'final';
  team: string;
  description: string;
  timestamp: Date;
  suggestedPrompt?: string;
}

// Weather and Alerts
export interface WeatherForecast {
  city: string;
  date: string;
  temp: number;
  condition: string;
  icon: string;
  precipitation: number;
  wind: number;
}

export interface TravelAlert {
  id: string;
  type: 'flight-delay' | 'weather' | 'traffic' | 'recommendation' | 'reminder';
  severity: 'info' | 'warning' | 'urgent';
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  timestamp: Date;
}

// Enhanced Booking History
export interface BookingHistory {
  id: string;
  tripTitle: string;
  narrativeType: string;
  gameInfo: GameInfo;
  confirmationNumber: string;
  bookedAt: Date;
  travelers: number;
  total: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDetails: BookingDetails;
}
