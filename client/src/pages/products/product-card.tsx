import { useProductStore } from "@/store/products.store";
import type { Product } from "@/types/product.types";
import { Link } from "react-router-dom";
import { TrashIcon } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { deleteProduct } = useProductStore();
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product._id);
    }
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div className="relative flex flex-col items-center gap-4 border border-white/10 rounded-2xl p-0 w-full h-96 bg-white/5 backdrop-blur-md shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 overflow-hidden group">
        <button 
          className="absolute top-4 right-4 bg-red-500/20 border border-red-500/30 rounded-xl p-2.5 hover:bg-red-500/30 hover:border-red-500/50 active:bg-red-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 z-10 transition-all backdrop-blur-sm" 
          onClick={handleDelete}
          aria-label="Delete product"
        >
          <TrashIcon className="w-5 h-5 text-red-400" />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-md text-white p-6 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-2 text-white">{product.name}</h2>
          <p className="text-sm text-white/80 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">${product.price.toFixed(2)}</p>
            <span className="text-sm text-white/60">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
