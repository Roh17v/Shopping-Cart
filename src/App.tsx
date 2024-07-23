import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth-context.js";
import { ProductContextProvider } from "./context/Product-context.tsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import About from "./pages/About/About";
import AddProducts from "./pages/Add Products/AddProducts.tsx";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn.js";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Store from "./pages/Store/Store";

function App() {
  return (
    <>
      <AuthProvider>
        <ProductContextProvider>
          <ShoppingCartProvider>
            <Navbar />
            <Container>
              <ToastContainer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/addproducts" element={<AddProducts />} />
              </Routes>
            </Container>
          </ShoppingCartProvider>
        </ProductContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
