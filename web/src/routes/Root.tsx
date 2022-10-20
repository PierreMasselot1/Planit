import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Root() {
  return (
    <div className="flex flex-row bg-gray-800">
      <div className="flex flex-col w-fit h-screen">
        <Navbar />
      </div>

      <div className="flex flex-col w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
}
