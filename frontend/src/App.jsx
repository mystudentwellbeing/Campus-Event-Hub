import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './ui/navbar/Navbar';
import Homepage from './pages/Homepage';
import EventList from './features/searchEvents/EventList';
import EventFullInfo from './features/EventFullInfo';
import AboutUs from './pages/AboutUs';
import SubmitEvents from './pages/SubmitEvents';
import ViewMyEvents from './pages/ViewMyEvents';
import MySavedEvents from './features/likeEvents/MySavedEvents';
import MySubmittedEvents from './features/MySubmittedEvents';
import Setting from './pages/Setting';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './ui/Footer';
import ProtectedRoute from './ui/ProtectedRoute';
import './App.css';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        cacheTime: 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route index element={<EventList />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:eventId" element={<EventFullInfo />} />
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
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: '1.5rem',
            maxWidth: '50rem',
            padding: '2rem',
            backgroundColor: 'var(--grey1)',
            color: 'var(--darakblue)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
