import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealDashboard from './pages/meals-dashboard.js';
import MealDetail from './pages/meal-details.js';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/meals" element={<MealDashboard/>}></Route>
        <Route path="/meals/:id" element={<MealDetail/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
