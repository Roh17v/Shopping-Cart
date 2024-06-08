import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
