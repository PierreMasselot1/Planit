import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavIcon(
  linkTo: string,
  icon: undefined | ReactNode,
  element: string | ReactNode,
  disabled: Boolean = false
) {
  const [selected, setselected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setselected(location.pathname.replace("/", "") === linkTo);
    console.log(location.pathname);
  }, [location, linkTo]);

  return (
    <Link to={linkTo}>
      <div
        className={`flex flex-row text-white font-medium rounded-lg text-lg px-4 sm:px-5 py-1 sm:py-2.5 text-center sm:mx-2 my-1 ${
          disabled ? "opacity-25" : "hover:outline hover:outline-2"
        } `}
      >
        <div className={`${selected ? "text-teal-200" : ""}`}>{icon}</div>
        <div className="hidden sm:block ml-2">{element}</div>
      </div>
    </Link>
  );
}

export default NavIcon;
