import React from 'react';
import { LayoutDashboard, DollarSign, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-indigo-900 text-white h-screen w-64 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <DollarSign className="w-8 h-8" />
        <h1 className="text-xl font-bold">Sales Incentives</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          <li className="flex items-center gap-3 p-3 bg-indigo-800 rounded-lg cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-indigo-800 rounded-lg cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span>Reports</span>
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-indigo-800 rounded-lg cursor-pointer">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto p-4 bg-indigo-800 rounded-lg">
        <p className="text-sm">Need help?</p>
        <p className="text-xs text-indigo-300">Contact support</p>
      </div>
    </div>
  );
};

export default Sidebar;