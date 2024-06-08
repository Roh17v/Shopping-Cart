import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../data/items.json";
import { currencyFormatter } from "../utilities/currencyFormatter";

type CartItemsProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemsProps) {
  const { removeFromCart } = useShoppingCart();
  const item = StoreItems.find((item) => item.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item?.imgUrl}
        style={{ height: "75px", width: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name + " "}
          {quantity > 0 && (
            <span style={{ fontSize: "0.70rem" }} className="text-muted">
              x{quantity}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".80rem" }}>
          {item?.price && (
            <span className="text-muted">{currencyFormatter(item.price)}</span>
          )}
        </div>
      </div>
      <div>
        <div>{item?.price && currencyFormatter(item.price * quantity)}</div>
      </div>
      <Button variant="outline-danger" onClick={() => removeFromCart(id)}>
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
