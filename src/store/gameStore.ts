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
  currentState: (localStorage.getItem('currentState') as GameState) || 'welcome',
  userProgress: localStorage.getItem('userProgress') ? JSON.parse(localStorage.getItem('userProgress') as string) : { name: '', language: 'en' as 'en', stars: 0, completedLetters: [] },
  selectedLetter: localStorage.getItem('selectedLetter') || null,
  setState: (state) => {
    localStorage.setItem('currentState', state);
    set({ currentState: state });
  },
  setUserProgress: (progress) => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
    set({ userProgress: progress });
  },  
  setSelectedLetter: (letter) => {
    if (letter !== null) {
      localStorage.setItem('selectedLetter', letter);
    } else {
      localStorage.removeItem('selectedLetter');
    }
    set({ selectedLetter: letter });
  },

  addCompletedLetter: (letter) =>
    set((state) => {
      const updatedProgress = state.userProgress
        ? {
            ...state.userProgress,
            completedLetters: [...state.userProgress.completedLetters, letter],
          }
        : { completedLetters: [letter], name: '', language: 'en' as 'en', stars: 0 };
      
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      return { userProgress: updatedProgress };
    }),

  addStars: (amount) =>
    set((state) => {
      const updatedProgress = state.userProgress
        ? {
            ...state.userProgress,
            stars: state.userProgress.stars + amount,
          }
        : { stars: amount, completedLetters: [], name: '', language: 'en' as 'en' };
      
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      return { userProgress: updatedProgress };
    }),
}));