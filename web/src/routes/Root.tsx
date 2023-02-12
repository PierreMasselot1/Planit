import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  return (
    <div className="h-screen overflow-hidden flex flex-col sm:flex-row bg-gray-800">
      <Navbar />
      <div className="w-full bg-gray-700 rounded-lg mx-1 my-1 sm:mx-3 sm:my-3 p-2">
        <Outlet />
      </div>
    </div>
  );
}
