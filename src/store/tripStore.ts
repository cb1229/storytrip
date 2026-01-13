import { create } from 'zustand';
import { Trip, GameInfo } from '../types';

interface TripStore {
  currentTrip: Trip | null;
  selectedNarrativeId: string | null;
  gameInfo: GameInfo | null;
  setSelectedNarrative: (narrativeId: string) => void;
  setGameInfo: (gameInfo: GameInfo) => void;
  setCurrentTrip: (trip: Trip) => void;
  clearTrip: () => void;
}

export const useTripStore = create<TripStore>((set) => ({
  currentTrip: null,
  selectedNarrativeId: null,
  gameInfo: null,
  setSelectedNarrative: (narrativeId) => set({ selectedNarrativeId: narrativeId }),
  setGameInfo: (gameInfo) => set({ gameInfo }),
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  clearTrip: () => set({ currentTrip: null, selectedNarrativeId: null, gameInfo: null }),
}));
