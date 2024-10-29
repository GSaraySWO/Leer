import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  A: [
    {
      word: 'Apple',
      image: '/src/assets/images/apple.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Ant',
      image: '/src/assets/images/ant.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Arrow',
      image: '/src/assets/images/arrow.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Astronaut',
      image: '/src/assets/images/astronaut.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Airplane',
      image: '/src/assets/images/airplane.jpg',
      audio: '',
      syllable: 'a'
    }
  ]
};