import React from 'react';
import { Product, SalesData } from '../types';
import { Package } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  salesData: SalesData;
  onQuantityChange: (productId: string, quantity: number) => void;
  onIncentiveChange: (productId: string, percentage: number) => void;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  salesData,
  onQuantityChange,
  onIncentiveChange,
  searchQuery
}) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateIncentive = (price: number, quantity: number, percentage: number) => {
    return (price * quantity * percentage) / 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Incentive %
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Units Sold
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Incentive
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <tr 
              key={product.id} 
              className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={product.incentivePercentage}
                    onChange={(e) => onIncentiveChange(product.id, Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                    className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={salesData[product.id] || 0}
                    onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full min-w-[3rem] text-center">
                    {salesData[product.id] || 0}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block">
                  ${calculateIncentive(
                    product.price,
                    salesData[product.id] || 0,
                    product.incentivePercentage
                  ).toFixed(2)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;