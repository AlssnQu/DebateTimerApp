import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import DebateTimer from './DebateTimer';

//Tiempos de categorías
const categories = {
  'Categoría A': [
    { label: 'Orador 1 (Equipo 1)', minutes: 8 },
    { label: 'Orador 2 (Equipo 1)', minutes: 8 },
    { label: 'Orador 3 (Equipo 1)', minutes: 8 },
    { label: 'Conclusión (Equipo 1)', minutes: 4 },
    { label: 'Orador 1 (Equipo 2)', minutes: 8 },
    { label: 'Orador 2 (Equipo 2)', minutes: 8 },
    { label: 'Orador 3 (Equipo 2)', minutes: 8 },
    { label: 'Conclusión (Equipo 2)', minutes: 4 },
  ],

  'Categoría B': [
    { label: 'Orador 1 (Equipo 1)', minutes: 6 },
    { label: 'Orador 2 (Equipo 1)', minutes: 6 },
    { label: 'Orador 3 (Equipo 1)', minutes: 6 },
    { label: 'Réplica (Equipo 1)', minutes: 3 },
    { label: 'Orador 1 (Equipo 2)', minutes: 6 },
    { label: 'Orador 2 (Equipo 2)', minutes: 6 },
    { label: 'Orador 3 (Equipo 2)', minutes: 6 },
    { label: 'Réplica (Equipo 2)', minutes: 3 },
  ],

  'Parlamento Británico': [
    { label: 'Primer Ministro (Gob. A)', minutes: 7 },
    { label: 'Líder de la Oposición (Opp. A)', minutes: 7 },
    { label: 'Viceministro (Gob. A)', minutes: 7 },
    { label: 'Segundo Opositor (Opp. A)', minutes: 7 },
    { label: 'Miembro de Gobierno (Gob. B)', minutes: 7 },
    { label: 'Miembro de Oposición (Opp. B)', minutes: 7 },
    { label: 'Latigazo de Gobierno (Gob. B)', minutes: 7 },
    { label: 'Latigazo de Oposición (Opp. B)', minutes: 7 },
  ],
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app-container">
      {!selectedCategory ? (
        <CategorySelector
          categories={Object.keys(categories)}
          onSelect={setSelectedCategory}
        />
      ) : (
        <DebateTimer
          category={selectedCategory}
          times={categories[selectedCategory]}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}

export default App;