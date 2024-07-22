import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { currencyFormatter } from "../utilities/currencyFormatter";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
        variant="top"
        loading="lazy"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between">
          <span className="fs-2">{name}</span>
          <span className="text-muted my-auto">{currencyFormatter(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => incrementItemQuantity(id)}>
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex justify-content center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => incrementItemQuantity(id)}>+</Button>
                <div>
                  <span className="fs-3">{quantity}</span>in cart
                </div>
                <Button onClick={() => decrementItemQuantity(id)}>-</Button>
              </div>
              <Button
                className=""
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
