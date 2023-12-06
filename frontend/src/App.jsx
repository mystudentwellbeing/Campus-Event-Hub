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
import MySubmittedEvents from './features/submitEvents/MySubmittedEvents';
import AdminDashboard from './pages/AdminDashboard';
import AdminEventManagement from './pages/AdminEventManagement';
import Setting from './pages/Setting';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Unauthorized from './pages/Unauthorized';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './ui/ProtectedRoute';
import TermsConditions from './features/TermsConditions';
import Footer from './ui/Footer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // cacheTime: 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="events" element={<EventList />} />
            <Route path="events/:eventId" element={<EventFullInfo />} />
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
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/events"
              element={
                <ProtectedRoute adminOnly>
                  <AdminEventManagement />{' '}
                </ProtectedRoute>
              }
            />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="terms-and-conditions" element={<TermsConditions />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 4000,
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
