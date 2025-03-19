import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import LetsConnect from './pages/LetsConnect';
import POTD from './pages/POTD';
import MeetOurGeeks from "./pages/MeetOurGeeks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/lets-connect" element={<LetsConnect />} />
        <Route path="/potd" element={<POTD />} />
        <Route path="/meet-our-geeks" element={<MeetOurGeeks />} />
      </Routes>
    </Router>
  );
}

export default App;

