import React from 'react';
import {  Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const userOrders = getUserOrders(user?.id || '');


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

<div className="flex flex-col lg:flex-row gap-6 mb-8">
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full lg:w-1/4 flex items-start">
    <div className="p-3 rounded-lg bg-blue-500">
      <Package className="w-6 h-6 text-white" />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-600">Total Orders</p>
      <p className="text-xl font-bold text-gray-900">{userOrders.length}</p>
    </div>
  </div>

  {/* Profile Info */}
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full lg:w-3/4">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
    <div className="space-y-2">
      <p className="text-sm text-gray-700">
        <span className="font-medium">Name:</span> {user?.name}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-medium">Email:</span> {user?.email}
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Dashboard;