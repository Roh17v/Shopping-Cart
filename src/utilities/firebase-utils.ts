import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase/firebase-config";


const storage = getStorage();

const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const addProduct = async (product: {
  name: string;
  price: number;
  description: string;
  imageFile: File;
}) => {
  try {
    const imageURL = await uploadImage(product.imageFile);
    const productData = {
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: imageURL,
    };
    await addDoc(collection(db, "products"), productData);
    console.log("Product added successfully");
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

export { addProduct, uploadImage };
