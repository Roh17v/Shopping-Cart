import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import { currencyFormatter } from "../utilities/currencyFormatter";
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const totalPrice = cartItems.reduce((price, currItem) => {
    const product = StoreItems.find((product) => product.id === currItem.id);
    return price + currItem.quantity * (product?.price || 0);
  }, 0);
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3} direction="vertical">
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="ms-auto fs-5 fw-bold">
            Total:{currencyFormatter(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
