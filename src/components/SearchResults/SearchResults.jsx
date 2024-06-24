import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CiDeliveryTruck } from "react-icons/ci";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { formatPrice } from "../../utils/Utils";
import { CategoriesContext } from "../../contexts/CategoriesContext";

import "./SearchResults.scss";
import {useContext} from "react";

function SearchResults({ items }) {
  const { categories} = useContext(CategoriesContext);
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
