import React, { ReactNode } from "react";

function NavIcon(
  icon: undefined | ReactNode,
  element: string | ReactNode,
  disabled: Boolean = false
) {
  return (
    <div
      className={`text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600  font-medium rounded-lg text-lg px-5 py-2.5 text-center mx-2 my-1 ${
        disabled
          ? "opacity-25"
          : "hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800"
      } `}
    >
      <div className=" flex flex-row">
        <div>{icon}</div>

        <div className="hidden sm:block ml-2">{element}</div>
      </div>
    </div>
  );
}

export default NavIcon;