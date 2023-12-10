import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateAndTimePicker({
  value,
  tabIndex,
  onDateChange,
}: {
  value: Date | null;
  tabIndex: number | undefined;
  onDateChange: (value: Date) => void;
}) {
  return (
    <div>
      <ReactDatePicker
        selected={value}
        onChange={(date: Date) => onDateChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, h:mm aa"
        tabIndex={tabIndex}
        placeholderText="Due Date"
        className="w-full outline-none bg-transparent border-none focus:outline-none focus:ring-0 text-white "
      />
    </div>
  );
}
