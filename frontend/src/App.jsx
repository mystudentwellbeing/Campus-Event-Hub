import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventsProvider } from './contexts/EventsContext';
import Navbar from './ui/navbar/Navbar';
import Homepage from './pages/Homepage';
import EventList from './features/EventList';
import EventFullInfo from './features/EventFullInfo';
import AboutUs from './pages/AboutUs';
import SubmitEvents from './pages/SubmitEvents';
import ViewMyEvents from './pages/ViewMyEvents';
import MySavedEvents from './features/MySavedEvents';
import MySubmittedEvents from './features/MySubmittedEvents';
import Setting from './pages/Setting';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './ui/Footer';
import ProtectedRoute from './pages/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
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

            {/* Wrap ViewMyEvents and its nested routes with ProtectedRoute */}
            <Route
              path="viewmyevents"
              element={
                <ProtectedRoute>
                  <ViewMyEvents />
                </ProtectedRoute>
              }
            >
              <Route index element={<MySavedEvents />} />
              <Route path="mysavedevents" element={<MySavedEvents />} />
              <Route path="mysubmittedevents" element={<MySubmittedEvents />} />
            </Route>

            {/* Wrap Setting with ProtectedRoute */}
            <Route
              path="setting"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            />

            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
          <Footer />
        </EventsProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
