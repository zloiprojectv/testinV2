import { useState, useEffect } from 'react';

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      <div className="button-group">
        <button 
          className="meditation-button" 
          onClick={() => startTimer(1)}
          disabled={isActive}
        >
          1 мин
        </button>
        <button 
          className="meditation-button" 
          onClick={() => startTimer(5)}
          disabled={isActive}
        >
          5 мин
        </button>
      </div>
    </div>
  );
};

export default MeditationTimer;