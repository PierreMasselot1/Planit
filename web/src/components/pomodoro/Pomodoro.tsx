import React from "react";
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
      if (ellapsedTime >= timer * 60000) {
        setTimerStatus(false);
      } else {
        setMinutes(minutes);
        setSeconds(seconds - minutes * 60);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [ellapsedTime, timerStatus, timer]);

  function resetTimer() {
    setTimerStatus(false);
    setEllapsedTime(0);
  }

  function toggleTimer() {
    setTimerStatus(!timerStatus);
  }

  function changeTimer(time: number) {
    setEllapsedTime(0);
    setTimerStatus(false);
    setTimer(time);
  }
  return (
    <div className=" flex flex-auto bg-gray-700 rounded-lg mr-2 my-3 p-2 text-white flex-col justify-center text-center">
      <h1 className="text-teal-500 text-7xl lg:text-8xl ">Pomodoro</h1>
      <div className="">
        <p
          className={`text-9xl lg:text-[200px]  mb-5${
            minutesLeft === 0 && secondsLeft === 0 ? "animate-pulse" : ""
          }`}
        >
          {" "}
          {minutesLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {secondsLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        <div className="flex-row justify-center lg:text-3xl">
          <button onClick={toggleTimer} className="mx-2">
            {timerStatus ? "PAUSE" : "PLAY"}
          </button>
          <button onClick={resetTimer} className="mx-2">
            {" "}
            RESET TIMER{" "}
          </button>
          <button onClick={() => changeTimer(5)} className="mx-2">
            5 MINUTES
          </button>
          <button onClick={() => changeTimer(25)} className="mx-2">
            25 MINUTES
          </button>
        </div>
      </div>
    </div>
  );
}
