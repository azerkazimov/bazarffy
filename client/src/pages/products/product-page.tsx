import { useProductStore } from "@/store/products.store";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";


export default function ProductPage() {
  const { id } = useParams();
  const { products, getProducts } = useProductStore();
  
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
  const product = products?.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white/40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white/80">Product Not Found</h2>
          <p className="text-white/60 mb-6">The product you're looking for doesn't exist</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto p-8">
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors group"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[500px] object-cover rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-sm font-semibold mb-4">
                Product Details
              </span>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {product.name}
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Description</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Price</h2>
              <p className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Product Information</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/60">Product ID</span>
                  <span className="text-white/90 font-mono text-sm">{product._id}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/60">Availability</span>
                  <span className="inline-flex items-center gap-2 text-green-400 font-semibold">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
