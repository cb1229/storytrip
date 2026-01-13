import api from './api';
import { BookingFormData } from '../types';

export const bookingService = {
  // Create booking
  createBooking: async (tripId: string, bookingData: BookingFormData) => {
    const response = await api.post('/bookings', {
      tripId,
      ...bookingData,
    });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (bookingId: string) => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  },

  // Confirm booking
  confirmBooking: async (bookingId: string) => {
    const response = await api.put(`/bookings/${bookingId}/confirm`);
    return response.data;
  },
};
