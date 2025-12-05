// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 12px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/raporlar" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
