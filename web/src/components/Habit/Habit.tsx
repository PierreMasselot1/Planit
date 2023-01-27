import { useState } from "react";

function Habit() {
  const [newHabit, setNewHabit] = useState("");

  return (
    <div className="justify-start text-left">
      <div className="text-white text-2xl font-bold">Habit</div>
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        type="text"
        placeholder="New habit"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />
    </div>
  );
}

export default Habit;
