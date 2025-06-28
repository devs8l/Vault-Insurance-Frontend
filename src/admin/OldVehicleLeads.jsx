import React, { useEffect, useState } from 'react';
import { getAllOldVehicles } from '../api/VehicleApi';
import { format, subDays } from 'date-fns';
import { FiDownload, FiEye, FiFilter, FiCalendar, FiX } from 'react-icons/fi';

const OldVehicleLeads = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicleCategory: '',
    fuelType: '',
    preferredCompany: '',
    dateRange: '',
    searchQuery: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllOldVehicles();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicle leads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering logic
  useEffect(() => {
    const { vehicleCategory, fuelType, preferredCompany, dateRange, searchQuery } = filters;
    let filtered = [...vehicles];

    if (vehicleCategory) {
      filtered = filtered.filter(v => v.vehicleCategory === vehicleCategory);
    }
    if (fuelType) {
      filtered = filtered.filter(v => v.fuelType === fuelType);
    }
    if (preferredCompany) {
      filtered = filtered.filter(v => v.preferredCompanies?.includes(preferredCompany));
    }
    if (dateRange) {
      const now = new Date();
      let startDate;
      
      switch(dateRange) {
        case 'today':
          startDate = subDays(now, 1);
          break;
        case 'week':
          startDate = subDays(now, 7);
          break;
        case 'month':
          startDate = subDays(now, 30);
          break;
        case 'year':
          startDate = subDays(now, 365);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        filtered = filtered.filter(v => {
          const leadDate = new Date(v.createdAt || v.created_at);
          return leadDate >= startDate && leadDate <= now;
        });
      }
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(v => 
        v.fullName?.toLowerCase().includes(query) ||
        v.mobileNumber?.includes(query) ||
        v.emailId?.toLowerCase().includes(query) ||
        v.registrationNumber?.toLowerCase().includes(query)
      );
    }

    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      vehicleCategory: '',
      fuelType: '',
      preferredCompany: '',
      dateRange: '',
      searchQuery: ''
    });
  };

  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || url.split('/').pop();
    link.click();
  };

  // Extract unique values for dropdowns
  const vehicleCategories = [...new Set(vehicles.map(v => v.vehicleCategory))].filter(Boolean);
  const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))].filter(Boolean);
  const companies = [...new Set(vehicles.flatMap(v => v.preferredCompanies || []))].filter(Boolean);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Old Vehicle Insurance Leads</h1>
            <p className="text-gray-600 mt-1">
              {filteredVehicles.length} {filteredVehicles.length === 1 ? 'lead' : 'leads'} found
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ target: { name: 'searchQuery', value: e.target.value } })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="text-gray-600" />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Filter Leads</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Category</label>
                <select
                  name="vehicleCategory"
                  value={filters.vehicleCategory}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {vehicleCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                <select
                  name="preferredCompany"
                  value={filters.preferredCompany}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {vehicles.length === 0 ? 'No leads available' : 'Try changing your filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-5">
                  {/* Customer Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{vehicle.fullName}</h3>
                      <p className="text-sm text-gray-500">{vehicle.emailId}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {format(new Date(vehicle.createdAt || vehicle.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Contact</span>
                      <p className="text-gray-800">{vehicle.mobileNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Location</span>
                      <p className="text-gray-800">{vehicle.pinCode}</p>
                    </div>
                  </div>
                  
                  {/* Vehicle Details */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Vehicle Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Category</span>
                        <p className="text-gray-800 capitalize">{vehicle.vehicleCategory?.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Reg No</span>
                        <p className="text-gray-800 font-mono">{vehicle.registrationNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Year</span>
                        <p className="text-gray-800">{vehicle.registrationYear}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Fuel</span>
                        <p className="text-gray-800 capitalize">{vehicle.fuelType}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Insurance Details */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Insurance Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Coverage</span>
                        <p className="text-gray-800 capitalize">{vehicle.coverageType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Prev Claims</span>
                        <p className="text-gray-800 capitalize">{vehicle.previousClaims || 'No'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Prev Expiry</span>
                        <p className="text-gray-800">{vehicle.prevPolicyExpiry || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Companies</span>
                        <p className="text-gray-800 truncate">{vehicle.preferredCompanies?.join(', ') || 'None'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Documents */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                    <div className="space-y-2">
                      {vehicle.rcFileName && (
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm font-medium text-gray-700">RC Document</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(vehicle.rcFileName, '_blank')}
                              className="p-1 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50"
                              title="Preview"
                            >
                              <FiEye size={16} />
                            </button>
                            <button
                              onClick={() => downloadFile(vehicle.rcFileName, `RC_${vehicle.registrationNumber}.jpg`)}
                              className="p-1 text-green-600 hover:text-green-800 rounded hover:bg-green-50"
                              title="Download"
                            >
                              <FiDownload size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {vehicle.policyFileName && (
                        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm font-medium text-gray-700">Policy Document</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(vehicle.policyFileName, '_blank')}
                              className="p-1 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50"
                              title="Preview"
                            >
                              <FiEye size={16} />
                            </button>
                            <button
                              onClick={() => downloadFile(vehicle.policyFileName, `Policy_${vehicle.registrationNumber}.jpg`)}
                              className="p-1 text-green-600 hover:text-green-800 rounded hover:bg-green-50"
                              title="Download"
                            >
                              <FiDownload size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OldVehicleLeads;