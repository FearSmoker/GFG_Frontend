import { Routes, Route } from "react-router-dom"; 
import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import LetsConnect from './pages/LetsConnect';
import POTD from './pages/POTD';
import MeetOurGeeks from "./pages/MeetOurGeeks";
import Developers from "./pages/Developers";
import Navbar from "./components/Navbar";
import { NavigationProvider } from "./context/NavigationContext";
import Footer from "./components/Footer";
function App() {
  return (
    <NavigationProvider>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/lets-connect" element={<LetsConnect />} />
        <Route path="/potd" element={<POTD />} />
        <Route path="/meet-our-geeks" element={<MeetOurGeeks />} />
        <Route path="/Devlopers" element={<Developers />} />
      </Routes>
      <Footer/>
    </NavigationProvider>
  );
}

export default App;
