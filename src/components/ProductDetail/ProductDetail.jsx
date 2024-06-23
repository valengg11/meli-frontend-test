import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { formatPrice, getRandomSoldAmount } from "../../utils/Utils";
import "./ProductDetail.scss";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const DEFAULT_PRODUCT_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
  laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet porttitor venenatis.
  Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus 
  dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.`;

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

  if (loading) return <div>Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  console.log(product);
  return (
    <ContentWrapper>
      <div className="product-detail-container">
        <div className="product-description-container">
          <div className="product-picture-container">
            <img src={product.picture} />
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
          <button>Comprar</button>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default ProductDetail;
