import React, { useState } from "react";

function ColorPicker(changeColor: (color: string) => void) {
  const [color, setColor] = useState("#000000");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    changeColor(event.target.value);
  };

  return (
    <div>
      <input type="color" value={color} onChange={handleChange} />
      <p>Selected color: {color}</p>
    </div>
  );
}

export default ColorPicker;
