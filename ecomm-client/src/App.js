import Navbar from "./components/navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Product from "./pages/product";
import Cart from "./pages/cart";
import { CartProvider } from "react-use-cart"
import Categories from "./components/categories";
import ProductByCategory from "./pages/productByCategory";
import ProtectedRoute from "./components/protectedRoute";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {!hideNavbar && <Categories />}
      <Routes>
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/product/:pid" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/category/:cid" element={<ProtectedRoute><ProductByCategory/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider idAttribute="id">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
