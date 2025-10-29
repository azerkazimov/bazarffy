import { useProductStore } from "@/store/products.store";
import { useForm } from "react-hook-form";
import {
  productFormSchema,
  type ProductFormSchema,
} from "./product-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/modal.store";

export default function ProductForm() {
  const { createProduct } = useProductStore();
  const { isOpen, closeModal } = useModalStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = async (data: ProductFormSchema) => {
    try {
      // Remove empty image field if not provided
      const productData = {
        ...data,
        image: data.image && data.image.trim() !== '' ? data.image : undefined
      };
      await createProduct(productData);
      reset();
      closeModal();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleCancel = () => {
    reset();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Create New Product
            </h2>
            <p className="text-white/60 mt-1">Add a new product to your catalog</p>
          </div>
          <button 
            onClick={handleCancel}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all flex items-center justify-center"
            disabled={isSubmitting}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name" className="block font-semibold text-white/90 text-sm">Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              {...register("name")}
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.name && (
              <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <span>⚠</span>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block font-semibold text-white/90 text-sm">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              {...register("description")}
              rows={4}
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-vertical"
            />
            {errors.description && (
              <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <span>⚠</span>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="block font-semibold text-white/90 text-sm">Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 font-semibold">$</span>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
                className="w-full pl-8 pr-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            {errors.price && (
              <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <span>⚠</span>
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block font-semibold text-white/90 text-sm">Image URL (Optional)</label>
            <input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
              className="w-full px-4 py-3 border border-white/20 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {errors.image && (
              <span className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <span>⚠</span>
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:border-white/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-500/30"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
