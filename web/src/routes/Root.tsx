import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Root() {
  return (
    <div className="flex flex-row">
      <div className=" w-25 h-screen bg-slate-700">
        <Navbar/>
      </div>

      <div className="w-full h-screen bg-slate-800">
        <Outlet />
      </div>
    </div>
  );
}
