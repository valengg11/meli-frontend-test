// src/components/SearchResults.jsx
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";
import "./SearchResults.scss";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("search");

      if (query) {
        axios
          .get(`http://localhost:3001/api/items?q=${query}`)
          .then(response => {
            setResults(response.data.items);
          })
          .catch(error => console.error("Error fetching results:", error));
      }
    },
    [location]
  );

  return (
    <ContentWrapper>
      <ul className="search-results">
        {results.map(item =>
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              <img src={item.picture} alt={item.title} />
              <div className="info-container">
                <div>
                  <h3>
                    $ {new Intl.NumberFormat("es-AR").format(item.price.amount)}
                    {item.free_shipping && <CiDeliveryTruck />}
                  </h3>
                </div>

                <p>
                  {item.title} {item.condition === "new" ? "Nuevo" : "Usado"}
                </p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </ContentWrapper>
  );
}

export default SearchResults;
