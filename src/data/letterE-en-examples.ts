import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  E: [
    {
      word: 'Elephant',
      translation: 'Elefante',
      image: 'https://images.unsplash.com/photo-1612552674774-4b65c7e08f81',
      audio: '',
      syllable: 'e'
    },
    {
      word: 'Egg',
      translation: 'Huevo',
      image: 'https://images.unsplash.com/photo-1603112029644-3cb4b2ef1f7d', 
      audio: '',
      syllable: 'e'
    },
    {
      word: 'Eagle',
      translation: 'Águila',
      image: 'https://images.unsplash.com/photo-1588050318243-1b4749f27031',
      audio: '',
      syllable: 'e'
    },
    {
      word: 'Earth',
      translation: 'Tierra',
      image: 'https://images.unsplash.com/photo-1556110823-23e546e4e405',
      audio: '',
      syllable: 'e'
    },
    {
      word: 'Envelope',
      translation: 'Sobre',
      image: 'https://images.unsplash.com/photo-1523401024460-00bcb0864738',
      audio: '',
      syllable: 'e'
    }
  ]
};
