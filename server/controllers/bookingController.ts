import { Request, Response } from 'express';
import { Trip } from '../models/Trip';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      tripId,
      travelers,
      email,
      phone,
      specialRequests,
      departureAirport,
      preferredDepartureTime,
      hotelPreference,
      roomType,
      paymentMethod,
    } = req.body;

    // Calculate pricing based on preferences
    let flightPrice = 450;
    let hotelPrice = 160; // per night

    if (hotelPreference === 'budget') {
      hotelPrice = 120;
    } else if (hotelPreference === 'luxury') {
      hotelPrice = 280;
    }

    if (roomType === 'suite') {
      hotelPrice *= 1.5;
    }

    const totalHotelPrice = hotelPrice * 2; // 2 nights
    const experiencePackage = 77;
    const estimatedTotal = (flightPrice + totalHotelPrice + experiencePackage) * travelers;

    // Create booking details
    const bookingDetails = {
      flights: {
        departure: {
          airline: 'American Airlines',
          flightNumber: 'AA1234',
          departure: {
            airport: departureAirport,
            time: preferredDepartureTime === 'morning' ? '8:00 AM' : preferredDepartureTime === 'afternoon' ? '2:00 PM' : '7:00 PM',
          },
          arrival: {
            airport: 'DFW',
            time: preferredDepartureTime === 'morning' ? '11:30 AM' : preferredDepartureTime === 'afternoon' ? '5:30 PM' : '10:30 PM',
          },
          price: flightPrice,
        },
        return: {
          airline: 'American Airlines',
          flightNumber: 'AA5678',
          departure: {
            airport: 'DFW',
            time: '2:00 PM',
          },
          arrival: {
            airport: departureAirport,
            time: '5:30 PM',
          },
          price: flightPrice,
        },
      },
      hotel: {
        name: hotelPreference === 'luxury' ? 'The Ritz-Carlton Dallas' : hotelPreference === 'mid-range' ? 'Hilton Garden Inn' : 'Holiday Inn Express',
        address: '123 Main St, Dallas, TX',
        checkIn: 'Nov 8, 2024 3:00 PM',
        checkOut: 'Nov 10, 2024 11:00 AM',
        roomType,
        price: totalHotelPrice,
      },
      estimatedTotal,
      daysCount: 3,
      nightsCount: 2,
    };

    // Update trip with booking
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        status: 'booked',
        bookingDetails,
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.status(201).json({
      success: true,
      data: {
        bookingId: trip._id,
        bookingDetails,
        contactInfo: { email, phone },
        specialRequests,
        paymentMethod,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({
      success: true,
      data: {
        bookingId: trip._id,
        bookingDetails: trip.bookingDetails,
        status: trip.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch booking' });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndUpdate(
      id,
      { status: 'booked' },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({
      success: true,
      data: {
        bookingId: trip._id,
        status: trip.status,
        message: 'Booking confirmed successfully',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to confirm booking' });
  }
};
