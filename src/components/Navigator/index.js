import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navigator = ({ to, label }) => (
  <Link to={to}>
    <button className="navigator">{label}</button>
  </Link>
);

export default Navigator;
