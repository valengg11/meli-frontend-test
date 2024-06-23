import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/meli-logo.png";
import "./SearchBox.scss";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("search");
      if (query) {
        setQuery(query);
      } else {
        setQuery("");
      }
    },
    [location]
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <div>
        <img src={logo} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Nunca dejes de buscar"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
