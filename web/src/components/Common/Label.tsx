import { Label as Label_Tab } from "@shared/types/label_types";

export function LabelTab(
  label: Label_Tab,
  onClick: () => void,
  isSelected: boolean
) {
  return (
    <button
      onClick={onClick}
      key={label.id}
      className={`px-2 py-1 mx-1 font-bold text-white bg-[${
        label.color
      }] rounded-md shadow-lg  focus:outline-none focus:shadow-outline ${
        isSelected
          ? "bg-primary-600 hover:bg-primary-700"
          : "hover:bg-secondary-600"
      } `}
    >
      {label.title}
    </button>
  );
}
