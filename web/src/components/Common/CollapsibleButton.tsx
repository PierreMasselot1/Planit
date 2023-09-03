import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface CollapsibleButtonProps {
  label: string;
  isOpen: boolean;
  className?: string;
  onClick: () => void;
}

export function CollapsibleButton({
  label,
  isOpen,
  className = "",
  onClick,
}: CollapsibleButtonProps) {
  return (
    <button
      className={`flex items-center justify-between px-4 py-2 hover:text-primary-400 bg-secondary-600 hover:bg-secondary-700 rounded ${className}`}
      onClick={onClick}
    >
      <span className="text-white">{label}</span>
      <FontAwesomeIcon
        className={`ml-2 w-4 h-4 transition-transform transform ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        icon={faChevronDown}
      />
    </button>
  );
}
