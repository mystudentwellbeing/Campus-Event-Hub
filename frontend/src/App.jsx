import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './ui/navbar/Navbar';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import Footer from './ui/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
