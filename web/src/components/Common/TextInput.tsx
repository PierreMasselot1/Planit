import { useRef } from "react";
import useAutosizeTextArea from "./useAutosizeTextArea";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      className={`mr-2 my-1 bg-neutral-800 text-white h-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-primary-500 focus:ring-0 `}
      placeholder={label}
      id={label}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export function TextInputNoBorder({
  label,
  value,
  tabIndex,
  onChange,
}: {
  label: string;
  value: string;
  tabIndex: number | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      className={`mr-2 my-1 bg-transparent text-white h-full py-1 px-2 outline-none border-none focus:outline-none focus:ring-0 `}
      placeholder={label}
      id={label}
      value={value}
      tabIndex={tabIndex}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export function TextAreaInputNoBorder({
  label,
  value,
  tabIndex,
  onChange,
}: {
  label: string;
  value: string;
  tabIndex: number | undefined;
  onChange: (value: string) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);
  return (
    <textarea
      ref={textAreaRef}
      className={`mr-2 my-1 bg-transparent w-full text-white h-full py-1 px-2 outline-none border-none focus:outline-none focus:ring-0 `}
      placeholder={label}
      id={label}
      value={value}
      tabIndex={tabIndex}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
