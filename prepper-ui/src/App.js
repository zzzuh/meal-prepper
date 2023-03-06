import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealDashboard from './pages/meals-dashboard.js';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/meals" element={<MealDashboard/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
