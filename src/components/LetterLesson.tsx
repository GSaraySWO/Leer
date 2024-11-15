import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Star, Volume2, ChevronLeft } from 'lucide-react';
import { Example } from '../types/game';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

export default function LetterLesson() {
  const {selectedLetter, setState, userProgress, addStars, addCompletedLetter, setUserProgress } = useGameStore();
  const [selectedSyllable, setSelectedSyllable] = useState<string | null>(null);
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamples = async () => {
      if (selectedLetter) {
        try {
          let data;
          if (userProgress?.language === 'en') {
            data = await import(`../data/letter${selectedLetter}-en-examples.ts`);
          } else {
            data = await import(`../data/letter${selectedLetter}-es-examples.ts`);
          }
          setExamples(data.letterExamples[selectedLetter]);
        } catch (error) {
          console.error('Error loading examples:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadExamples();

  }, [selectedLetter, userProgress?.language]);

  // Handle Android back button
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      if (selectedSyllable) {
        setSelectedSyllable(null);
      } else {
        setState('menu');
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [selectedSyllable, setState]);


  const syllables = selectedLetter
    ? VOWELS.map((vowel) => selectedLetter.toLowerCase() + vowel.toLowerCase())
    : [];
  const currentExamples = examples.filter(
    (example) => !selectedSyllable || example.syllable === selectedSyllable
  );

  const toggleLanguage = () => {
    const newLanguage = userProgress?.language === 'en' ? 'es' : 'en';
    setUserProgress({ 
      ...userProgress, 
      language: newLanguage, 
      completedLetters: userProgress?.completedLetters || [], 
      stars: userProgress?.stars || 0,
      gameMode: userProgress?.gameMode || 'learn'
    });
  };
  
  const handleBack = () => {
    if (selectedSyllable) {
      setSelectedSyllable(null);
      window.history.pushState(null, '', window.location.pathname);
    } else {
      setState('menu');
    }
  };

  const handleComplete = () => {
    if (selectedLetter) {
      addStars(5);
      addCompletedLetter(selectedLetter);
      setState('menu');
    }
  };

  const handleImageSelect = (word: string) => {
    let audiofolder = 'palabras_mp3';
    if (userProgress?.language === 'en') {
      audiofolder = 'words_mp3';
    }

    const audioFilePath = `../src/assets/audios/${audiofolder}/${word}.mp3`;
    const audio = new Audio(audioFilePath);
    audio.play();
  };  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 p-4 overflow-auto">
      <div className="max-w-lg mx-auto">
        <header className="flex justify-between items-center mb-6 sticky top-0 z-10">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
          >
            {selectedSyllable ? <ChevronLeft /> : <ArrowLeft />}
            {userProgress?.language === 'en' ? 'Back' : 'Volver'}
          </button>
          <div className="flex items-center gap-2 text-white">
            <Star fill="currentColor" />
            <span className="text-xl font-bold">{userProgress?.stars || 0}</span>
            <button onClick={toggleLanguage} className="ml-4 p-2 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              {userProgress?.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
              {selectedSyllable ? selectedSyllable.toUpperCase() : selectedLetter}
            </h1>
            {/* <button className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Volume2 size={18} />
              {userProgress?.language === 'en' ? 'Listen' : 'Escuchar'}
            </button> */}
          </div>

          {!selectedSyllable && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {syllables.map((syllable) => (
                <button
                  key={syllable}
                  onClick={() => setSelectedSyllable(syllable)}
                  className="aspect-square rounded-xl bg-purple-100 flex items-center justify-center text-2xl font-bold hover:bg-purple-200 transition-colors relative group"
                >
                  {syllable.toUpperCase()}
                  <Volume2
                    size={14}
                    className="absolute top-1 right-1 text-purple-500"
                  />
                </button>
              ))}
            </div>
          )}

          {selectedSyllable && (
            <div className="space-y-4">
              {currentExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => handleImageSelect(example.word)}
                >
                  <img
                    src={example.image}
                    alt={example.word}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <p className="text-xl font-bold text-center mb-2">
                      {example.word}
                      <span style={{ color: 'gray', marginLeft: '10px' }}>
                        -  {example.translation}
                        </span>
                    </p>
                    {/* <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <Volume2 size={16} />
                      {userProgress?.language === 'en' ? 'Listen' : 'Escuchar'}
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedSyllable && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedSyllable(null)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                {userProgress?.language === 'en'
                  ? 'Back to Syllables'
                  : 'Volver a Sílabas'}
              </button>
            </div>
          )}

          {!selectedSyllable && userProgress && selectedLetter && !userProgress.completedLetters.includes(selectedLetter) && (
            <div className="mt-6 text-center">
              <button
                onClick={handleComplete}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                {userProgress?.language === 'en'
                  ? "I've learned it!"
                  : '¡Lo he aprendido!'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}