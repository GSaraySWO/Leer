import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  I: [
    {
      word: 'Igloo',
      translation: 'Iglú',
      image: 'https://images.unsplash.com/photo-1582691817210-89b3d3a9e74e',
      audio: '',
      syllable: 'i'
    },
    {
      word: 'Insect',
      translation: 'Insecto',
      image: 'https://images.unsplash.com/photo-1580828449736-006b57c53fc0',
      audio: '',
      syllable: 'i'
    },
    {
      word: 'Island',
      translation: 'Isla',
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      audio: '',
      syllable: 'i'
    },
    {
      word: 'Ice Cream',
      translation: 'Helado',
      image: 'https://images.unsplash.com/photo-1511515091329-4787930bcb8f',
      audio: '',
      syllable: 'i'
    },
    {
      word: 'Ink',
      translation: 'Tinta',
      image: 'https://images.unsplash.com/photo-1555334985-19675e8b6a2a',
      audio: '',
      syllable: 'i'
    }
  ]
};
