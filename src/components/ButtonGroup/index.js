import React, { useState } from "react";

const ButtonGroup = ({ buttons }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => handleButtonClick(button)}
          className={button === activeButton ? "active" : ""}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
