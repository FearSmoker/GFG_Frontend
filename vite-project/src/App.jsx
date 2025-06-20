import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import LetsConnect from './pages/LetsConnect';
import POTD from './pages/POTD';
import Logout from "./pages/Logout";
import MeetOurGeeks from "./pages/MeetOurGeeks.jsx";
import ChangePassword from "./pages/ChangePassword";
import Get_Profile from "./pages/Get_Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import DeleteEvents from "./pages/DeleteEvents.jsx";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs"
import NavigationProvider from "./context/NavigationProvider.jsx";
import Footer from "./components/NewFooter.jsx";
import EventDetails from "./pages/EventDetails";
import EventRegistration from "./pages/EventRegistration";
import Dashboard from "./pages/Dashboard";
import MyRegistrations from "./pages/MyRegistrations";
import RegistrationHistory from "./pages/RegistrationHistory";
import EventHistory from "./pages/EventHistory.jsx";
import AddEvents from "./pages/AddEvents.jsx";

function App() {
  return (
      <NavigationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-registration" element={<EventRegistration />} />
          <Route path="/lets-connect" element={<LetsConnect />} />
          <Route path="/potd" element={<POTD />} />
          <Route path="/meet-our-geeks" element={<MeetOurGeeks />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/get-profile" element={<Get_Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/delete-events" element={<DeleteEvents />} />
          <Route path="/add-events" element={<AddEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/registration-history" element={<RegistrationHistory />} />
          <Route path="/event-history" element={<EventHistory />} />
          
          <Route path="*" element={<div className="text-white text-center mt-10">404 - Page Not Found</div>} />
        </Routes>
        <Footer />
      </NavigationProvider>
  );
}

export default App;