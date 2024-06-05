import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import TaskDetails from './TaskDetails';
import './App.css';
import ReactDOM from 'react-dom';





const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
