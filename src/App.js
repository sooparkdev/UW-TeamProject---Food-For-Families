// Import Stylesheet
import './App.css';

// Import Libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mongoose from 'mongoose';

// Import Components
import Navbar from './Navbar';
import Home from './Home';
import FoodNearYou from './FoodNearYou'; 
import Form from './Form';
import NotFound from './NotFound';

// Import Database
import db from './db.js'

// -----------------

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar /> {/* Navbar is always going to show as it's not under Switch component. This is here for every single route. */}
        <div className="content">
          <Routes> {/* Switch component make sures only one route shows at any one time. */}
            <Route exact path="/" element={<Home />}> </Route>
            <Route path="/food-near-you" element={<FoodNearYou />}> </Route>
            <Route path="/form" element={<Form />}> </Route>
            <Route path="*" element={<NotFound />}> </Route>
          </Routes>

        </div>
        <Routes>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
