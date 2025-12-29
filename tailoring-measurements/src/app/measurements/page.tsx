'use client';

import { useState } from 'react';
import { 
  Ruler, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  ChevronDown,
  Printer,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface Measurement {
  id: number;
  customerName: string;
  customerId: number;
  type: 'shirt' | 'pants' | 'suit' | 'blouse' | 'dress' | 'custom';
  date: string;
  status: 'draft' | 'confirmed' | 'completed';
  lastUpdated: string;
  items: number;
}

export default function MeasurementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const measurements: Measurement[] = [
    { id: 1, customerName: 'John Doe', customerId: 101, type: 'suit', date: '2024-01-15', status: 'completed', lastUpdated: '2 hours ago', items: 5 },
    { id: 2, customerName: 'Jane Smith', customerId: 102, type: 'dress', date: '2024-01-14', status: 'confirmed', lastUpdated: '1 day ago', items: 8 },
    { id: 3, customerName: 'Robert Johnson', customerId: 103, type: 'shirt', date: '2024-01-14', status: 'draft', lastUpdated: 'Just now', items: 3 },
    { id: 4, customerName: 'Sarah Williams', customerId: 104, type: 'pants', date: '2024-01-13', status: 'completed', lastUpdated: '3 days ago', items: 4 },
    { id: 5, customerName: 'Michael Brown', customerId: 105, type: 'blouse', date: '2024-01-12', status: 'confirmed', lastUpdated: '4 days ago', items: 6 },
    { id: 6, customerName: 'Emily Davis', customerId: 106, type: 'custom', date: '2024-01-11', status: 'completed', lastUpdated: '1 week ago', items: 10 },
    { id: 7, customerName: 'David Wilson', customerId: 107, type: 'suit', date: '2024-01-10', status: 'draft', lastUpdated: '2 weeks ago', items: 7 },
    { id: 8, customerName: 'Lisa Anderson', customerId: 108, type: 'dress', date: '2024-01-09', status: 'completed', lastUpdated: '2 weeks ago', items: 9 },
  ];

  const measurementTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'shirt', label: 'Shirts' },
    { value: 'pants', label: 'Pants' },
    { value: 'suit', label: 'Suits' },
    { value: 'blouse', label: 'Blouses' },
    { value: 'dress', label: 'Dresses' },
    { value: 'custom', label: 'Custom' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
  ];

  const periodOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Customer Name' },
    { value: 'type', label: 'Measurement Type' },
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      shirt: 'bg-blue-100 text-blue-800',
      pants: 'bg-green-100 text-green-800',
      suit: 'bg-purple-100 text-purple-800',
      blouse: 'bg-pink-100 text-pink-800',
      dress: 'bg-red-100 text-red-800',
      custom: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredMeasurements = measurements.filter(measurement => {
    const matchesSearch = measurement.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         measurement.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || measurement.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || measurement.status === selectedStatus;
    
    // Filter by period (simplified for demo)
    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const measurementDate = new Date(measurement.date);
      const today = new Date();
      
      switch (selectedPeriod) {
        case 'today':
          matchesPeriod = measurementDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          matchesPeriod = measurementDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          matchesPeriod = measurementDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesPeriod;
  });

  // Sort measurements
  const sortedMeasurements = [...filteredMeasurements].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'name':
        return a.customerName.localeCompare(b.customerName);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const handleExport = () => {
    // Implement export functionality
    alert('Export functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Measurements</h1>
          <p className="text-gray-600">Manage and view all customer measurements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="h-5 w-5" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <Link
            href="/measurements/new"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Ruler className="h-5 w-5" />
            <span>New Measurement</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Measurements</p>
              <p className="text-2xl font-bold mt-2">{measurements.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Ruler className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold mt-2">
                {measurements.filter(m => m.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Draft</p>
              <p className="text-2xl font-bold mt-2">
                {measurements.filter(m => m.status === 'draft').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold mt-2">
                {measurements.filter(m => {
                  const date = new Date(m.date);
                  const now = new Date();
                  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name or measurement type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Measurement Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {measurementTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {periodOptions.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Measurements Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Items</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Last Updated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMeasurements.map((measurement) => (
                <tr key={measurement.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{measurement.customerName}</div>
                        <div className="text-sm text-gray-500">ID: {measurement.customerId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(measurement.type)}`}>
                      {measurement.type.charAt(0).toUpperCase() + measurement.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(measurement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(measurement.status)}`}>
                      {measurement.status.charAt(0).toUpperCase() + measurement.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">{measurement.items}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {measurement.lastUpdated}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(`/measurements/${measurement.id}`, '_blank')}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => window.open(`/measurements/${measurement.id}/edit`, '_blank')}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this measurement?')) {
                            // Handle delete
                          }
                        }}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedMeasurements.length === 0 && (
          <div className="text-center py-12">
            <Ruler className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No measurements found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search filters' : 'Start by creating your first measurement'}
            </p>
            <Link
              href="/measurements/new"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <Ruler className="h-5 w-5 mr-2" />
              Create New Measurement
            </Link>
          </div>
        )}

        {/* Table Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{sortedMeasurements.length}</span> of{' '}
              <span className="font-medium">{measurements.length}</span> measurements
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurements by Type</h3>
          <div className="space-y-4">
            {['shirt', 'pants', 'suit', 'dress', 'blouse', 'custom'].map(type => {
              const count = measurements.filter(m => m.type === type).length;
              const percentage = (count / measurements.length) * 100;
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize">{type}</span>
                    <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getTypeColor(type).split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {measurements.slice(0, 4).map(measurement => (
              <div key={measurement.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(measurement.type).split(' ')[0]}`}>
                    <Ruler className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{measurement.customerName}</div>
                    <div className="text-xs text-gray-500">
                      {measurement.type.charAt(0).toUpperCase() + measurement.type.slice(1)} • {measurement.lastUpdated}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(measurement.status)}`}>
                  {measurement.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}