import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteSate from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {

  //state of alert component
  const [alert, setAlert] = useState(null);

  //Function to show an alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteSate>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
