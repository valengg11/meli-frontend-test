import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchResults from "../components/SearchResults/SearchResults";
import { CategoriesContext } from "../contexts/CategoriesContext";
import Loader from "../components/Loader/Loader";

function SearchResultsPage() {
  const { setCategories } = useContext(CategoriesContext);
  const [items, setItems] = useState([]);
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

  return <SearchResults items={items} />;
}

export default SearchResultsPage;
