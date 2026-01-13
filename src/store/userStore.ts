import { create } from 'zustand';
import { UserStats, Achievement } from '../types';

interface UserStore {
  stats: UserStats;
  addPoints: (points: number) => void;
  unlockAchievement: (achievementId: string) => void;
  recordTrip: (city: string, stadium: string) => void;
  incrementFilms: () => void;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-trip',
    title: 'First Adventure',
    description: 'Complete your first StoryTrip',
    icon: '🎬',
    progress: 0,
    target: 1,
  },
  {
    id: 'road-warrior',
    title: 'Road Warrior',
    description: 'Visit 5 different cities',
    icon: '✈️',
    progress: 0,
    target: 5,
  },
  {
    id: 'stadium-collector',
    title: 'Stadium Collector',
    description: 'Visit 10 different stadiums',
    icon: '🏟️',
    progress: 0,
    target: 10,
  },
  {
    id: 'filmmaker',
    title: 'Master Filmmaker',
    description: 'Create 5 documentaries',
    icon: '🎥',
    progress: 0,
    target: 5,
  },
  {
    id: 'rivalry-expert',
    title: 'Rivalry Expert',
    description: 'Complete 3 Rivalry Conquest trips',
    icon: '⚔️',
    progress: 0,
    target: 3,
  },
  {
    id: 'division-tour',
    title: 'Division Tour',
    description: 'Visit all 4 stadiums in your division',
    icon: '🗺️',
    progress: 0,
    target: 4,
  },
];

export const useUserStore = create<UserStore>((set) => ({
  stats: {
    tripsCompleted: 2,
    filmsCreated: 2,
    citiesVisited: 3,
    stadiumsVisited: ['AT&T Stadium', 'Lambeau Field'],
    totalPoints: 350,
    level: 2,
    achievements: initialAchievements,
  },

  addPoints: (points) =>
    set((state) => {
      const newTotal = state.stats.totalPoints + points;
      const newLevel = Math.floor(newTotal / 200) + 1;
      return {
        stats: {
          ...state.stats,
          totalPoints: newTotal,
          level: newLevel,
        },
      };
    }),

  unlockAchievement: (achievementId) =>
    set((state) => ({
      stats: {
        ...state.stats,
        achievements: state.stats.achievements.map((achievement) =>
          achievement.id === achievementId
            ? { ...achievement, unlockedAt: new Date() }
            : achievement
        ),
      },
    })),

  recordTrip: (_city, stadium) =>
    set((state) => {
      const newCitiesVisited = state.stats.citiesVisited + 1;
      const newStadiumsVisited = [...state.stats.stadiumsVisited, stadium];
      const newTripsCompleted = state.stats.tripsCompleted + 1;

      // Update achievement progress
      const updatedAchievements = state.stats.achievements.map((achievement) => {
        if (achievement.id === 'first-trip') {
          return { ...achievement, progress: newTripsCompleted };
        }
        if (achievement.id === 'road-warrior') {
          return { ...achievement, progress: newCitiesVisited };
        }
        if (achievement.id === 'stadium-collector') {
          return { ...achievement, progress: newStadiumsVisited.length };
        }
        return achievement;
      });

      return {
        stats: {
          ...state.stats,
          tripsCompleted: newTripsCompleted,
          citiesVisited: newCitiesVisited,
          stadiumsVisited: newStadiumsVisited,
          achievements: updatedAchievements,
        },
      };
    }),

  incrementFilms: () =>
    set((state) => {
      const newFilmsCreated = state.stats.filmsCreated + 1;
      const updatedAchievements = state.stats.achievements.map((achievement) =>
        achievement.id === 'filmmaker'
          ? { ...achievement, progress: newFilmsCreated }
          : achievement
      );

      return {
        stats: {
          ...state.stats,
          filmsCreated: newFilmsCreated,
          achievements: updatedAchievements,
        },
      };
    }),
}));
