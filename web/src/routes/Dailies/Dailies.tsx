import Api from "../../helpers/api";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  faCheck,
  faChevronDown,
  faFire,
  faRotate,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Common/Button";
import { Dailies } from "@shared/types/dailies_types";
import Heatmap from "../../components/Visualization/Heatmap";

function DailiesComponent() {
  const [dailies_title, setDailiesTitle] = useState("");
  const [dailies_description, setDailiesDescription] = useState("");
  const [dailiesArray, setdailiesArray] = useState<Array<Dailies>>([]);
  const [view_heatmap, setViewHeatmap] = useState<Array<number>>([]);

  const api = new Api(useAuth0());

  useEffect(() => {
    getdailiesArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getdailiesArray() {
    await api.getDailies().then((dailiesArray) => {
      setdailiesArray(dailiesArray);
    });
  }

  async function completeDailies(id: number) {
    await api.completeDailies(id, new Date()).then(getdailiesArray);
  }

  async function deleteDailies(id: number) {
    await api.deleteDailies(id).then(getdailiesArray);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createDailies(dailies_title, dailies_description);
    setDailiesTitle("");
    setDailiesDescription("");
  };

  async function createDailies(title: string, description: string) {
    api.createDailies(title, description).then(getdailiesArray);
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
    <div className="flex flex-col justify-start text-left h-full">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="New dailies"
            value={dailies_title}
            onChange={(e) => setDailiesTitle(e.target.value)}
          />
          <input
            className="mr-2 my-1 h-full border rounded py-0.5 px-2 leading-tight focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="Description"
            value={dailies_description}
            onChange={(e) => setDailiesDescription(e.target.value)}
          />
          <Button handleSubmit className="h-full my-1 px-2 py-0">
            Submit
          </Button>
        </div>
      </form>
      <div className="overflow-y-auto overflow-x-hidden scrollbar flex flex-1 flex-col w-1/2 min-w-fit">
        {dailiesArray &&
          dailiesArray
            ?.sort((a: Dailies, b: Dailies) => a.id - b.id)
            .map((dailies: Dailies, key: number) => (
              <div
                className="bg-slate-300 my-1 mr-2 py-1 px-2 rounded flex-col "
                key={key}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col w-full">
                    <h2 className="break-words">{dailies.title}</h2>
                    <p className=" text-gray-700 text-sm">
                      {dailies.description}
                    </p>
                  </div>
                  <div
                    className=" whitespace-nowrap ml-auto mr-2 "
                    title="Completion Count"
                  >
                    <FontAwesomeIcon icon={faRotate} className="mr-1" />
                    {dailies.completion_count}
                  </div>
                  <div
                    className=" whitespace-nowrap mx-1"
                    title="Daily Streak Count"
                  >
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
                  <button
                    className="flex items-center text-xs justify-between px-1 py-1 mb-1 bg-gray-200 rounded"
                    onClick={() => {
                      toggleHeatmap(dailies.id);
                    }}
                  >
                    <span>View Heatmap</span>
                    <FontAwesomeIcon
                      className={` ml-2 w-4 h-4 transition-transform transform hover:text-teal-300 ${
                        view_heatmap.includes(dailies.id)
                          ? "rotate-90"
                          : "rotate-0"
                      }`}
                      icon={faChevronDown}
                    />
                  </button>
                  {view_heatmap.includes(dailies.id) && (
                    <Heatmap dates={dailies.completion_dates} />
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default DailiesComponent;
