import { SyntheticEvent, useRef, useState } from "react";
import Button from "../../components/Common/Button";
import {
  DateInputNoBorder,
  TextAreaInputNoBorder,
  TextInputNoBorder,
} from "../../components/Common/TextInput";
import { Todo } from "@shared/types/todo_types";
import { Label } from "@shared/types/label_types";
import { LabelSelector } from "../../components/Common/Label/LabelSelector";
import { LabelPicker } from "../../components/Common/Label/LabelPicker";
import { LabelIcon } from "../../components/Common/Label/Label";
import { DateAndTimePicker } from "../../components/Common/DateAndTimePicker";

// Input fields to create a todo and select a label
export function TodoEntryBar(createTodo: (todo: Partial<Todo>) => void) {
  const [due_date, setDueDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<Label[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  function focus() {
    ref.current?.classList.add("outline-white");
  }

  function blur() {
    ref.current?.classList.remove("outline-white");
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const todo: Partial<Todo> = {
      title: title,
      description: description,
      due_date: due_date,
      completed: false,
    };

    createTodo?.(todo);
    setTitle("");
    setDescription("");
    setDueDate(undefined);
  };

  return (
    <div
      ref={ref}
      className="outline w-fit  outline-1 outline-gray-500 rounded-md p-2 mb-2 focus:outline-white"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row" onFocus={focus} onBlur={blur}>
          <TextInputNoBorder
            label="Title"
            onChange={setTitle}
            value={title}
            tabIndex={1}
          />
          <DateAndTimePicker
            onDateChange={setDueDate}
            value={due_date || null}
            tabIndex={3}
          />

          {labels.map((label: Label) => {
            return LabelIcon(label, true, undefined, (label_id: number) => {
              setLabels(labels.filter((l) => l.id !== label_id));
            });
          })}
          {LabelPicker(labels, setLabels)}
          <Button handleSubmit className="my-1 px-2 py-0">
            Submit
          </Button>
        </div>
        <div
          className="flex flex-row align-baseline mb-4 flex-wrap w-full"
          onFocus={focus}
          onBlur={blur}
        >
          <TextAreaInputNoBorder
            label="Description"
            onChange={setDescription}
            value={description}
            tabIndex={2}
          />
        </div>
      </form>
    </div>
  );
}
