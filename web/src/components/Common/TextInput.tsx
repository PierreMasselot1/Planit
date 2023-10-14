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
