import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  A: [
    {
      word: 'Apple',
      translation: 'Manzana',
      image: '/src/assets/images/apple.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Ant',
      translation: 'Hormiga',
      image: '/src/assets/images/ant.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Arrow',
      translation: 'Flecha',
      image: '/src/assets/images/arrow.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Astronaut',
      translation: 'Astronauta',
      image: '/src/assets/images/astronaut.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Airplane',
      translation: 'Avion',
      image: '/src/assets/images/airplane.jpg',
      audio: '',
      syllable: 'a'
    }
  ]
};