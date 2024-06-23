import "./ContentWrapper.scss"

function ContentWrapper({children}) {
    return (
      <div className="content-wrapper">
        <div className="content-container">
           {children} 
        </div>
        
      </div>
    )
  }
  
  export default ContentWrapper;