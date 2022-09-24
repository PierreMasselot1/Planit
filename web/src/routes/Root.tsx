import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Root() {
  return (
    <div className="flex flex-row">
      <div className=" w-fit h-screen bg-gray-900">
        <Navbar/>
      </div>

      <div className="w-full h-screen bg-gray-800">
        <Outlet />
      </div>
    </div>
  );
}
