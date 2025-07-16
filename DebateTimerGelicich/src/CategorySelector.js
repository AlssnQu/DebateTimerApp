import React from 'react';
import './styles.css';

function CategorySelector({ categories, onSelect }) {
  const handleReload = () => window.location.reload();

  return (
    <div className="category-selector-grid">
      <header className="main-header">
        <img src={process.env.PUBLIC_URL + '/gelicichLogoGrande.png'} alt="Logo" className="logo" />
        <button className="inicio-btn" onClick={handleReload}>Inicio</button>
      </header>

      <div className="main-container">
        <div className="intro-box-flip">
          <div className="flip-inner">
            <div className="flip-front">
              <img src={process.env.PUBLIC_URL + '/gelicichLogoGrande.png'} alt="Logo completo" className="logo-grande" />
            </div>
            <div className="flip-back">
              <img src={process.env.PUBLIC_URL + '/gelicichLogoGrande.png'} alt="Logo pequeño" className="logo-pequeno" />
              <h1>Cronómetro de Debate</h1>
              <p>Control de tiempo visual y auditivo para 3 categorías de debate.</p>
            </div>
          </div>
        </div>

        <div className="categories-grid">
          <div className="category-card pb" onClick={() => onSelect('Parlamento Británico')}>
            <h2>Parlamento Británico</h2>
            <div className="tooltip">
              8 oradores <br /> 7 min por turno<br /> Tiempo total: 56 min
            </div>
          </div>

          <div className="category-card a" onClick={() => onSelect('Categoría A')}>
            <h2>Categoría A</h2>
            <div className="tooltip">
              3 oradores + conclusión <br /> 8 min c/u + 4 min <br /> Por equipo (2 equipos)
            </div>
          </div>

          <div className="category-card b" onClick={() => onSelect('Categoría B')}>
            <h2>Categoría B</h2>
            <div className="tooltip">
              3 oradores + réplica <br /> 6 min c/u + 3 min <br /> Por equipo (2 equipos)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySelector;
