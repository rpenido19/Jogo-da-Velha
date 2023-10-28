import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Historic from "./pages/historic";
import Play from "./pages/play";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historic" element={<Historic />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
