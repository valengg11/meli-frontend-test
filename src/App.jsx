import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import SearchBox from './components/SearchBox/SearchBox';

const SearchResults = lazy(() => import('./components/SearchResults/SearchResults'));
const ProductDetail = lazy(() => import('./components/ProductDetail/ProductDetail'));

function App() {
  return (
    <Router>
      <SearchBox/>
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ProductDetail />} />
      </Routes>
      </Suspense>
      
    </Router>
  );
}

function Home() {
  return (
    <></>
  );
}

export default App;
