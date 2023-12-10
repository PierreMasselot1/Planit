import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getLabelsAPI } from "../../../api/api_labels";
import { LabelTab } from "./Label";
import { Label } from "@shared/types/label_types";
import Button from "../Button";

export function LabelPicker() {
  const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
  const [pickingLabel, setPickingLabel] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

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
        <div className="absolute bg-neutral-700 rounded-md p-2">
          {availableLabels.map((label) => {
            return (
              <div className="flex flex-row justify-between">
                {LabelTab(
                  label,
                  (label_id: number) => {
                    if (selectedLabels.includes(label)) {
                      setSelectedLabels(
                        selectedLabels.filter(
                          (selectedLabel) => selectedLabel.id !== label_id
                        )
                      );
                    } else setSelectedLabels([...selectedLabels, label]);
                  },
                  selectedLabels.includes(label)
                )}
              </div>
            );
          })}
          <Button
            onClick={() => {
              setPickingLabel(false);
            }}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
