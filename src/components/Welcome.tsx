import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Globe2, PlayCircle } from 'lucide-react';
//import soundFile from '../assets/audios/WhispersOfTheSky.mp3';

export default function Welcome() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const { setUserProgress, setState } = useGameStore();
  const [gameMode, setGameMode] = useState<'learn' | 'associate' | 'stories'>('learn');

  const handleStart = () => {
    setUserProgress({
      language,
      completedLetters: [],
      stars: 0,
      gameMode: gameMode // Use the selected game mode
    });
    setState('menu');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const SoundComponent = () => {
    useEffect(() => {
      // const audio = new Audio("/src/assets/audios/WhispersOfTheSky.mp3");
      const audio = new Audio('../src/assets/audios/WhispersOfTheSky.mp3');
      audio.loop = true;  // Set the audio to loop
      audio.volume = 0.5; // Set the audio volume
      audio.play();
  
      // Clean up the sound on component unmount
      return () => {
        audio.pause();
        audio.currentTime = 0; // Reset the audio
      };
    })};  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 transform hover:scale-105 transition-transform">
        <div>
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {language === 'en' ? "Learning Adventure!" : '¡Vamos a Aprender!'}</h1>        
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
            {language === 'en' ? "Choose your language" : 'Selecciona tu idioma'}
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

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {language === 'en' ? "Choose your game mode" : 'Selecciona tu modo de juego'}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setGameMode('learn')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  gameMode === 'learn'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Learn' : 'Aprender'}
              </button>
              <button
                onClick={() => setGameMode('associate')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  gameMode === 'associate'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Associate' : 'Asociar'}
              </button>
              {/* <button
                onClick={() => setGameMode('stories')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  gameMode === 'stories'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? 'Stories' : 'Historias'}
              </button> */}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <PlayCircle size={24} />
            {language === 'en' ? "Let's Play!" : '¡Vamos a Jugar!'}
          </button>
        </div>
      </div>
    </div>
  );
}