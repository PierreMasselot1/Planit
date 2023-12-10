import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@shared/types/label_types";
import { faClose } from "@fortawesome/free-solid-svg-icons";
function hexToRgba(hex: string, opacity: number) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function LabelIcon(
  label: Label,
  isSelected: boolean,
  onClick?: (label_id: number) => void,
  onClose?: (label_id: number) => void
) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick(label.id);
      }}
      key={label.id}
      style={{ backgroundColor: hexToRgba(label.color, isSelected ? 1 : 0.5) }}
      className={
        `px-2 py-1 mx-1 font-bold text-white ${label.color}
        rounded-md shadow-lg  focus:outline-none focus:shadow-outline ${
          isSelected
            ? "bg-primary-600 hover:bg-primary-700"
            : "hover:bg-secondary-600"
        }` as string
      }
    >
      {label.title}
      {onClose && (
        <FontAwesomeIcon
          icon={faClose}
          cursor={"pointer"}
          className="ml-2"
          onClick={() => {
            onClose(label.id);
          }}
        />
      )}
    </div>
  );
}
