'use client';

import { useState } from 'react';
import { Users, Search, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  measurements: number;
  lastVisit: string;
  status: 'active' | 'inactive';
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const customers: Customer[] = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com', measurements: 12, lastVisit: '2024-01-15', status: 'active' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane@example.com', measurements: 8, lastVisit: '2024-01-10', status: 'active' },
    { id: 3, name: 'Robert Johnson', phone: '+1 (555) 456-7890', measurements: 3, lastVisit: '2023-12-20', status: 'inactive' },
    { id: 4, name: 'Sarah Williams', phone: '+1 (555) 234-5678', email: 'sarah@example.com', measurements: 15, lastVisit: '2024-01-14', status: 'active' },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery) ||
                         customer.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <Link
          href="/customers/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Phone:</span>
                {customer.phone}
              </div>
              {customer.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  {customer.email}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Measurements:</span>
                {customer.measurements} records
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Last Visit:</span>
                {customer.lastVisit}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 flex space-x-3">
              <Link
                href={`/customers/${customer.id}`}
                className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                View Details
              </Link>
              <Link
                href={`/measurements/new?customer=${customer.id}`}
                className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                New Measurement
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search or filter' : 'Start by adding your first customer'}
          </p>
          <Link
            href="/customers/new"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Customer
          </Link>
        </div>
      )}
    </div>
  );
}