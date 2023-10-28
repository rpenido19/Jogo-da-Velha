import React from "react";
import { Link } from "react-router-dom";

const Navigator = ({ to, label }) => (
  <Link to={to}>
    <button className="navigator">{label}</button>
  </Link>
);

export default Navigator;
