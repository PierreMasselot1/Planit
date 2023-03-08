import Api from "../../helpers/api";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Common/Button";
import { Habit } from "@shared/types/habit_types";

function HabitComponent() {
  const api = new Api();
  const [habit_title, setHabitTitle] = useState("");
  const [habits, setHabits] = useState(Array<Habit>);

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

  async function completeHabits(id: number) {
    await api.completeHabit(await getAccessTokenSilently(), id).then(getHabits);
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
    <div className="flex flex-col justify-start text-left h-full">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="New habit"
            value={habit_title}
            onChange={(e) => setHabitTitle(e.target.value)}
          />
          <Button handleSubmit className="h-full my-1 px-2 py-0">
            Submit
          </Button>
        </div>
      </form>
      <div className="overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col ">
        {habits &&
          habits?.map((habit: Habit, key: number) => (
            <div
              className="bg-slate-300 my-1 mr-2 py-1 px-2 rounded flex  "
              key={key}
            >
              <h2 className="break-words"> {habit.title}</h2>
              <div className="ml-auto">{habit.streak}</div>
              <div className="ml-1">
                <button onClick={() => completeHabits(habit.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HabitComponent;
