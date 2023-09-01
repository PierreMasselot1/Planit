import React from "react";

//THIS IS CANCER REMOVE IT IMMEDIATLY
const Button = ({
  onClick,
  className,
  children,
}:
  | {
      onClick: any;
      className: string;
      children: any;
    }
  | any) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 font-bold text-white bg-secondary-500 rounded-md shadow-lg hover:bg-secondary-600 focus:outline-none focus:shadow-outline ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
