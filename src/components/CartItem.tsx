import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { db } from "../firebase/firebase-config";
import { currencyFormatter } from "../utilities/currencyFormatter";

type CartItemsProps = {
  id: string;
  quantity: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

function CartItem({ id, quantity }: CartItemsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, "products");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    };

    fetchProducts();
  }, []);
  const { removeFromCart } = useShoppingCart();
  const item = products.find((item) => item.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item?.imageUrl}
        style={{ height: "75px", width: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          <span
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
          >
            {item?.name + " "}
          </span>
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
