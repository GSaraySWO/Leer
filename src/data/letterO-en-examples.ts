import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  O: [
    {
      word: 'Octopus',
      translation: 'Pulpo',
      image: 'https://images.unsplash.com/photo-1614850575119-dfef29f7cd8c',
      audio: '',
      syllable: 'o'
    },
    {
      word: 'Orange',
      translation: 'Naranja',
      image: 'https://images.unsplash.com/photo-1579621976861-2241e4c903fc',
      audio: '',
      syllable: 'o'
    },
    {
      word: 'Owl',
      translation: 'Búho',
      image: 'https://images.unsplash.com/photo-1606329088568-df388d24c4ef',
      audio: '',
      syllable: 'o'
    },
    {
      word: 'Oregano',
      translation: 'Orégano',
      image: 'https://images.unsplash.com/photo-1589927554898-4382b12a2304',
      audio: '',
      syllable: 'o'
    },
    {
      word: 'Ocean',
      translation: 'Océano',
      image: 'https://images.unsplash.com/photo-1537888399181-5c3a2b7f0c69',
      audio: '',
      syllable: 'o'
    }
  ]
};
