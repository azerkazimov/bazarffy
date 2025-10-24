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
    <div className="modal-overlay">
      <div className="product-form-modal">
        <h2>Create New Product</h2>
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              {...register("name")}
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              {...register("description")}
            />
            {errors.description && (
              <span className="error-text">{errors.description.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <span className="error-text">{errors.price.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (Optional)</label>
            <input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("image")}
            />
            {errors.image && (
              <span className="error-text">{errors.image.message}</span>
            )}
          </div>

          <div className="product-form-actions">
            <button
              type="button"
              className="product-form-cancel"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="product-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
