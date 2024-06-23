import "./ContentWrapper.scss"

function ContentWrapper({children, categories}) {
    return (
      <div className="content-wrapper">
        <div className="categories">{categories && categories.map((cat) => <p key={cat}>{`${cat}>`}</p>)}</div>
        <div className="content-container">
           {children} 
        </div>
        
      </div>
    )
  }
  
  export default ContentWrapper;