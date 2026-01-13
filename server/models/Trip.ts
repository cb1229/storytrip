import mongoose, { Schema, Document } from 'mongoose';

interface IItineraryEvent {
  time: string;
  title: string;
  location: string;
  iconName: string;
  story: string;
  type: 'story' | 'travel' | 'lodging' | 'food' | 'climax';
}

interface IDayItinerary {
  title: string;
  events: IItineraryEvent[];
}

interface IGameInfo {
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  city: string;
}

interface IFlightDetails {
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

interface IHotelDetails {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  price: number;
}

interface IBookingDetails {
  flights?: {
    departure: IFlightDetails;
    return: IFlightDetails;
  };
  hotel?: IHotelDetails;
  estimatedTotal: number;
  daysCount: number;
  nightsCount: number;
}

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  narrativeId: string;
  gameInfo: IGameInfo;
  itinerary: Map<number, IDayItinerary>;
  status: 'planning' | 'booked' | 'in-progress' | 'completed';
  bookingDetails?: IBookingDetails;
  captures: mongoose.Types.ObjectId[];
  documentary?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TripSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    narrativeId: {
      type: String,
      required: [true, 'Narrative ID is required'],
    },
    gameInfo: {
      homeTeam: { type: String, required: true },
      awayTeam: { type: String, required: true },
      date: { type: String, required: true },
      venue: { type: String, required: true },
      city: { type: String, required: true },
    },
    itinerary: {
      type: Map,
      of: {
        title: String,
        events: [
          {
            time: String,
            title: String,
            location: String,
            iconName: String,
            story: String,
            type: {
              type: String,
              enum: ['story', 'travel', 'lodging', 'food', 'climax'],
            },
          },
        ],
      },
      required: true,
    },
    status: {
      type: String,
      enum: ['planning', 'booked', 'in-progress', 'completed'],
      default: 'planning',
    },
    bookingDetails: {
      flights: {
        departure: {
          airline: String,
          flightNumber: String,
          departure: {
            airport: String,
            time: String,
          },
          arrival: {
            airport: String,
            time: String,
          },
          price: Number,
        },
        return: {
          airline: String,
          flightNumber: String,
          departure: {
            airport: String,
            time: String,
          },
          arrival: {
            airport: String,
            time: String,
          },
          price: Number,
        },
      },
      hotel: {
        name: String,
        address: String,
        checkIn: String,
        checkOut: String,
        roomType: String,
        price: Number,
      },
      estimatedTotal: Number,
      daysCount: Number,
      nightsCount: Number,
    },
    captures: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Capture',
      },
    ],
    documentary: {
      type: Schema.Types.ObjectId,
      ref: 'Documentary',
    },
  },
  {
    timestamps: true,
  }
);

export const Trip = mongoose.model<ITrip>('Trip', TripSchema);
