import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Summary from './components/Summary';
import SearchBar from './components/SearchBar';
import { products as initialProducts } from './data/products';
import { SalesData, Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [salesData, setSalesData] = useState<SalesData>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSalesData(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleIncentiveChange = (productId: string, percentage: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, incentivePercentage: percentage }
        : product
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sales Incentive Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your sales and incentives in real-time</p>
          </div>

          <Summary products={products} salesData={salesData} />
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <ProductList
            products={products}
            salesData={salesData}
            onQuantityChange={handleQuantityChange}
            onIncentiveChange={handleIncentiveChange}
            searchQuery={searchQuery}
          />
        </div>
      </main>
    </div>
  );
}

export default App;