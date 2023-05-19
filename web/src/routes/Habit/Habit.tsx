import Api from "../../helpers/api";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  faCheck,
  faCross,
  faFire,
  faRotate,
  faX,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Common/Button";
import { Habit } from "@shared/types/habit_types";
import Heatmap from "../../components/Visualization/Heatmap";

function HabitComponent() {
  const [habit_title, setHabitTitle] = useState("");
  const [habit_description, setHabitDescription] = useState("");
  const [habits, setHabits] = useState<Array<Habit>>([]);

  const api = new Api(useAuth0());

  useEffect(() => {
    getHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getHabits() {
    await api.getHabits().then((habits) => {
      setHabits(habits);
    });
  }

  async function completeHabit(id: number) {
    await api.completeHabit(id, new Date()).then(getHabits);
  }

  async function deleteHabit(id: number) {
    await api.deleteHabit(id).then(getHabits);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createHabit(habit_title, habit_description);
    setHabitTitle("");
    setHabitDescription("");
  };

  async function createHabit(title: string, description: string) {
    api.createHabit(title, description).then(getHabits);
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
          <input
            className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="Description"
            value={habit_description}
            onChange={(e) => setHabitDescription(e.target.value)}
          />
          <Button handleSubmit className="h-full my-1 px-2 py-0">
            Submit
          </Button>
        </div>
      </form>
      <div className="overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col w-1/2 min-w-fit">
        {habits &&
          habits
            ?.sort((a: Habit, b: Habit) => a.id - b.id)
            .map((habit: Habit, key: number) => (
              <div
                className="bg-slate-300 my-1 mr-2 py-1 px-2 rounded flex-col "
                key={key}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col w-full">
                    <h2 className="break-words">{habit.title}</h2>
                    <p className=" text-gray-700 text-sm">
                      {habit.description}
                    </p>
                  </div>
                  <div
                    className=" whitespace-nowrap ml-auto mr-2 "
                    title="Completion Count"
                  >
                    <FontAwesomeIcon icon={faRotate} className="mr-1" />
                    {habit.completion_count}
                  </div>
                  <div
                    className=" whitespace-nowrap mx-1"
                    title="Daily Streak Count"
                  >
                    <FontAwesomeIcon icon={faFire} className="mr-1" />
                    {habit.streak}
                  </div>
                  <div className="ml-1 hover:text-green-500">
                    <button onClick={() => completeHabit(habit.id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>{" "}
                  <div className="ml-1 hover:text-red-500">
                    <button onClick={() => deleteHabit(habit.id)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>{" "}
                </div>{" "}
                <Heatmap dates={habit.completion_dates} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default HabitComponent;
