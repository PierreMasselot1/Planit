import { Outlet } from "react-router-dom";
import Navbar from "../routes/Navbar/Navbar";

export default function Root() {
  return (
    <div className="h-screen overflow-hidden flex flex-col sm:flex-row bg-gray-800">
      <Navbar />
      <div className="h-full sm:w-full sm:h-auto bg-gray-700 sm:rounded-lg sm:mx-2 sm:my-2 p-2">
        <Outlet />
      </div>
    </div>
  );
}
