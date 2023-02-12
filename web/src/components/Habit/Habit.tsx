import Api from "../../helpers/api";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Habit() {
  const api = new Api();
  const [habit_title, setHabitTitle] = useState("");
  const [habits, setHabits] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  //load todos on page load
  useEffect(() => {
    getHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getHabits() {
    await api.getHabits(await getAccessTokenSilently()).then((data) => {
      setHabits(data.habits);
    });
  }
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createHabit(habit_title);
    setHabitTitle("");
  };

  async function createHabit(title: string) {
    console.log("creating habit");
    api.createHabit(await getAccessTokenSilently(), title).then(getHabits);
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
      <div>
        {habits &&
          habits?.map((habit: any, key: number) => (
            <div className="bg-slate-300 w-fit my-1 py-1 px-2 rounded ">
              <h2> {habit.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Habit;
