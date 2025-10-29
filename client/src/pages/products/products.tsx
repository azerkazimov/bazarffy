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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">

      <div className="container py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-white/60">Discover and manage amazing products</p>
          </div>
          <button 
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105" 
            onClick={handleOpenModal}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white/40">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white/80">No products yet</h3>
            <p className="text-white/60 mb-6">Get started by adding your first product</p>
            <button 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30" 
              onClick={handleOpenModal}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Your First Product</span>
            </button>
          </div>
        )}
      </div>
      <ProductForm />
    </div>
  );
}
