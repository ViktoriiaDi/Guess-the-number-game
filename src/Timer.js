import { useState, useEffect } from "react";
function Timer({ reset, stop }) {
 const [seconds, setSeconds] = useState(0);
 useEffect(() => {
   setSeconds(0);
 }, [reset]);
 useEffect(() => {
   if (stop) return;
   const interval = setInterval(() => {
     setSeconds(prev => prev + 1);
   }, 1000);
   return () => clearInterval(interval);
 }, [stop]);
 return <p>Time: {seconds}s</p>;
}
export default Timer;