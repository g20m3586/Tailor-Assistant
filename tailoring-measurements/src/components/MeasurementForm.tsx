'use client';

import { useState } from 'react';
import { Ruler, Save, Printer, User } from 'lucide-react';

type MeasurementType = 'shirt' | 'pants' | 'suit' | 'blouse' | 'dress' | 'custom';

export default function MeasurementForm() {
  const [measurementType, setMeasurementType] = useState<MeasurementType>('shirt');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Shirt measurements
  const [shirtMeasurements, setShirtMeasurements] = useState({
    neck: '',
    chest: '',
    waist: '',
    hips: '',
    shoulderWidth: '',
    sleeveLength: '',
    bicep: '',
    wrist: '',
    shirtLength: '',
    backLength: '',
    frontLength: '',
  });

  // Pants measurements
  const [pantsMeasurements, setPantsMeasurements] = useState({
    waist: '',
    hips: '',
    inseam: '',
    outseam: '',
    thigh: '',
    knee: '',
    ankle: '',
    rise: '',
  });

  const measurementTypes = [
    { value: 'shirt', label: 'Shirt', color: 'bg-blue-100 text-blue-800' },
    { value: 'pants', label: 'Pants', color: 'bg-green-100 text-green-800' },
    { value: 'suit', label: 'Suit', color: 'bg-purple-100 text-purple-800' },
    { value: 'blouse', label: 'Blouse', color: 'bg-pink-100 text-pink-800' },
    { value: 'dress', label: 'Dress', color: 'bg-red-100 text-red-800' },
    { value: 'custom', label: 'Custom', color: 'bg-gray-100 text-gray-800' },
  ];

  const handleShirtMeasurementChange = (field: string, value: string) => {
    setShirtMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handlePantsMeasurementChange = (field: string, value: string) => {
    setPantsMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      measurementType,
      customerName,
      customerPhone,
      shirtMeasurements,
      pantsMeasurements,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Ruler className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Measurement</h1>
            <p className="text-gray-600">Record customer measurements digitally</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="h-5 w-5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Save className="h-5 w-5" />
            <span>Save Measurement</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Measurement Type Selection */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Measurement Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {measurementTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setMeasurementType(type.value as MeasurementType)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  measurementType === type.value
                    ? `border-blue-500 ${type.color}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{type.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Shirt Measurements */}
        {measurementType === 'shirt' && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Shirt Measurements (in cm)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(shirtMeasurements).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={value}
                    onChange={(e) => handleShirtMeasurementChange(field, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="0.0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pants Measurements */}
        {measurementType === 'pants' && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Pants Measurements (in cm)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(pantsMeasurements).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={value}
                    onChange={(e) => handlePantsMeasurementChange(field, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="0.0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suit Measurements (Combination) */}
        {measurementType === 'suit' && (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Jacket Measurements (in cm)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['chest', 'waist', 'hips', 'shoulderWidth', 'sleeveLength', 'backLength'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.split(/(?=[A-Z])/).join(' ')}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pants Measurements (in cm)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(pantsMeasurements).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Notes</h2>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Add any special instructions, preferences, or notes here..."
          />
        </div>
      </form>
    </div>
  );
}