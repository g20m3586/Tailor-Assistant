'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Ruler, 
  Save, 
  Printer, 
  User, 
  X, 
  Plus,
  Upload,
  Calendar,
  ChevronLeft,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

type MeasurementType = 'shirt' | 'pants' | 'suit' | 'blouse' | 'dress' | 'custom';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export default function NewMeasurementPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [measurementType, setMeasurementType] = useState<MeasurementType>('shirt');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [searchCustomerQuery, setSearchCustomerQuery] = useState('');

  // Mock customers data
  const customers: Customer[] = [
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', email: 'jane@example.com' },
    { id: 3, name: 'Robert Johnson', phone: '+1 (555) 456-7890' },
    { id: 4, name: 'Sarah Williams', phone: '+1 (555) 234-5678', email: 'sarah@example.com' },
    { id: 5, name: 'Michael Brown', phone: '+1 (555) 345-6789', email: 'michael@example.com' },
  ];

  // Measurement states
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

  const [suitMeasurements, setSuitMeasurements] = useState({
    jacketChest: '',
    jacketWaist: '',
    jacketHips: '',
    jacketShoulder: '',
    jacketSleeve: '',
    jacketLength: '',
    pantsWaist: '',
    pantsHips: '',
    pantsInseam: '',
    pantsOutseam: '',
    pantsRise: '',
  });

  const [dressMeasurements, setDressMeasurements] = useState({
    bust: '',
    underBust: '',
    waist: '',
    hips: '',
    shoulderWidth: '',
    armhole: '',
    sleeveLength: '',
    dressLength: '',
    backLength: '',
    frontLength: '',
  });

  const [additionalNotes, setAdditionalNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');

  const measurementTypes = [
    { 
      value: 'shirt', 
      label: 'Shirt', 
      icon: '👔',
      description: 'Formal and casual shirts',
      recommended: true
    },
    { 
      value: 'pants', 
      label: 'Pants', 
      icon: '👖',
      description: 'Trousers and pants',
      recommended: true
    },
    { 
      value: 'suit', 
      label: 'Suit', 
      icon: '🤵',
      description: 'Complete suit with jacket and pants',
      recommended: false
    },
    { 
      value: 'blouse', 
      label: 'Blouse', 
      icon: '👚',
      description: 'Women\'s blouses and tops',
      recommended: false
    },
    { 
      value: 'dress', 
      label: 'Dress', 
      icon: '👗',
      description: 'Dresses and gowns',
      recommended: false
    },
    { 
      value: 'custom', 
      label: 'Custom', 
      icon: '🎨',
      description: 'Custom garment measurements',
      recommended: false
    },
  ];

  const handleShirtMeasurementChange = (field: string, value: string) => {
    setShirtMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handlePantsMeasurementChange = (field: string, value: string) => {
    setPantsMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleSuitMeasurementChange = (field: string, value: string) => {
    setSuitMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleDressMeasurementChange = (field: string, value: string) => {
    setDressMeasurements(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    const measurementData = {
      customer: selectedCustomer,
      type: measurementType,
      measurements: {
        shirt: shirtMeasurements,
        pants: pantsMeasurements,
        suit: suitMeasurements,
        dress: dressMeasurements,
      },
      additionalNotes,
      dueDate,
      priority,
      date: new Date().toISOString(),
    };

    console.log('Measurement saved:', measurementData);
    
    // Show success message and redirect
    alert('Measurement saved successfully!');
    router.push('/measurements');
  };

  const handlePrint = () => {
    window.print();
  };

  const nextStep = () => {
    if (step === 1 && !selectedCustomer) {
      alert('Please select a customer first');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchCustomerQuery.toLowerCase()) ||
    customer.phone.includes(searchCustomerQuery) ||
    customer.email?.toLowerCase().includes(searchCustomerQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/measurements"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Ruler className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">New Measurement</h1>
                <p className="text-gray-600">Step {step} of 3</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="h-5 w-5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              <span>Save Measurement</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
              1. Select Customer
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
              2. Choose Type
            </span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
              3. Take Measurements
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Customer Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Customer</h2>
              <p className="text-gray-600">Choose an existing customer or add a new one</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Existing Customers */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Customers</h3>
                
                {/* Search Bar */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchCustomerQuery}
                    onChange={(e) => setSearchCustomerQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Customers List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleCustomerSelect(customer)}
                      className={`w-full p-4 border rounded-lg text-left transition-all ${
                        selectedCustomer?.id === customer.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                          {customer.email && (
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          )}
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* New Customer & Selected Customer */}
              <div className="space-y-6">
                {/* Selected Customer Card */}
                {selectedCustomer ? (
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Selected Customer</h3>
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{selectedCustomer.name}</div>
                        <div className="text-sm text-gray-600">{selectedCustomer.phone}</div>
                        {selectedCustomer.email && (
                          <div className="text-sm text-gray-600">{selectedCustomer.email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No customer selected</h3>
                      <p className="text-gray-600 mb-4">
                        Select a customer from the list or add a new one
                      </p>
                    </div>
                  </div>
                )}

                {/* Add New Customer */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Customer</h3>
                  <p className="text-gray-600 mb-6">
                    Can't find the customer? Add a new one to your database.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCustomerModal(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Add New Customer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={nextStep}
                disabled={!selectedCustomer}
                className={`w-full py-3 rounded-lg font-medium ${
                  selectedCustomer
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Step 2
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Measurement Type */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Measurement Type</h2>
              <p className="text-gray-600">Select the type of garment you're measuring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {measurementTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setMeasurementType(type.value as MeasurementType)}
                  className={`p-6 border-2 rounded-xl transition-all text-left ${
                    measurementType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{type.icon}</span>
                    {type.recommended && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.label}</h3>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </button>
              ))}
            </div>

            {/* Selected Type Preview */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {measurementTypes.find(t => t.value === measurementType)?.label} Measurements
                  </h3>
                  <p className="text-gray-600">
                    You'll be asked for specific measurements for this garment type
                  </p>
                </div>
                <span className="text-4xl">
                  {measurementTypes.find(t => t.value === measurementType)?.icon}
                </span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Required measurements:</h4>
                <div className="flex flex-wrap gap-2">
                  {measurementType === 'shirt' && (
                    <>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Neck</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Chest</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Sleeve Length</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Shirt Length</span>
                    </>
                  )}
                  {measurementType === 'pants' && (
                    <>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Waist</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Hips</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Inseam</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Outseam</span>
                    </>
                  )}
                  {measurementType === 'suit' && (
                    <>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Jacket Chest</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Jacket Length</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Pants Waist</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Pants Inseam</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Continue to Measurements
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Take Measurements */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Take Measurements</h2>
              <p className="text-gray-600">
                Enter measurements in centimeters for{' '}
                <span className="font-medium">
                  {selectedCustomer?.name}'s {measurementType}
                </span>
              </p>
            </div>

            {/* Customer Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedCustomer?.name}</div>
                    <div className="text-sm text-gray-600">{selectedCustomer?.phone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Measurement Type</div>
                  <div className="font-medium text-gray-900 capitalize">{measurementType}</div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'normal' | 'urgent')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Reference Photo
                </label>
                <button
                  type="button"
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Click to upload</span>
                </button>
              </div>
            </div>

            {/* Shirt Measurements */}
            {measurementType === 'shirt' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Shirt Measurements (in cm)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { key: 'neck', label: 'Neck Circumference' },
                    { key: 'chest', label: 'Chest (Around fullest part)' },
                    { key: 'waist', label: 'Waist' },
                    { key: 'hips', label: 'Hips' },
                    { key: 'shoulderWidth', label: 'Shoulder Width' },
                    { key: 'sleeveLength', label: 'Sleeve Length' },
                    { key: 'bicep', label: 'Bicep (Around fullest part)' },
                    { key: 'wrist', label: 'Wrist' },
                    { key: 'shirtLength', label: 'Shirt Length (Back)' },
                    { key: 'backLength', label: 'Back Length' },
                    { key: 'frontLength', label: 'Front Length' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={shirtMeasurements[key as keyof typeof shirtMeasurements]}
                          onChange={(e) => handleShirtMeasurementChange(key, e.target.value)}
                          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="0.0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          cm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pants Measurements */}
            {measurementType === 'pants' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pants Measurements (in cm)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { key: 'waist', label: 'Waist' },
                    { key: 'hips', label: 'Hips (Around fullest part)' },
                    { key: 'inseam', label: 'Inseam' },
                    { key: 'outseam', label: 'Outseam' },
                    { key: 'thigh', label: 'Thigh (Around fullest part)' },
                    { key: 'knee', label: 'Knee' },
                    { key: 'ankle', label: 'Ankle' },
                    { key: 'rise', label: 'Rise' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={pantsMeasurements[key as keyof typeof pantsMeasurements]}
                          onChange={(e) => handlePantsMeasurementChange(key, e.target.value)}
                          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="0.0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          cm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Notes & Instructions</h3>
              <textarea
                rows={4}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Add any special instructions, preferences, or notes here..."
              />
              <div className="mt-3 flex items-start space-x-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Include details like preferred fit (slim, regular, loose), special requests, 
                  or any other important information for the tailor.
                </p>
              </div>
            </div>

            {/* Final Navigation */}
            <div className="pt-6 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back
              </button>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/measurements')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save & Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Customer Modal (Add New Customer) */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Customer</h3>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter customer address"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle add customer
                    setShowCustomerModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}