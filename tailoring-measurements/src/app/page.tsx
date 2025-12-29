'use client';

import { useState } from 'react';
import { 
  Users, 
  Ruler, 
  Calendar, 
  TrendingUp,
  Search,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Customers', value: '45', icon: Users, change: '+12%' },
    { label: 'Measurements Today', value: '8', icon: Ruler, change: '+2' },
    { label: 'Pending Orders', value: '15', icon: Calendar, change: '-3' },
    { label: 'Completion Rate', value: '94%', icon: TrendingUp, change: '+4%' },
  ];

  const recentMeasurements = [
    { id: 1, name: 'John Doe', type: 'Suit', date: 'Today', status: 'Draft' },
    { id: 2, name: 'Jane Smith', type: 'Dress', date: 'Yesterday', status: 'Confirmed' },
    { id: 3, name: 'Robert Johnson', type: 'Shirt', date: '2 days ago', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your tailoring management system</p>
        </div>
        <Link
          href="/measurements/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Measurement</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers, measurements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Measurements */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Measurements</h2>
          <Link href="/measurements" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentMeasurements.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{item.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Add New Customer</h3>
          <p className="text-blue-100 mb-4">Start by adding a new customer profile</p>
          <Link href="/customers/new" className="inline-flex items-center text-sm font-medium">
            Create Customer →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Quick Measurement</h3>
          <p className="text-purple-100 mb-4">Take measurements for existing customer</p>
          <Link href="/measurements/new" className="inline-flex items-center text-sm font-medium">
            Start Measuring →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">View Reports</h3>
          <p className="text-green-100 mb-4">Check monthly statistics and reports</p>
          <Link href="/reports" className="inline-flex items-center text-sm font-medium">
            View Reports →
          </Link>
        </div>
      </div>
    </div>
  );
}