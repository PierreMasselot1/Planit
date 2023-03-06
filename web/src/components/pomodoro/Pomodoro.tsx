import { useEffect, useState } from "react";
import Button from "../Common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

const CircularTimer = ({
  timeLeft,
  minutes,
  seconds,
  pulse = false,
  className = "",
  timerStatus,
  toggleTimer,
  resetTimer,
}: {
  timeLeft: number;
  minutes: string;
  seconds: string;
  pulse?: boolean;
  className?: string;
  timerStatus: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}) => {
  // map to 70% of circumference
  if (timeLeft === undefined || timeLeft < 0) timeLeft = 0;
  timeLeft = timeLeft * 0.7;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - timeLeft * circumference;

  return (
    <svg className={`relative mx-auto h-full`} viewBox="0 0 100 85">
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
      <foreignObject x="35" y="50" width="40" height="35">
        {" "}
        <PlayPauseResetButton
          isPlaying={timerStatus}
          onPause={toggleTimer}
          onPlay={toggleTimer}
          onReset={resetTimer}
          className="h-10"
        />
      </foreignObject>
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
          className="text-white hover:text-gray-900 focus:outline-none  focus:text-gray-900"
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="text-white hover:text-gray-900 focus:outline-none focus:text-gray-900"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button
        onClick={onReset}
        className="ml-2 text-white hover:text-gray-900 focus:outline-none focus:text-gray-900"
      >
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

export function Pomodoro() {
  const [ellapsedTime, setEllapsedTime] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(25);
  const [minutesLeft, setMinutes] = useState<number>(25);
  const [secondsLeft, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerStatus] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<number>(Date.now());

  function resetTimer() {
    setTimerStatus(false);
    setEllapsedTime(0);
  }

  useEffect(() => {
    if (!timerRunning) {
      let seconds = Math.floor((selectedTime * 60000 - ellapsedTime) / 1000);
      let minutes = Math.floor(seconds / 60);

      setMinutes(minutes);
      setSeconds(seconds - minutes * 60);
      return;
    }
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const cycleTime = currentTime - tempDate;
      if (ellapsedTime + cycleTime >= selectedTime * 60000) {
        alert("Time expired!");
        setTimerStatus(false);
        return;
      }

      let seconds = Math.floor(
        (selectedTime * 60000 - ellapsedTime - cycleTime) / 1000
      );
      let minutes = Math.floor(seconds / 60);

      setMinutes(minutes);
      setSeconds(seconds - minutes * 60);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [ellapsedTime, selectedTime, tempDate, timerRunning]);

  function toggleTimer() {
    if (timerRunning) {
      setEllapsedTime(ellapsedTime + (Date.now() - tempDate));
    }

    setTempDate(Date.now());
    setTimerStatus(!timerRunning);
  }

  function changeTimer(time: number) {
    setEllapsedTime(0);
    setTimerStatus(false);
    setSelectedTime(time);
  }
  return (
    <div className="flex flex-col m-auto h-full justify-center">
      <div className="h-2/3">
        <CircularTimer
          timeLeft={
            (selectedTime * 60000 - ellapsedTime - (Date.now() - tempDate)) /
            (selectedTime * 60000)
          }
          minutes={minutesLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          seconds={secondsLeft.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          pulse={minutesLeft === 0 && secondsLeft === 0}
          className="mt-5"
          timerStatus={timerRunning}
          resetTimer={resetTimer}
          toggleTimer={toggleTimer}
        />
      </div>

      <div className="flex-row justify-center lg:text-3xl mx-auto">
        <Button onClick={() => changeTimer(0.1)} className="m-1">
          6 SECONDS
        </Button>
        <Button onClick={() => changeTimer(5)} className="m-1">
          5 MINUTES
        </Button>
        <Button onClick={() => changeTimer(25)} className="m-1">
          25 MINUTES
        </Button>
      </div>
    </div>
  );
}
