import { SyntheticEvent, useEffect, useState } from "react";
import {
  faCheck,
  faChevronDown,
  faFire,
  faRotate,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Common/Button";
import { Habit } from "@shared/types/habit_types";
import Heatmap from "../../components/Visualization/Heatmap";
import {
  completeHabitAPI,
  createHabitAPI,
  deleteHabitAPI,
  getHabitsAPI,
} from "../../api/api_habits";
import { TextInput } from "../../components/Common/TextInput";
import { CollapsibleButton } from "../../components/Common/CollapsibleButton";

function HabitComponent() {
  const [habit_title, setHabitTitle] = useState("");
  const [habit_description, setHabitDescription] = useState("");
  const [habits, setHabits] = useState<Array<Habit>>([]);
  const [view_heatmap, setViewHeatmap] = useState<Array<number>>([]);

  useEffect(() => {
    updateHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateHabits() {
    await getHabitsAPI().then((habits) => {
      setHabits(habits);
    });
  }

  async function completeHabit(id: number) {
    await completeHabitAPI(id, new Date()).then(updateHabits);
  }

  async function deleteHabit(id: number) {
    await deleteHabitAPI(id).then(updateHabits);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createHabit(habit_title, habit_description);
    setHabitTitle("");
    setHabitDescription("");
  };

  async function createHabit(title: string, description: string) {
    createHabitAPI(title, description).then(updateHabits);
  }

  async function toggleHeatmap(id: number) {
    //append or remove id from view_heatmap
    if (view_heatmap.includes(id)) {
      setViewHeatmap(view_heatmap.filter((item) => item !== id));
    } else {
      setViewHeatmap([...view_heatmap, id]);
    }
    return;
  }

  return (
    <div className="flex flex-col justify-start text-left text-white h-full">
      <form onSubmit={handleSubmit}>
        <div>
          <TextInput
            label="Habit Title"
            value={habit_title}
            onChange={setHabitTitle}
          />
          <TextInput
            label="Description"
            value={habit_description}
            onChange={setHabitDescription}
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
                className="bg-neutral-800 my-1 mr-2 py-1 px-2 rounded flex-col "
                key={key}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col w-full">
                    <h2 className="break-words">{habit.title}</h2>
                    <p className=" text-sm">{habit.description}</p>
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
                <div>
                  <CollapsibleButton
                    label="Heatmap"
                    isOpen={view_heatmap.includes(habit.id)}
                    className="text-sm py-1 my-1 px-2 "
                    onClick={() => {
                      toggleHeatmap(habit.id);
                    }}
                  />
                  {view_heatmap.includes(habit.id) && (
                    <Heatmap dates={habit.completion_dates} />
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default HabitComponent;
