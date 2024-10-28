import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Globe2, PlayCircle } from 'lucide-react';

export default function Welcome() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const { setUserProgress, setState } = useGameStore();

  const handleStart = () => {
    if (name.trim()) {
      setUserProgress({
        name: name.trim(),
        language,
        completedLetters: [],
        stars: 0,
      });
      setState('menu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 transform hover:scale-105 transition-transform">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Learning Adventure!
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Choose your language
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  language === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Globe2 size={20} />
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  language === 'es'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Globe2 size={20} />
                Español
              </button>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayCircle size={24} />
            {language === 'en' ? "Let's Play!" : '¡Vamos a Jugar!'}
          </button>
        </div>
      </div>
    </div>
  );
}