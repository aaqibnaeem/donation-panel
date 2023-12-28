import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello world</div>} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
