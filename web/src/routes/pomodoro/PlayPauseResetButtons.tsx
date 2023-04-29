import { faPause, faPlay, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PlayPauseResetButton = ({
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
