import { useEffect } from 'react';
import MeditationTimer from './components/MeditationTimer';
import './App.css';

function App() {
  useEffect(() => {
    // Настройка Telegram Web App
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // Полноэкранный режим
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧘 Медитация</h1>
        <MeditationTimer />
      </header>
    </div>
  );
}

export default App;