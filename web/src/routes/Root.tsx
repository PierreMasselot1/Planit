import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  return (
    <div className="h-screen overflow-y-hidden flex flex-row bg-gray-800">
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
