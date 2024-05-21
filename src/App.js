import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Services from './Components/Services';
import Signup from './Components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App" style={{ backgroundColor: 'rgb(240, 255, 252)' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/signup' element={<Signup/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
