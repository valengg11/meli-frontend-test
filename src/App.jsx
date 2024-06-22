import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/items?q=apple"
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return <div />;
}

export default App;
