import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';

export const bookingRoutes = Router();

// POST /api/bookings - Create a new booking
bookingRoutes.post('/', bookingController.createBooking);

// GET /api/bookings/:id - Get booking details
bookingRoutes.get('/:id', bookingController.getBookingById);

// PUT /api/bookings/:id/confirm - Confirm a booking
bookingRoutes.put('/:id/confirm', bookingController.confirmBooking);
