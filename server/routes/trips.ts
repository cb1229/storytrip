import { Router } from 'express';
import * as tripController from '../controllers/tripController';

export const tripRoutes = Router();

// GET /api/trips - Get all trips for a user
tripRoutes.get('/', tripController.getTrips);

// GET /api/trips/:id - Get a specific trip
tripRoutes.get('/:id', tripController.getTripById);

// POST /api/trips - Create a new trip
tripRoutes.post('/', tripController.createTrip);

// PUT /api/trips/:id - Update a trip
tripRoutes.put('/:id', tripController.updateTrip);

// DELETE /api/trips/:id - Delete a trip
tripRoutes.delete('/:id', tripController.deleteTrip);

// POST /api/trips/:id/book - Book a trip
tripRoutes.post('/:id/book', tripController.bookTrip);
