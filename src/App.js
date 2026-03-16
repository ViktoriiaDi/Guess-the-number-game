import { useState } from "react";
import "./App.css";
import Timer from "./Timer";

function App() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Enter a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [resetTimer, setResetTimer] = useState(false);

  const checkGuess = () => {
    const number = Number(guess);

    if (!number) {
      setMessage("Enter a number!");
      return;
    }

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
      // Тут більше немає setStopTimer(true), тому таймер продовжить рахувати
    }

    setGuess("");
  };

  const newGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setHistory([]);
    setGuess("");
    setMessage("New game started!");
    setResetTimer(prev => !prev);
    // Тут більше немає setStopTimer(false)
  };

  return (
    <div className="App">
      <h1>Guess the Number</h1>
      
      <Timer reset={resetTimer} />

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkGuess()}
        placeholder="Enter number"
      />

      <br />

      <button onClick={checkGuess}>Check</button>
      <button onClick={newGame}>New Game</button>

      <p>{message}</p>
      <p>Attempts: {attempts}</p>
      <p>History: {history.join(", ")}</p>
    </div>
  );
}

export default App;