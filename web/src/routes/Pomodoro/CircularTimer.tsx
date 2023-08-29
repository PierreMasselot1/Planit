import { PlayPauseResetButton } from "./PlayPauseResetButtons";

export const CircularTimer = ({
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
        stroke="primary"
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
