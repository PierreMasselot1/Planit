import { SyntheticEvent, useState } from "react";

function Habit() {
  const [habit_title, setHabitTitle] = useState("");
  const [habits, setHabits] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createHabit(habit_title);
    setHabitTitle("");
  };

  async function createHabit(title: string) {
    console.log("creating habit");
  }

  return (
    <div className="justify-start text-left">
      <div className="text-white text-2xl font-bold">Habit</div>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="New habit"
          value={habit_title}
          onChange={(e) => setHabitTitle(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Habit;
