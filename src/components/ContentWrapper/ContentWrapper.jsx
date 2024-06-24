import {useContext} from "react";
import {CategoriesContext} from "../../contexts/CategoriesContext";

import "./ContentWrapper.scss";

function ContentWrapper({ children }) {
  const { categories } = useContext(CategoriesContext);
  return (
    <div className="content-wrapper">
      <div className="categories">
        <p>
          {categories && categories.join(" > ")}
        </p>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;
