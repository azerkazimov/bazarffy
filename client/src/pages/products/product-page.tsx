import { useProductStore } from "@/store/products.store";
import { ArrowLeftIcon } from "lucide-react";
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
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[600px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Description</h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="flex-1 px-8 py-4 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="px-6 py-4 border border-gray-300 text-gray-700 rounded hover:border-gray-900 hover:text-gray-900 transition-colors">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Product Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="inline-flex items-center gap-2 text-green-600 font-medium">
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
