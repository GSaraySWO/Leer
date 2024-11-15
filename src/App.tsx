import { useGameStore } from './store/gameStore';
import Welcome from './components/Welcome';
import MainMenu from './components/MainMenu';
import MainMenuAssociate from './components/MainMenuAssociate';
import LetterLesson from './components/LetterLesson';
import VowelLesson from './components/VowelLesson';
import LetterAssociate from './components/LetterAssociate';

function App() {
  const { currentState, selectedLetter, userProgress } = useGameStore();
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];
  const isVowel = selectedLetter && VOWELS.includes(selectedLetter);

  return (
    <div className="min-h-screen bg-gray-100">
      {currentState === 'welcome' && <Welcome />}
      {currentState === 'menu' && userProgress?.gameMode === 'learn' && <MainMenu />}
      {currentState === 'menu' && userProgress?.gameMode === 'associate' && <MainMenuAssociate />}
      {currentState === 'letter' && !isVowel && userProgress?.gameMode === 'learn' && <LetterLesson />}
      {currentState === 'letter' && userProgress?.gameMode === 'associate' && <LetterAssociate />}
      {currentState === 'letter' && isVowel && userProgress?.gameMode === 'learn' && <VowelLesson />}
      {/* {currentState === 'letter' && !isVowel && userProgress?.gameMode === 'associate' && <LetterAssociate />} */}
    </div>
  );
}

export default App;