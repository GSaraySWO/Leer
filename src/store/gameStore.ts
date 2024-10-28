import { create } from 'zustand';
import { UserProgress, GameState } from '../types/game';

interface GameStore {
  currentState: GameState;
  userProgress: UserProgress | null;
  selectedLetter: string | null;
  setState: (state: GameState) => void;
  setUserProgress: (progress: UserProgress) => void;
  setSelectedLetter: (letter: string | null) => void;
  addCompletedLetter: (letter: string) => void;
  addStars: (amount: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentState: 'welcome',
  userProgress: null,
  selectedLetter: null,
  setState: (state) => set({ currentState: state }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  addCompletedLetter: (letter) =>
    set((state) => ({
      userProgress: state.userProgress
        ? {
            ...state.userProgress,
            completedLetters: [...state.userProgress.completedLetters, letter],
          }
        : null,
    })),
  addStars: (amount) =>
    set((state) => ({
      userProgress: state.userProgress
        ? {
            ...state.userProgress,
            stars: state.userProgress.stars + amount,
          }
        : null,
    })),
}));