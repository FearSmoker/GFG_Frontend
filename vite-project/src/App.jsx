import { Routes, Route } from "react-router-dom"; 
import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import LetsConnect from './pages/LetsConnect';
import POTD from './pages/POTD';
import Logout from "./pages/Logout";
import MeetOurGeeks from "./pages/MeetOurGeeks";
import Developers from "./pages/Developers";
import ChangePassword from "./pages/ChangePassword";
import Get_Profile from "./pages/Get_Profile";
import Navbar from "./components/Navbar";
import { NavigationProvider } from "./context/NavigationContext";
import Footer from "./components/Footer";

import { LogOut } from "lucide-react";
function App() {
  return (
    <NavigationProvider>
      <Navbar /> 
      <Routes>
      <Route path="/" element={<HomePage />} /> 
        <Route path="/change-password" element={<ChangePassword />} /> 
        <Route path="/get-profile" element={<Get_Profile/>} /> 
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/lets-connect" element={<LetsConnect />} />
        <Route path="/potd" element={<POTD />} />
        <Route path="/meet-our-geeks" element={<MeetOurGeeks />} />
        <Route path="/Devlopers" element={<Developers />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer/>
    </NavigationProvider>
  );
}

export default App;
