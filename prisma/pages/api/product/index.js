import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";

export default function Home() {
  return (
    <div>
      <h1>Ruby Silver Shop 🛒</h1>
      <AddProductForm />
      <ProductList />
    </div>
  );
}
