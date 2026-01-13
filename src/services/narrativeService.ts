import api from './api';
import { GameInfo } from '../types';

export const narrativeService = {
  // Get all narratives
  getNarratives: async () => {
    const response = await api.get('/narratives');
    return response.data;
  },

  // Get narrative by ID
  getNarrativeById: async (narrativeId: string) => {
    const response = await api.get(`/narratives/${narrativeId}`);
    return response.data;
  },

  // Generate itinerary for a narrative
  generateItinerary: async (narrativeId: string, gameInfo: GameInfo) => {
    const response = await api.post(`/narratives/${narrativeId}/generate-itinerary`, {
      gameInfo,
    });
    return response.data;
  },
};
