import api from './api';
import { Trip } from '../types';

export const tripService = {
  // Get all trips
  getTrips: async (userId?: string) => {
    const params = userId ? { userId } : {};
    const response = await api.get('/trips', { params });
    return response.data;
  },

  // Get trip by ID
  getTripById: async (tripId: string) => {
    const response = await api.get(`/trips/${tripId}`);
    return response.data;
  },

  // Create new trip
  createTrip: async (tripData: Partial<Trip>) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  // Update trip
  updateTrip: async (tripId: string, updates: Partial<Trip>) => {
    const response = await api.put(`/trips/${tripId}`, updates);
    return response.data;
  },

  // Delete trip
  deleteTrip: async (tripId: string) => {
    const response = await api.delete(`/trips/${tripId}`);
    return response.data;
  },

  // Book trip
  bookTrip: async (tripId: string, bookingDetails: any) => {
    const response = await api.post(`/trips/${tripId}/book`, bookingDetails);
    return response.data;
  },
};
