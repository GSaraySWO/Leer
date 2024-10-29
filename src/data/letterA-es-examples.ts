import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  A: [
    {
      word: 'Árbol',
      image: '/src/assets/images/tree.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Agua',
      image: '/src/assets/images/water.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Avión',
      image: '/src/assets/images/airplane.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Antorcha',
      image: '/src/assets/images/torch.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Almohada',
      image: '/src/assets/images/pillow.jpg',
      audio: '',
      syllable: 'a'
    }
  ]
};
