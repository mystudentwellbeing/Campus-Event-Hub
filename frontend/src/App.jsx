import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventsProvider } from './contexts/EventsContext';
import Navbar from './ui/navbar/Navbar';
import Homepage from './pages/Homepage';
import EventList from './features/EventList';
import EventFullInfo from './features/EventFullInfo';
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
      <EventsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route index element={<EventList />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:id" element={<EventFullInfo />} />
          </Route>
          <Route path="submitevents" element={<SubmitEvents />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        <Footer />
      </EventsProvider>
    </BrowserRouter>
  );
}

export default App;
