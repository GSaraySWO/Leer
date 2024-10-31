export interface Letter {
  letter: string;
  audio: string;
  examples: Example[];
}

export interface Example {
  word: string;
  translation: string;
  image: string;
  audio: string;
  syllable: string;
}

export interface UserProgress {
  name: string;
  language: 'en' | 'es';
  completedLetters: string[];
  stars: number;
  gameMode: GameMode;
}

export type GameState = 'welcome' | 'menu' | 'letter' | 'practice';

export type GameMode = 'learn' | 'associate' | 'stories';