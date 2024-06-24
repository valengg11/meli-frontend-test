import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Loader from "../Loader/Loader";
import { formatPrice } from "../../utils/Utils";
import "./SearchResults.scss";

function SearchResults() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("search");

      if (query) {
        setLoading(true);
        setError(null);
        setItems([]);
        axios
          .get(`http://localhost:3001/api/items?q=${query}`)
          .then(response => {
            setItems(response.data.items);
            setCategories(response.data.categories);
          })
          .catch(error => {
            console.error("Error fetching results:", error);
            setError(
              "Hubo un error al buscar los productos. Por favor, intenta de nuevo."
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setItems([]);
        setCategories([]);
        setLoading(false);
        setError(null);
      }
    },
    [location]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="alert">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="alert">No hay coincidencias. Intenta de nuevo.</div>;
  }

  return (
    <ContentWrapper categories={categories}>
      <div className="search-results">
        {items.map(item =>
          <Link to={`/items/${item.id}`} key={item.id}>
            <div className="product-picture-container">
              <LazyLoadImage
                src={`${item.picture}.webp`}
                alt={item.title}
                height="180px"
              />
            </div>
            <div className="info-container">
              <div>
                <span>
                  $ {formatPrice(item.price.amount)}
                  {item.free_shipping && <CiDeliveryTruck />}
                </span>
              </div>
              <p>
                {item.title} {item.condition === "new" ? "Nuevo" : "Usado"}
              </p>
            </div>
          </Link>
        )}
      </div>
    </ContentWrapper>
  );
}

export default SearchResults;
