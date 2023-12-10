import { useEffect, useState } from "react";
import { createLabelAPI, getLabelsAPI } from "../../../api/api_labels";
import { Label } from "@shared/types/label_types";
import { TextInput } from "../TextInput";
import { LabelIcon } from "./Label";
import ColorPicker from "../ColorPicker";

interface LabelSelectorProps {
  setSelectedLabels: (labels: Label[]) => void;
  selectedLabels: Label[];
}

export function LabelSelector({
  setSelectedLabels,
  selectedLabels,
}: LabelSelectorProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [label, setLabel] = useState<Label | null>(null);

  useEffect(() => {
    getLabels();
  }, []);

  async function getLabels() {
    getLabelsAPI().then((labels) => setLabels(labels));
  }

  function toggleLabel(label: Label) {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabel) => selectedLabel !== label)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  }
  return (
    <div className="flex flex-wrap">
      <div>
        {labels.map((label) => {
          return LabelIcon(
            label,
            selectedLabels.includes(label),
            (label_id: number) => toggleLabel(label)
          );
        })}
      </div>

      <div className="ml-2 pb-2">
        <form
          onSubmit={() => {
            if (label) {
              createLabelAPI(label).then(getLabels);
            }
          }}
        >
          <div className="flex justify-between">
            <TextInput
              onChange={(e) => setLabel({ title: e } as Label)}
              label="New Label"
              value={""}
            />
            {ColorPicker((color) => setLabel({ ...label, color } as Label))}
          </div>
        </form>
      </div>
    </div>
  );
}
