import { useEffect, useState } from "react";
import { getLabelsAPI } from "../../api/api_labels";
import Button from "./Button";
import { Label } from "@shared/types/label_types";

interface LabelSelectorProps {
  setSelectedLabels: (labels: Label[]) => void;
  selectedLabels: Label[];
}

export function LabelSelector({
  setSelectedLabels,
  selectedLabels,
}: LabelSelectorProps) {
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    getLabels();
  }, []);

  async function getLabels() {
    getLabelsAPI().then((labels) => setLabels(labels));
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        {labels.map((label) => (
          <Button
            key={label}
            onClick={() => {
              if (selectedLabels.includes(label)) {
                setSelectedLabels(selectedLabels.filter((l) => l !== label));
              } else {
                setSelectedLabels([...selectedLabels, label]);
              }
            }}
            className={`w-fit my-0.5 ${
              selectedLabels.includes(label) ? "bg-primary-500" : ""
            }`}
          >
            {label.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
