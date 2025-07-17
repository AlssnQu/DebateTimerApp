import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import PreparationScreen from './PreparationScreen';
import DebateTimer from './DebateTimer';

//Tiempos de categorías
const categories = {
  'Categoría A': [
    { label: 'Orador 1 (Proposición)', minutes: 8 },
    { label: 'Orador 1 (Oposición)', minutes: 8 },
    { label: 'Orador 2 (Proposición)', minutes: 8 },
    { label: 'Orador 2 (Oposición)', minutes: 8 },
    { label: 'Orador 3 (Proposición)', minutes: 8 },
    { label: 'Orador 3 (Oposición)', minutes: 8 },
    { label: 'Cierre (Oposición)', minutes: 4 },
    { label: 'Cierre (Proposición)', minutes: 4 },
  ],

  'Categoría B': [
    { label: 'Orador 1 (Proposición)', minutes: 6 },
    { label: 'Orador 1 (Oposición)', minutes: 6 },
    { label: 'Orador 2 (Proposición)', minutes: 6 },
    { label: 'Orador 2 (Oposición)', minutes: 6 },
    { label: 'Orador 3 (Proposición)', minutes: 6 },
    { label: 'Orador 3 (Oposición)', minutes: 6 },
    { label: 'Réplica (Oposición)', minutes: 3 },
    { label: 'Réplica (Proposición)', minutes: 3 },
  ],

  'Parlamento Británico': [
    { label: 'Primer Ministro (Gob. A)', minutes: 7 },
    { label: 'Líder de la Oposición (Opp. A)', minutes: 7 },
    { label: 'Vice Primer Ministro (Gob. A)', minutes: 7 },
    { label: 'Vice Líder de la Oposición (Opp. A)', minutes: 7 },
    { label: 'Extensionista del Gobierno (Gob. B)', minutes: 7 },
    { label: 'Extensionista de la Oposición (Opp. B)', minutes: 7 },
    { label: 'Latigo del Gobierno (Gob. B)', minutes: 7 },
    { label: 'Latigo de la Oposición (Opp. B)', minutes: 7 },
  ],
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('category'); // 'category', 'preparation', 'timer'

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('preparation');
  };

  const handleStartFromPreparation = () => {
    setCurrentScreen('timer');
  };

  const handleSkipPreparation = () => {
    setCurrentScreen('timer');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentScreen('category');
  };

  const handleBackToPreparation = () => {
    setCurrentScreen('preparation');
  };

  return (
    <div className="app-container">
      {currentScreen === 'category' && (
        <CategorySelector
          categories={Object.keys(categories)}
          onSelect={handleCategorySelect}
        />
      )}
      
      {currentScreen === 'preparation' && (
        <PreparationScreen
          category={selectedCategory}
          onStart={handleStartFromPreparation}
          onSkip={handleSkipPreparation}
          onBack={handleBackToCategories}
        />
      )}
      
      {currentScreen === 'timer' && (
        <DebateTimer
          category={selectedCategory}
          times={categories[selectedCategory]}
          onBack={handleBackToPreparation}
        />
      )}
    </div>
  );
}

export default App;