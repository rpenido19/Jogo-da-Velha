import React from "react";
import "./styles.css";

const ToggleSwitch = ({ isToggled, setIsToggled }) => {
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
