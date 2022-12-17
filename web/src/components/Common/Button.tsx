import React from "react";

const Button = ({ onClick, className, children }: any) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-bold text-white bg-teal-500 rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:shadow-outline ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
