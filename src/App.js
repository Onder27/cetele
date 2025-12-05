import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/raporlar" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
