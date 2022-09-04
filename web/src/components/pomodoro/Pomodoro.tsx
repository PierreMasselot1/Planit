import { useEffect, useState } from "react";
export function Pomodoro() {
  const [ellapsedTime, setEllapsedTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(25);
  const [minutesLeft, setMinutes] = useState<number>(25);
  const [secondsLeft, setSeconds] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStatus) {
        setEllapsedTime(ellapsedTime + 100);
      }
      let seconds = Math.floor((timer * 60000 - ellapsedTime) / 1000);
      let minutes = Math.floor(seconds / 60);

      setMinutes(minutes);
      setSeconds(seconds - minutes * 60);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [ellapsedTime, timerStatus, timer]);

  function toggleTimer() {
    setTimerStatus(!timerStatus);
  }

  function changeTimer(time: number) {
    setEllapsedTime(0);
    setTimerStatus(false);
    setTimer(time);
  }
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="underline text-green-300 text-7xl ">Pomodoro</h1>
        <p className="mt-3 text-green-400 text-3xl">Time Left:</p>
        <div className="flex flex-row text-white">
          <div className="flex text-3xl">{minutesLeft} min&nbsp;</div>
          <div className="flex text-3xl"> {secondsLeft} sec</div>
        </div>
      </div>
      <div className="space-y-14 mt-10 text-white">
        <button onClick={toggleTimer}>PLAY/PAUSE</button>
        <br />
        <br />
        <button onClick={() => changeTimer(5)}>5 MINUTES</button>
        <br />
        <button onClick={() => changeTimer(25)}>25 MINUTES</button>
      </div>
    </div>
  );
}