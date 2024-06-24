import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ProductDetail from '../components/ProductDetail/ProductDetail';

function ProductDetailPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
  
    useEffect(
      () => {
        setLoading(true);
        setError(null);
        axios
          .get(`http://localhost:3001/api/items/${id}`)
          .then(response => {
            setProduct(response.data.item);
          })
          .catch(error => {
            console.error("Error fetching product details:", error);
            setError("No se encontró el producto.");
          })
          .finally(() => setLoading(false));
      },
      [id]
    );
  
    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return (
        <div className="alert error">
          {error}
        </div>
      );
    }

  return (
      <ProductDetail product={product} />
  );
}

export default ProductDetailPage;