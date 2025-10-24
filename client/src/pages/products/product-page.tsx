import { useProductStore } from "@/store/products.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ProductPage() {
    const { id } = useParams();
    const { products, getProducts } = useProductStore();
    useEffect(() => {
        getProducts();
    }, [getProducts]);
  return (
    <div className="product-page">
        <h1 className="product-page-title">{products?.find((product) => product._id === id)?.name}</h1>
        <p className="product-page-description">{products?.find((product) => product._id === id)?.description}</p>
        <p className="product-page-price">{products?.find((product) => product._id === id)?.price}</p>
        <img src={products?.find((product) => product._id === id)?.image} alt={products?.find((product) => product._id === id)?.name} />
    </div>
  )
}
