// src/components/SearchResults.jsx
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { formatPrice } from "../../utils/Utils";
import "./SearchResults.scss";

function SearchResults() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("search");

      if (query) {
        axios
          .get(`http://localhost:3001/api/items?q=${query}`)
          .then(response => {
            setItems(response.data.items);
            setCategories(response.data.categories);
          })
          .catch(error => console.error("Error fetching results:", error));
      }
    },
    [location]
  );

  return (
    <ContentWrapper categories={categories}>
      <div className="search-results">
        {items.map(item =>
          <Link to={`/items/${item.id}`} key={item.id}>
            <div className="product-picture-container">
              <img src={item.picture} alt={item.title} />
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
