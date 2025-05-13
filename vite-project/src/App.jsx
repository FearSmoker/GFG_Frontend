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
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs"
import { NavigationProvider } from "./context/NavigationContext";

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
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/get-profile" element={<Get_Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<div className="text-white text-center mt-10">404 - Page Not Found</div>} />
        </Routes>
        <Footer />
      </NavigationProvider>
  );
}

export default App;