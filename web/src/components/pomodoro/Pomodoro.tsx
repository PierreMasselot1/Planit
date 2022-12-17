import { useEffect, useState } from "react";
import Button from "../Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

const CircularTimer = ({
  timeLeft,
  minutes,
  seconds,
  pulse = false,
}: {
  timeLeft: number;
  minutes: string;
  seconds: string;
  pulse?: boolean;
}) => {
  // map to 70% of circumference
  if (timeLeft === undefined || timeLeft < 0) timeLeft = 0;
  timeLeft = timeLeft * 0.7;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - timeLeft * circumference;

  return (
    <svg className="relative h-3/6 mx-auto" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="grey"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - 0.7 * circumference}
        transform="rotate(145 50 50)"
        className={`${pulse ? "animate-pulse" : ""}`}
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        stroke="white"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(145 50 50)"
        className={`${pulse ? "animate-pulse" : ""}`}
      />

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        className={`${pulse ? "animate-pulse" : ""}`}
      >
        {minutes}:{seconds}
      </text>
    </svg>
  );
};

const PlayPauseResetButton = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  className,
}: {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {isPlaying ? (
        <button
          onClick={onPause}
          className="text-white hover:text-gray-900 focus:outline-none  focus:text-gray-900 text-4xl"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="text-white hover:text-gray-900 focus:outline-none focus:text-gray-900 text-4xl"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button
        onClick={onReset}
        className="ml-2 text-white hover:text-gray-900 focus:outline-none focus:text-gray-900 text-4xl"
      >
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export function Pomodoro() {
  const [ellapsedTime, setEllapsedTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(25);
  const [minutesLeft, setMinutes] = useState<number>(25);
  const [secondsLeft, setSeconds] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<boolean>(false);

  const refreshInterval = 100;
  useEffect(() => {
    const interval = setInterval(() => {
      if (ellapsedTime >= timer * 60000) {
        setTimerStatus(false);
        return;
      }
      if (timerStatus) {
        setEllapsedTime(ellapsedTime + refreshInterval);
      }
      let seconds = Math.floor((timer * 60000 - ellapsedTime) / 1000);
      let minutes = Math.floor(seconds / 60);

      setMinutes(minutes);
      setSeconds(seconds - minutes * 60);
    }, refreshInterval);

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
      <div className="">
        <CircularTimer
          timeLeft={(timer * 60000 - ellapsedTime) / (timer * 60000)}
          minutes={minutesLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          seconds={secondsLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          pulse={minutesLeft === 0 && secondsLeft === 0}
        />
        <PlayPauseResetButton
          isPlaying={timerStatus}
          onPause={toggleTimer}
          onPlay={toggleTimer}
          onReset={resetTimer}
          className="mx-auto flex flex-row justify-center mb-2"
        />
        <div className="flex-row justify-center lg:text-3xl">
          <Button onClick={() => changeTimer(0.1)} className="mx-2">
            6 SECONDS
          </Button>
          <Button onClick={() => changeTimer(5)} className="mx-2">
            5 MINUTES
          </Button>
          <Button onClick={() => changeTimer(25)} className="mx-2">
            25 MINUTES
          </Button>
        </div>
      </div>
    </div>
  );
}
