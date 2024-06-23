import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { DEFAULT_PRODUCT_DESCRIPTION, formatPrice } from "../../utils/Utils";
import "./ProductDetail.scss";
import Button from "../Button/Button";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(
    () => {
      setLoading(true);
      axios
        .get(`http://localhost:3001/api/items/${id}`)
        .then(response => {
          setProduct(response.data.item);
        })
        .catch(error => console.error("Error fetching product details:", error))
        .finally(() => setLoading(false));
    },
    [id]
  );

  if (loading) return <div className="alert">Cargando...</div>;

  return (
    <ContentWrapper>
      <div className="product-detail-container">
        <div className="product-description-container">
          <div className="product-picture-container">
            <img src={product.picture} alt={product.title} />
          </div>

          <h3>Descripción del producto</h3>
          <p>
            {product.description
              ? product.description
              : DEFAULT_PRODUCT_DESCRIPTION}
          </p>
        </div>
        <div className="product-price-container">
          <span>
            {product.condition === "new" ? `Nuevo` : "Usado"}
            {product.sold_quantity ? `- ${product.sold_quantity} Vendidos` : ""}
          </span>
          <h2>
            {product.title}
          </h2>
          <span>
            $ {formatPrice(product.price.amount)}
          </span>
          <Button onClick={() => alert("Clicked!")} text="Comprar" />
        </div>
      </div>
    </ContentWrapper>
  );
}

export default ProductDetail;
