import { useEffect, useState } from "react";

const Pomodoro = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState(0);

  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(+timer);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div>
      <h1>Pomodoro</h1>
      <button onClick={start}>start</button>
      <div>{secondsLeft} seconds left</div>
    </div>
  );
};

export default Pomodoro;
