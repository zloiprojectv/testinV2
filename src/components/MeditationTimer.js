import { useState, useEffect } from 'react';

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsPaused(false);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  const startTimer = (minutes) => {
    const timeInSeconds = minutes * 60;
    setInitialTime(timeInSeconds);
    setTimeLeft(timeInSeconds);
    setIsActive(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsPaused(false);
  };

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

      {/* Кнопки выбора времени */}
      {!isActive && (
        <div className="button-group">
          <button 
            className="meditation-button" 
            onClick={() => startTimer(1)}
          >
            1 мин
          </button>
          <button 
            className="meditation-button" 
            onClick={() => startTimer(5)}
          >
            5 мин
          </button>
        </div>
      )}

      {/* Кнопки управления таймером */}
      {isActive && (
        <div className="controls">
          <button 
            className="control-button" 
            onClick={isPaused ? resumeTimer : stopTimer}
          >
            {isPaused ? 'Продолжить' : 'Стоп'}
          </button>
          <button 
            className="control-button reset-button" 
            onClick={resetTimer}
          >
            Сброс
          </button>
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;