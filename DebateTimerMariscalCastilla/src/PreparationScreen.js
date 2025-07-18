import React, { useState, useEffect, useRef } from 'react';

function PreparationScreen({ category, onStart, onSkip, onBack }) {
  const [prepTime, setPrepTime] = useState(300); 
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef(null);

  const bellUrl = process.env.PUBLIC_URL + '/campana.mp3';

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const playBell = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      playBell();
    }
  }, [timeLeft, isRunning]);

  const startPreparation = () => {
    setTimeLeft(prepTime);
    setIsRunning(true);
    setIsFinished(false);
  };

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    setPrepTime(value);
    if (!isRunning) {
      setTimeLeft(null);
      setIsFinished(false);
    }
  };

  const timeOptions = [300, 600, 900, 1200]; 

  return (
    <div className="debate-timer-screen debate-mode" style={{ backgroundColor: '#f0f8ff' }}>
      <button className="flecha-btn" onClick={onBack}>&larr;</button>
      
      <header className="main-header">
        <img src={process.env.PUBLIC_URL + '/castillaLogo.png'} alt="Logo" className="logo" />
        <div className="header-buttons">
          <button className="inicio-btn" onClick={() => window.location.reload()}>Inicio</button>
        </div>
      </header>
  
      <div className="preparation-container">
        <h2 className="preparation-title">Preparación para {category}</h2>
        
        {!isRunning && !isFinished && (
          <div className="preparation-setup">
            <div className="time-selector">
              <h3>Selecciona el tiempo de preparación:</h3>
              
              <div className="time-buttons">
                {[300, 600, 900, 1200].map(time => (
                  <button
                    key={time}
                    className={`time-btn ${prepTime === time ? 'active' : ''}`}
                    onClick={() => setPrepTime(time)}
                  >
                    {time / 60} min
                  </button>
                ))}
              </div>
  
              <div className="custom-time">
                <label htmlFor="customTime">O ingresa tiempo personalizado (en minutos):</label>
                <input
                  id="customTime"
                  type="number"
                  min="1"
                  max="60"
                  value={prepTime / 60}
                  onChange={(e) => {
                    const minutes = parseInt(e.target.value, 10);
                    if (!isNaN(minutes)) {
                      setPrepTime(minutes * 60);
                      setTimeLeft(null);
                      setIsFinished(false);
                    }
                  }}
                  className="time-input"
                />
              </div>
            </div>
  
            <div className="preparation-actions">
              <button className="start-prep-btn" onClick={startPreparation}>
                Iniciar Preparación ({formatTime(prepTime)})
              </button>
              <button className="skip-prep-btn" onClick={onSkip}>
                Saltar Preparación
              </button>
            </div>
          </div>
        )}
  
        {isRunning && (
          <div className="preparation-timer">
            <div className="prep-timer-display">
              <div className="prep-timer-label">Tiempo de preparación</div>
              <div className="prep-timer-time">{formatTime(timeLeft)}</div>
            </div>
            
            <div className="preparation-actions">
              <button className="skip-prep-btn" onClick={onSkip}>
                Saltar y Comenzar Debate
              </button>
            </div>
          </div>
        )}
  
        {isFinished && (
          <div className="preparation-finished">
            <div className="prep-finished-message">
              <h3>Tiempo de preparación terminado</h3>
              <p>Presiona "Comenzar Debate" para iniciar el cronómetro</p>
            </div>
            
            <div className="preparation-actions">
              <button className="start-debate-btn" onClick={onStart}>
                Comenzar Debate
              </button>
              <button className="restart-prep-btn" onClick={() => {
                setIsRunning(false);
                setIsFinished(false);
                setTimeLeft(null);
              }}>
                Reiniciar Preparación
              </button>
            </div>
          </div>
        )}
      </div>
  
      <audio ref={audioRef} src={bellUrl} preload="auto" />
    </div>
  );  
}

export default PreparationScreen;