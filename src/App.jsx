import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import SearchBox from './components/SearchBox/SearchBox';
import {CategoriesProvider} from './contexts/CategoriesContext';

const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));

function App() {
  return (
    <CategoriesProvider>
      <Router>
        <SearchBox/>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<SearchResultsPage />} />
            <Route path="/items/:id" element={<ProductDetailPage />} />
          </Routes>
        </Suspense>
          
      </Router> 
    </CategoriesProvider>
  );
}

function Home() {
  return (
    <></>
  );
}

export default App;
