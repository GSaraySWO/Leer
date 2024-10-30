import { Example } from '../types/game';

type VowelExamples = {
  [key: string]: Example[];
};

export const vowelExamples: VowelExamples = {
  A: [
    {
      word: 'Árbol',
      translation: 'Tree',
      image: '/src/assets/images/tree.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Agua',
      translation: 'Water',
      image: '/src/assets/images/water.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Avión',
      translation: 'Airplane',
      image: '/src/assets/images/airplane.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Antorcha',
      translation: 'Torch',
      image: '/src/assets/images/torch.jpg',
      audio: '',
      syllable: 'a'
    },
    {
      word: 'Almohada',
      translation: 'Pillow',
      image: '/src/assets/images/pillow.jpg',
      audio: '',
      syllable: 'a'
    }
  ]
};
