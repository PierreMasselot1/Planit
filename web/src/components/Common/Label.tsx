import { Label } from "@shared/types/label_types";

export function LabelTab(
  label: Label,
  onClick: () => void,
  isSelected: boolean
) {
  return (
    <button
      onClick={onClick}
      key={label.id}
      style={{ backgroundColor: label.color, opacity: isSelected ? 1 : 0.5 }}
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
    </button>
  );
}
