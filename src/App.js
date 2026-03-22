import { useState, useEffect } from "react";
import * as Sentry from "@sentry/react";
import "./App.css";
import Timer from "./Timer";
import posthog from 'posthog-js';

posthog.init('phc_RfPydQBQG4tPixtYcL0DM23RfrXrWE01EGZsXFK4fPf', {
    api_host: 'https://eu.posthog.com', 
    person_profiles: 'identified_only', 
});

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Enter a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [resetTimer, setResetTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(false); 
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Перевірка прапорця при завантаженні та змінах
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled('show-hint')) { 
        setShowHint(true);
      } else {
        setShowHint(false);
      }
    });
  }, []);

  const throwError = () => {
    Sentry.addBreadcrumb({
      category: "ui",
      message: `User clicked the 'Break the world' button.`,
      level: "info",
    });
    throw new Error("Sentry Test Error: Something went wrong!");
  };
  
  useEffect(() => {
  Sentry.setUser({
    id: "viktoria_777",
    email: "viktoria.dikhtiarenko.pp.2023@lpnu.ua",
    username: "Viktoria",
    segment: "premium_user" 
  });

  posthog.onFeatureFlags(() => {
    if (posthog.isFeatureEnabled('show-hint')) { 
      setShowHint(true);
    } else {
      setShowHint(false);
    }
  });
}, []);

  const checkGuess = () => {
    if (stopTimer) return;

  const number = Number(guess);
    
    if (!number) {
      setMessage("Enter a number!");
      return;
    }

    // 1. Подія: Спроба вгадати (guess_attempted)
    posthog.capture('guess_attempted', {
      value: number,
      attempt_number: attempts + 1
    });

    if (number < 1 || number > 100) {
      setMessage("Number must be between 1 and 100!");
      return;
    }
    if (history.includes(number)) {
      setMessage("You already entered this number, try another!");
      return;
    }

    setAttempts(attempts + 1);
    setHistory([...history, number]);

    if (number > secretNumber) {
      setMessage("Too big!");
    } else if (number < secretNumber) {
      setMessage("Too small!");
    } else {
      setMessage("Correct! 🎉");
      setStopTimer(true); 
      // 2. Подія: Перемога (game_won)
      posthog.capture('game_won', {
        total_attempts: attempts + 1,
        secret_number: secretNumber
      });
    }

    setGuess("");
  };

  const newGame = () => {
      // 3. Подія: Нова гра (game_reset / task_deleted аналог)
      posthog.capture('game_reset', {
        was_finished: stopTimer
      });
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setHistory([]);
    setGuess("");
    setMessage("New game started!");
    setResetTimer(prev => !prev); 
    setStopTimer(false); 
  };
  
  return (
    <div className="App">
      <h1>Guess the Number</h1>
      <p>Current Mode: {process.env.REACT_APP_STATUS}</p>

      {showHint && (
      <div style={{  padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          💡 Hint: The number is {secretNumber % 2 === 0 ? 'Even' : 'Odd'}
        </div>
        )}
        
      {<Timer reset={resetTimer} stop={stopTimer} /> }

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkGuess()}
        placeholder="Enter number"
        disabled={stopTimer} 
      />

      <br />

      <button onClick={checkGuess} disabled={stopTimer}>Check</button>
      <button onClick={newGame}>Again</button>

      <p>{message}</p>
      <p>Attempts: {attempts}</p>
      <p>History: {history.join(", ")}</p>

      <div>
        <button 
          onClick={throwError} 
          style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Break the world 
        </button>
      </div>

    </div>
  );
}

export default App;
