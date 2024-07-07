import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Services from './Components/Services';
import Signup from './Components/Signup';
import AddProduct from './Components/AddProduct';
import BuildPC from './Components/BuildPC';
import Verification from './Components/Verification';
import CategoryProducts from './Components/CategoryProducts';
import ViewProduct from './Components/ViewProduct';
import Account from './Components/Account';
import Cart from './Components/Cart';
import AddAddress from './Components/AddAddress';
import YourAccount from './Components/YourAccount';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App " style={{ backgroundColor: 'rgb(240, 255, 252)' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/services' element={<Services />} />
          {/* <Route exact path='/signup' element={<Signup/>} /> */}
          <Route exact path='/addproduct' element={<AddProduct/>} />
          <Route exact path='/build' element={<BuildPC/>} />
          <Route exact path='/verify' element={<Verification/>} />
          <Route exact path='/categoryProduct' element={<CategoryProducts/>} />
          <Route exact path='/viewProduct/:productId' element={<ViewProduct/>} />
          <Route exact path='/account' element={<YourAccount/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/addAddress' element={<AddAddress/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
