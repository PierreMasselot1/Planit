import Logo from "../images/LogoLarge.svg";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (text === "Get it done") {
        clearInterval(interval);
      } else {
        setText((prevText) => prevText + "Get it done".charAt(prevText.length));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="text-white justify-center align-middle text-center">
      <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold my-auto">
        <img src={Logo} alt="Rainbump Logo" className="mx-auto" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-8">
        {text}
      </h1>
    </div>
  );
}