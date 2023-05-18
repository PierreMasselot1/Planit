import { useEffect, useState } from "react";
import Button from "../../components/Common/Button";
import { CircularTimer } from "./CircularTimer";

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
        changeTimer(selectedTime);
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
    setTempDate(Date.now());
    setTimerStatus(false);
    setSelectedTime(time);
  }
  return (
    <div className="flex flex-col max-w-fit sm:h-full justify-center m-auto">
      <div className="h-auto">
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

      <div className="flex-row justify-center  mx-auto">
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
