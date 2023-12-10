import { SyntheticEvent, useRef, useState } from "react";
import Button from "../../components/Common/Button";
import {
  DateInputNoBorder,
  TextAreaInputNoBorder,
  TextInputNoBorder,
} from "../../components/Common/TextInput";
import { Todo } from "@shared/types/todo_types";

// Input fields to create a todo and select a label
export function TodoEntryBar(createTodo: (todo: Partial<Todo>) => void) {
  const [due_date, setDueDate] = useState<Date | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
      className="outline  outline-1 outline-gray-500 rounded-md p-2 mb-2 w-fit focus:outline-white"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row" onFocus={focus} onBlur={blur}>
          <TextInputNoBorder
            label="Title"
            onChange={setTitle}
            value={title}
            tabIndex={1}
          />

          <DateInputNoBorder
            label="Date"
            onChange={(date) => {
              setDueDate(new Date(date));
            }}
            value={due_date || null}
            tabIndex={3}
          />
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
