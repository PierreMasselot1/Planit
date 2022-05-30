import { useEffect, useState } from "react";

export function Pomodoro() {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [minutesLeft, setMinutes] = useState<number>(25);
  const [secondsLeft, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      timer();
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  function timer() {
    const curTime = new Date();
    let seconds = Math.floor(
      (25 * 60000 - (curTime.getTime() - startTime.getTime())) / 1000
    );
    let minutes = Math.floor(seconds / 60);

    setMinutes(minutes);
    setSeconds(seconds - minutes * 60);
  }

  function resetTimer() {
    console.log("reset timer");
    setStartTime(new Date());
  }
  return (
    <div>
      <h1 className="underline text-green-300 text-7xl ">Pomodoro</h1>
      <p className="mt-3 text-green-400 text-3xl">Time Left:</p>
      <p className="text-9xl">
        {" "}
        {minutesLeft}:{secondsLeft}
      </p>
      <button onClick={resetTimer}>RESET TIMER</button>
      <p></p>
    </div>
  );
}
