import { Button, Container, Nav, Navbar as Navbarbs } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useShoppingCart } from "../context/ShoppingCartContext";

function Navbar() {
  const { cartQuantity, openCart } = useShoppingCart();
  const { user, signOut } = useAuth();
  const { setCartItems } = useShoppingCart();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbarbs sticky="top" className="bg-white shadow-sm mb-4" expand="lg">
      <Container>
        <Navbarbs.Brand as={Link} to="/">
          Brand
        </Navbarbs.Brand>

        {/* Cart button for small screens */}
        {cartQuantity > 0 && (
          <Button
            className="d-lg-none rounded-circle ms-auto me-2"
            variant="outline-primary"
            style={{ height: "3rem", width: "3rem", position: "relative" }}
            onClick={openCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div
              className="rounded-circle bg-danger"
              style={{
                color: "white",
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "1.5rem",
                height: "1.5rem",
                transform: "translate(25%,25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}

        {/* Menu toggle button */}
        <Navbarbs.Toggle
          aria-controls="navbarScroll"
          className="d-lg-none ms-2"
        />

        <Navbarbs.Collapse id="navbarScroll">
          <Nav className="mx-auto fs-4 d-flex align-items-center">
            <Nav.Link
              to={"/"}
              as={NavLink}
              style={{
                color: isActive("/") ? "#007bff" : "inherit",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to={"/store"}
              as={NavLink}
              style={{
                color: isActive("/store") ? "#007bff" : "inherit",
              }}
            >
              Store
            </Nav.Link>
            <Nav.Link
              to={"/about"}
              as={NavLink}
              style={{
                color: isActive("/about") ? "#007bff" : "inherit",
              }}
            >
              About
            </Nav.Link>
          </Nav>
          {cartQuantity > 0 && (
            <Button
              className="d-none d-md-block rounded-circle me-4"
              variant="outline-primary"
              style={{ height: "3rem", width: "3rem", position: "relative" }}
              onClick={openCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <div
                className="rounded-circle bg-danger"
                style={{
                  color: "white",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "1.5rem",
                  height: "1.5rem",
                  transform: "translate(25%,25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          )}
          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
            {user ? (
              <Button
                variant="primary"
                className="rounded p-2"
                onClick={() => {
                  signOut();
                  setCartItems([]);
                }}
              >
                Log Out
              </Button>
            ) : (
              <Link to={"/signin"}>
                <Button variant="primary" className="rounded p-2">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Navbarbs.Collapse>
      </Container>
    </Navbarbs>
  );
}

export default Navbar;
