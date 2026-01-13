import { Router } from 'express';
import * as narrativeController from '../controllers/narrativeController';

export const narrativeRoutes = Router();

// GET /api/narratives - Get all available narratives
narrativeRoutes.get('/', narrativeController.getNarratives);

// GET /api/narratives/:id - Get a specific narrative
narrativeRoutes.get('/:id', narrativeController.getNarrativeById);

// POST /api/narratives/:id/generate-itinerary - Generate itinerary for a narrative
narrativeRoutes.post('/:id/generate-itinerary', narrativeController.generateItinerary);
