import React from 'react';
import { useGameStore } from './store/gameStore';
import Welcome from './components/Welcome';
import MainMenu from './components/MainMenu';
import LetterLesson from './components/LetterLesson';
import VowelLesson from './components/VowelLesson';

function App() {
  const { currentState, selectedLetter } = useGameStore();
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];
  const isVowel = selectedLetter && VOWELS.includes(selectedLetter);

  return (
    <div className="min-h-screen bg-gray-100">
      {currentState === 'welcome' && <Welcome />}
      {currentState === 'menu' && <MainMenu />}
      {currentState === 'letter' && !isVowel && <LetterLesson />}
      {currentState === 'letter' && isVowel && <VowelLesson />}
    </div>
  );
}

export default App;