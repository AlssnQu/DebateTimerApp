import React, { useState, useRef, useEffect } from 'react';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const bellUrl = process.env.PUBLIC_URL + '/campana.mp3';

function DebateTimer({ category, times, onBack }) {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [current, setCurrent] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const [savedTimes, setSavedTimes] = useState(Array(times.length).fill(null));
  const audioRef = useRef(null);

  const currentDuration = times[current].minutes * 60;
  const label = times[current].label.toLowerCase();

  const isConclusion = label.includes('conclusión') || label.includes('réplica');

  const playBell = (repeat = 1) => {
    if (!audioRef.current) return;
    audioRef.current.loop = false;
    let count = 0;
    const play = () => {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      count++;
      if (count < repeat) setTimeout(play, 3000);
    };
    play();
  };

  const stopBell = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.loop = false;
      audioRef.current.currentTime = 0;
    }
  };

  // Color de fondo
  useEffect(() => {
    let color = '#ffffff';
    if (isConclusion) {
      color = '#d2eaff'; // Azul para conclusiones/réplicas
    } else {
      if (elapsed < 60) color = '#FFC488';
      else if (elapsed === 60) color = '#8FEE9E';
      else if (elapsed > 60 && elapsed < currentDuration - 60) color = '#8FEE9E';
      else if (elapsed === currentDuration - 60) color = '#FFC488';
      else if (elapsed > currentDuration - 60 && elapsed < currentDuration) color = '#FFC488';
      else if (elapsed === currentDuration) color = '#CA6B75';
      else if (elapsed >= currentDuration) color = '#CA6B75';
    }
    setBgColor(color);
  }, [elapsed, currentDuration, isConclusion]);

  //Alertas
  useEffect(() => {
    if (!running || isConclusion) return;

    const overTime = elapsed - currentDuration;

    if (elapsed === 60 || elapsed === currentDuration - 60 || elapsed === currentDuration) {
      playBell(1);
    }

    if (elapsed === currentDuration + 15) {
      playBell(2);
    }

    if (overTime > 15 && overTime % 10 === 0) {
      playBell(2);
    }

  }, [elapsed, running, currentDuration, isConclusion]);

  useEffect(() => {
    if (!running || finished) return;
    const timer = setTimeout(() => setElapsed(e => e + 1), 1000);
    return () => clearTimeout(timer);
  }, [elapsed, running, finished]);

  useEffect(() => {
    stopBell();
    if (savedTimes[current] !== null) {
      setElapsed(savedTimes[current]);
      setFinished(true);
    } else {
      setElapsed(0);
      setFinished(false);
    }
  }, [current]);

  const handleNext = () => {
    if (current < times.length - 1) {
      stopBell();
      setCurrent(current + 1);
      setRunning(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      stopBell();
      setCurrent(current - 1);
      setRunning(true);
    }
  };

  const handlePause = () => setRunning(r => !r);

  const handleFinish = () => {
    const updated = [...savedTimes];
    updated[current] = elapsed;
    setSavedTimes(updated);
    setFinished(true);
    stopBell();
  };

  const handleReset = () => {
    stopBell();
    const updated = [...savedTimes];
    updated[current] = null;
    setSavedTimes(updated);
    setElapsed(0);
    setFinished(false);
    setRunning(true);
  };

  let timerClass = 'timer';
  if (finished) timerClass += ' timer-alert';

  return (
    <div className="debate-timer-screen debate-mode" style={{ backgroundColor: bgColor }}>
      <button className="flecha-btn" onClick={onBack}>&larr;</button>
      <h2>{category}</h2>
      <header className="main-header">
        <img src={process.env.PUBLIC_URL + '/gelicichLogoGrande.png'} alt="Logo" className="logo" />
        <div className="header-buttons">
          <button className="inicio-btn" onClick={() => window.location.reload()}>Inicio</button>
        </div>
      </header>
      <div className="timer-section">
        <div className={timerClass}>
          <span className="timer-label">{times[current].label}</span>
          <span className="timer-time">
            {formatTime(elapsed)}
            {elapsed > currentDuration && (
              <span className="extra-time"> &nbsp;(+{formatTime(elapsed - currentDuration)})</span>
            )}
          </span>
        </div>
        <audio ref={audioRef} src={bellUrl} preload="auto" />
        <div className="timer-controls">
          <button onClick={handlePrev} disabled={current === 0}>&larr;</button>
          <button onClick={handlePause}>{running ? 'Pausar' : 'Reanudar'}</button>
          <button onClick={handleFinish}>Finalizar turno</button>
          <button onClick={handleReset}>Reiniciar</button>
          <button onClick={handleNext} disabled={current === times.length - 1}>&rarr;</button>
        </div>
        <div className="slider-section">
          <input type="range" min={0} max={times.length - 1} value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
          <div className="slider-labels">
            {times.map((t, i) => (
              <span key={i} className={i === current ? 'active' : ''}>{i + 1}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebateTimer;
