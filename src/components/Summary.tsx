import React, { useState } from 'react';
import { Product, SalesData } from '../types';
import { Download, MessageSquare, X, TrendingUp, Package, DollarSign } from 'lucide-react';

interface SummaryProps {
  products: Product[];
  salesData: SalesData;
}

const Summary: React.FC<SummaryProps> = ({ products, salesData }) => {
  const [showChat, setShowChat] = useState(false);

  const calculateTotalSales = () => {
    return products.reduce((total, product) => {
      return total + (product.price * (salesData[product.id] || 0));
    }, 0);
  };

  const calculateTotalIncentives = () => {
    return products.reduce((total, product) => {
      const quantity = salesData[product.id] || 0;
      return total + (product.price * quantity * product.incentivePercentage / 100);
    }, 0);
  };

  const calculateTotalUnits = () => {
    return Object.values(salesData).reduce((total, quantity) => total + quantity, 0);
  };

  const handleDownload = () => {
    const data = products.map(product => ({
      Product: product.name,
      'Units Sold': salesData[product.id] || 0,
      'Total Sales': (product.price * (salesData[product.id] || 0)).toFixed(2),
      'Incentive Earned': ((product.price * (salesData[product.id] || 0) * product.incentivePercentage) / 100).toFixed(2)
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_incentive_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topPerformingProducts = products
    .map(product => ({
      name: product.name,
      revenue: product.price * (salesData[product.id] || 0),
      units: salesData[product.id] || 0
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <DollarSign className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600">${calculateTotalSales().toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Overall revenue generated</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Incentives</h3>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">${calculateTotalIncentives().toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Your earned commission</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Units Sold</h3>
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{calculateTotalUnits()}</p>
          <p className="text-sm text-gray-500 mt-2">Total units processed</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              View Summary
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Performance Summary</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-800">
                  👋 Here's your sales performance summary:
                </p>
              </div>
              
              <div className="bg-indigo-100 rounded-lg p-4">
                <p className="text-indigo-800">
                  💰 Total Sales: ${calculateTotalSales().toFixed(2)}
                  <br />
                  🎯 Total Incentives: ${calculateTotalIncentives().toFixed(2)}
                  <br />
                  📦 Total Units: {calculateTotalUnits()}
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-800">
                  🏆 Top Performing Products:
                </p>
              </div>

              {topPerformingProducts.map((product, index) => (
                <div key={index} className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-800">
                    #{index + 1} {product.name}
                    <br />
                    Revenue: ${product.revenue.toFixed(2)}
                    <br />
                    Units: {product.units}
                  </p>
                </div>
              ))}

              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-800">
                  📊 Download the detailed report for more insights!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;