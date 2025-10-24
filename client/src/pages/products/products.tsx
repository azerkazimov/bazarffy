import { useProductStore } from "@/store/products.store";
import { useEffect } from "react";
import ProductCard from "./product-card";
import { useModalStore } from "@/store/modal.store";
import ProductForm from "./product-form";

export default function Products() {
  const { products, getProducts } = useProductStore();
  const { openModal  } = useModalStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">Products Page</h1>
        <button className="products-button" onClick={handleOpenModal}>Add Product</button>
      </div>
      <div className="products-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <ProductForm />
    </div>
  );
}
