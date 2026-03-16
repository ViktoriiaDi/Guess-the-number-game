import React, { useState } from "react";
import "./App.css";


function App() {
 const [secretNumber, setSecretNumber] = useState(
   Math.floor(Math.random() * 100) + 1
 );
 const [guess, setGuess] = useState("");
 const [message, setMessage] = useState("Try to guess the number!");
 const [attempts, setAttempts] = useState(0);
 const [history, setHistory] = useState([]);


 const checkGuess = () => {
   const num = Number(guess);


   if (!num) {
     setMessage("Enter a number!");
     return;
   }


   if (num < 1 || num > 100) {
     setMessage("Number must be between 1 and 100!");
     return;
   }


   if (history.includes(num)) {
     setMessage("This number was already guessed, try another!");
     return;
   }


   setAttempts(attempts + 1);
   setHistory([...history, num]);


   if (num > secretNumber) {
     setMessage("Too big!");
   } else if (num < secretNumber) {
     setMessage("Too small!");
   } else {
     setMessage("Correct! 🎉");
   }
 };


 const newGame = () => {
   setSecretNumber(Math.floor(Math.random() * 100) + 1);
   setGuess("");
   setMessage("New game started!");
   setAttempts(0);
   setHistory([]);
 };


 const handleKeyPress = (e) => {
   if (e.key === "Enter") {
     checkGuess();
   }
 };


 return (
   <div className="App">
     <h1>Guess the Number B-Dev</h1>
     <input
       type="number"
       value={guess}
       onChange={(e) => setGuess(e.target.value)}
       onKeyPress={handleKeyPress}
       placeholder="Enter a number 1-100"
     />
     <button onClick={checkGuess}>Check</button>
     <button onClick={newGame}>New Game</button>
     <p>{message}</p>
     <p>Attempts: {attempts}</p>
     <p>History: {history.join(", ")}</p>
   </div>
 );
}


export default App;
