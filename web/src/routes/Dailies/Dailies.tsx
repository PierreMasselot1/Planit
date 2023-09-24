import { SyntheticEvent, useEffect, useState } from "react";
import {
  faCheck,
  faFire,
  faMinus,
  faPlus,
  faRotate,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Common/Button";
import { Dailies } from "@shared/types/dailies_types";
import Heatmap from "../../components/Visualization/Heatmap";
import {
  completeDailiesAPI,
  createDailiesAPI,
  decrementDailiesAPI,
  deleteDailiesAPI,
  fetchDailiesAPI,
} from "../../api/api_dailies";
import { TextInput } from "../../components/Common/TextInput";
import { CollapsibleButton } from "../../components/Common/CollapsibleButton";

function DailiesComponent() {
  const [dailies_title, setDailiesTitle] = useState("");
  const [dailies_description, setDailiesDescription] = useState("");
  const [dailiesArray, setdailiesArray] = useState<Array<Dailies>>([]);
  const [view_heatmap, setViewHeatmap] = useState<Array<number>>([]);

  useEffect(() => {
    getdailiesArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getdailiesArray() {
    await fetchDailiesAPI().then((dailiesArray) => {
      setdailiesArray(dailiesArray);
    });
  }

  async function completeDailies(id: number) {
    await completeDailiesAPI(id, new Date()).then(getdailiesArray);
  }
  async function decrementDailies(id: number, date: Date) {
    await decrementDailiesAPI(id, date).then(getdailiesArray);
  }

  async function deleteDailies(id: number) {
    await deleteDailiesAPI(id).then(getdailiesArray);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createDailies(dailies_title, dailies_description);
    setDailiesTitle("");
    setDailiesDescription("");
  };

  async function createDailies(title: string, description: string) {
    createDailiesAPI(title, description).then(getdailiesArray);
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

  function dailiesListItem(dailies: Dailies, key: number) {
    return (
      <div
        className="bg-neutral-800 text-white my-1 mr-2 rounded flex flex-row justify-between"
        key={key}
      >
        <div className="flex flex-col w-full px-2 py-1">
          <div className="flex flex-row">
            <div className="flex flex-col w-full">
              <h2 className="break-words">{dailies.title}</h2>
              <p className="text-sm">{dailies.description}</p>
            </div>
            <div
              className=" whitespace-nowrap ml-auto mr-2 "
              title="Completion Count"
            >
              <FontAwesomeIcon icon={faRotate} className="mr-1" />
              {dailies.completion_count}
            </div>
            <div className=" whitespace-nowrap mx-1" title="Daily Streak Count">
              <FontAwesomeIcon icon={faFire} className="mr-1" />
              {dailies.streak}
            </div>
            <div className="ml-1 hover:text-green-500">
              <button onClick={() => completeDailies(dailies.id)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>{" "}
            <div className="ml-1 hover:text-red-500">
              <button onClick={() => deleteDailies(dailies.id)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>{" "}
          </div>{" "}
          <div>
            <div className="flex flex-row ">
              <CollapsibleButton
                label="Heatmap"
                className={`text-sm py-1 my-1 px-2`}
                isOpen={view_heatmap.includes(dailies.id)}
                onClick={() => {
                  toggleHeatmap(dailies.id);
                }}
              />
              <FontAwesomeIcon
                icon={faMinus}
                className="ml-auto mt-auto hover:text-red-500"
                onClick={() => {
                  decrementDailies(dailies.id, new Date());
                }}
              />
            </div>
            {view_heatmap.includes(dailies.id) && (
              <Heatmap dates={dailies.completion_dates} />
            )}
          </div>
        </div>
        <div
          className="m-0 pr-2 pl-2 bg-green-300 hover:bg-green-400 text-black rounded-r flex"
          onClick={() => completeDailies(dailies.id)}
        >
          <FontAwesomeIcon icon={faPlus} className="m-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start text-left h-full">
      <form onSubmit={handleSubmit}>
        <div>
          <TextInput label="Dailies Title" onChange={setDailiesTitle} />
          <TextInput label="Description" onChange={setDailiesDescription} />
          <Button handleSubmit className="h-full my-1 px-2 py-0">
            Submit
          </Button>
        </div>
      </form>
      <div className="overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col w-1/2 min-w-fit">
        {dailiesArray &&
          dailiesArray
            ?.sort((a: Dailies, b: Dailies) => a.id - b.id)
            .map((dailies: Dailies, key: number) =>
              dailiesListItem(dailies, key)
            )}
      </div>
    </div>
  );
}

export default DailiesComponent;
