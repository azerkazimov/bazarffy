import { useProductStore } from "@/store/products.store";
import { useModalStore } from "@/store/modal.store";
import type { Product } from "@/types/product.types";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  showDelete?: boolean;
}

export default function ProductCard({
  product,
  showDelete = false,
}: ProductCardProps) {
  const { deleteProduct } = useProductStore();
  const { openModalWithProduct } = useModalStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product._id);
    }
  };
  
  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModalWithProduct(product);
  };

  return (
    <Link to={`/shop/${product._id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative w-full aspect-3/4 mb-4 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Delete Button - Shows on hover and only if showDelete is true */}
          {isHovered && showDelete && (
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className=" bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all shadow-lg"
                onClick={handleUpdate}
                aria-label="Update product"
              >
                <PencilIcon className="w-4 h-4 text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className=" bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all shadow-lg"
                onClick={handleDelete}
                aria-label="Delete product"
              >
                <TrashIcon className="w-4 h-4 text-gray-700" />
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-gray-900 font-light text-base flex-1">
            {product.name}
          </h3>
          <p className="text-gray-900 font-light text-base whitespace-nowrap">
            {product.price.toFixed(2)} £
          </p>
        </div>
      </div>
    </Link>
  );
}
