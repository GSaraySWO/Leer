export interface Letter {
  letter: string;
  spanish: string;
  english: string;
  audioEn: string;
  audioEs: string;
  examples: Example[];
}

export interface Example {
  word: {
    es: string;
    en: string;
  };
  image: string;
  audioEn: string;
  audioEs: string;
  syllable: string;
}

export interface UserProgress {
  name: string;
  language: 'en' | 'es';
  completedLetters: string[];
  stars: number;
}

export type GameState = 'welcome' | 'menu' | 'letter' | 'practice';