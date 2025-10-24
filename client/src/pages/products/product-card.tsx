import { useProductStore } from "@/store/products.store";
import type { Product } from "@/types/product.types";
import { Link } from "react-router-dom";
import { TrashIcon } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { deleteProduct } = useProductStore();
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteProduct(product._id);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card">
        <div className="remove-button" onClick={handleDelete}>
          <TrashIcon />
        </div>
        <img src={product.image} alt={product.name} />
        <div className="product-card-content">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
