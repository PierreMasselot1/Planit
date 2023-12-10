import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getLabelsAPI } from "../../../api/api_labels";
import { LabelIcon } from "./Label";
import { Label } from "@shared/types/label_types";

export function LabelPicker(
  selectedLabels: Label[],
  setSelectedLabels: (labels: Label[]) => void
) {
  const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
  const [pickingLabel, setPickingLabel] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setPickingLabel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  useEffect(() => {
    getLabels();
  }, []);

  async function getLabels() {
    getLabelsAPI().then((labels) => setAvailableLabels(labels));
  }

  return (
    <div className="my-auto mr-4">
      <FontAwesomeIcon
        icon={faTag}
        className={`text-white cursor-pointer ${
          pickingLabel ? "text-primary-500" : ""
        }`}
        onClick={() => {
          setPickingLabel(!pickingLabel);
        }}
      />
      {pickingLabel && (
        <div
          className="absolute bg-neutral-700 rounded-md p-2  shadow-primary-500 shadow-sm"
          ref={pickerRef}
        >
          {availableLabels.map((label) => {
            return (
              <div className="flex flex-row justify-between mt-1">
                {LabelIcon(
                  label,
                  selectedLabels.includes(label),
                  (label_id: number) => {
                    if (selectedLabels.includes(label)) {
                      setSelectedLabels(
                        selectedLabels.filter(
                          (selectedLabel) => selectedLabel.id !== label_id
                        )
                      );
                    } else setSelectedLabels([...selectedLabels, label]);
                    setPickingLabel(false);
                  }
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
