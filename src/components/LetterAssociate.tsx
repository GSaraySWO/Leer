import { useState, useEffect, SetStateAction } from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { Example } from '../types/game';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

export default function LetterAssociate() {
    const {selectedLetter, setState, userProgress, setUserProgress } = useGameStore();
    const [selectedSyllable, setSelectedSyllable] = useState<string | null>(null);
    const [examples, setExamples] = useState<Example[]>([]);
    const [loading, setLoading] = useState(true);
    const [correctWord, setCorrectWord] = useState<string | null>(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [currenExample, setCurrentExample] = useState<Example | null>(null);
  
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
            if(selectedLetter === 'A' || selectedLetter === 'E' || selectedLetter === 'I' || selectedLetter === 'O' || selectedLetter === 'U') {
              setExamples(data.vowelExamples[selectedLetter]);
              setCurrentExample(shuffleArray(data.vowelExamples[selectedLetter]));
            }
            else {
              setExamples(data.letterExamples[selectedLetter]);
              setCurrentExample(shuffleArray(data.letterExamples[selectedLetter]));
          }
            
            console.log('currenExample', currenExample);
          } catch (error) {
            console.error('Error loading examples:', error);
          } finally {
            setLoading(false);
          }
        }
      };
      loadExamples();
  
    }, [selectedLetter, userProgress?.language]);
  
    const handleBack = () => {
      setState('menu');
  };
  
  
    const syllables = selectedLetter
      ? VOWELS.map((vowel) => selectedLetter.toLowerCase() + vowel.toLowerCase())
      : [];

    const shuffleArray = (array: Example[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array[0];
      };

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

    const handleSyllableSelect = (selectedSyllable: SetStateAction<string | null>, correctSyllable: string, word: string) => {
        setSelectedSyllable(selectedSyllable);
        let audiofolder = 'silabas_mp3';
        if (userProgress?.language === 'en') {
          audiofolder = 'silabas_mp3';
        }

        const audioFilePath = `../src/assets/audios/${audiofolder}/${selectedSyllable?.toString().toUpperCase()}.mp3`;
        const audio = new Audio(audioFilePath);
        audio.play();
        if (selectedSyllable === correctSyllable) {
            setCorrectWord(word);
            setShowNextButton(true);
        } else {
          setCorrectWord(null);
        }
      };

    const handleNext = () => {
        setShowNextButton(false);
        setCorrectWord(null);
        setSelectedSyllable(null);
        setCurrentExample(shuffleArray([...examples]));
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
              {userProgress?.language === 'en' ? 'Back2' : 'Volver2'}
            </button>
            <div className="flex items-center gap-2 text-white">
              <button onClick={toggleLanguage} className="ml-4 p-2 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                {userProgress?.language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>
          </header>
  
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">
                {selectedLetter}
              </h1>
            </div>
              <div 
                className="space-y-4"
                >
                  {!currenExample && (
                    <div className="text-center text-2xl font-bold text-gray-800">
                      No examples found
                    </div>
                  )

                  }
                { currenExample && (
                  <div                    
                    className="bg-blue-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={currenExample.image}
                      alt={currenExample.word}
                      className="w-full h-48 object-contain"
                    />
                    <div className="flex justify-center items-center">
                        {!showNextButton && syllables.map((syllable) => (
                        <button
                            key={syllable}
                            onClick={() => handleSyllableSelect(syllable, currenExample.syllable, currenExample.word)}
                            style={{
                            margin: '5px',
                            padding: '10px',
                            backgroundColor: selectedSyllable === syllable ? 'lightblue' : 'lightgray',
                            }}
                        >
                            {syllable}
                        </button>
                        ))}
                    </div>
                    {showNextButton && (
                        <div className="text-center mt-4">
                            <button
                                onClick={handleNext}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
                            >
                                {userProgress?.language === 'en' ? 'Next' : 'Siguiente'}
                            </button>
                        </div>
                    )}
                    {correctWord && (
                        <div className="text-center text-green-500 font-bold text-5xl mt-4 mb-4">
                            {correctWord}
                        </div>
                    )}
                  </div>
                )
              }
              </div>
          </div>
        </div>
      </div>
    );
  }