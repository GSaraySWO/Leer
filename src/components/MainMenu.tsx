import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Star, Award } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function MainMenu() {
  const { userProgress, setState, setSelectedLetter, setUserProgress } = useGameStore();

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setState('letter');
  };

  const toggleLanguage = () => {
    const newLanguage = userProgress?.language === 'en' ? 'es' : 'en';
    setUserProgress({ ...userProgress, language: newLanguage });
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 p-4 overflow-auto">
      <div className="max-w-lg mx-auto">
        <header className="flex justify-between items-center mb-6 bg-white/90 rounded-xl p-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">
            {userProgress?.language === 'en' ? 'Welcome' : 'Bienvenido'},{' '}
            <span className="text-blue-600">{userProgress?.name}</span>!
          </h1>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" fill="currentColor" />
            <span className="text-xl font-bold">{userProgress?.stars || 0}</span>
            <button onClick={toggleLanguage} className="ml-4 p-2 bg-gray-200 rounded">
              {userProgress?.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-3">
          {ALPHABET.map((letter) => {
            const completed = userProgress?.completedLetters.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl font-bold transition-all transform active:scale-95 relative ${
                  completed
                    ? 'bg-green-400 text-white'
                    : 'bg-white text-gray-800 hover:bg-blue-50'
                } shadow-lg`}
              >
                {letter}
                {completed && (
                  <Award
                    size={14}
                    className="absolute top-1 right-1 text-yellow-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}