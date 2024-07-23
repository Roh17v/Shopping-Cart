import { collection, getDocs } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase/firebase-config";

type ProductContextProp = {
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

type ProductContextProviderProp = {
  children: ReactNode;
};

const ProductContext = createContext({} as ProductContextProp);

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductContextProvider: React.FC<ProductContextProviderProp> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>();

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

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
