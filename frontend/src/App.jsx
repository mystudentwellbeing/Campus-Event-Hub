import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './ui/navbar/Navbar';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import SubmitEvents from './pages/SubmitEvents';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './ui/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="submitevents" element={<SubmitEvents />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
