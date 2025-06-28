import React, { useState, useEffect } from 'react';
import { getAllNewVehicles } from '../api/VehicleApi';
import { FiDownload, FiEye, FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';

const NewVehicleLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    vehicleCategory: '',
    vehicleBrand: '',
    fuelType: '',
    coverageType: '',
    dateRange: ''
  });

  // Mock data - replace with your API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllNewVehicles();
        setLeads(data);
        setFilteredLeads(data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, leads]);

  const applyFilters = () => {
    let result = [...leads];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(lead =>
        lead.fullName?.toLowerCase().includes(searchTerm) ||
        lead.mobileNumber?.includes(searchTerm) ||
        lead.emailId?.toLowerCase().includes(searchTerm) ||
        lead.vehicleModel?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.vehicleCategory) {
      result = result.filter(lead => lead.vehicleCategory === filters.vehicleCategory);
    }

    if (filters.vehicleBrand) {
      result = result.filter(lead => lead.vehicleBrand === filters.vehicleBrand);
    }

    if (filters.fuelType) {
      result = result.filter(lead => lead.fuelType === filters.fuelType);
    }

    if (filters.coverageType) {
      result = result.filter(lead => lead.coverageType === filters.coverageType);
    }

    if (filters.dateRange) {
      const now = new Date();
      let startDate = new Date();

      switch(filters.dateRange) {
        case 'today':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        result = result.filter(lead => {
          const leadDate = new Date(lead.createdAt);
          return leadDate >= startDate && leadDate <= now;
        });
      }
    }

    setFilteredLeads(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      vehicleCategory: '',
      vehicleBrand: '',
      fuelType: '',
      coverageType: '',
      dateRange: ''
    });
  };

  // Extract unique values for filters
  const vehicleCategories = [...new Set(leads.map(lead => lead.vehicleCategory))].filter(Boolean);
  const vehicleBrands = [...new Set(leads.map(lead => lead.vehicleBrand))].filter(Boolean);
  const fuelTypes = [...new Set(leads.map(lead => lead.fuelType))].filter(Boolean);
  const coverageTypes = [...new Set(leads.map(lead => lead.coverageType))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">New Vehicle Insurance Leads</h1>
            <p className="text-gray-600 mt-1">
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={(e) => handleFilterChange({ target: { name: 'search', value: e.target.value } })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Filter Leads</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Category</label>
                <select
                  name="vehicleCategory"
                  value={filters.vehicleCategory}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Categories</option>
                  {vehicleCategories.map(category => (
                    <option key={category} value={category}>
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Brand</label>
                <select
                  name="vehicleBrand"
                  value={filters.vehicleBrand}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Brands</option>
                  {vehicleBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
                <select
                  name="coverageType"
                  value={filters.coverageType}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Coverage Types</option>
                  {coverageTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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
              {leads.length === 0 ? 'No leads available' : 'Try changing your filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-5">
                  {/* Customer Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{lead.fullName}</h3>
                      <p className="text-sm text-gray-500">{lead.emailId}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Contact</span>
                      <p className="text-gray-800">{lead.mobileNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Location</span>
                      <p className="text-gray-800">{lead.pinCode}</p>
                    </div>
                  </div>
                  
                  {/* Vehicle Details */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Vehicle Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Category</span>
                        <p className="text-gray-800 capitalize">{lead.vehicleCategory?.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Brand</span>
                        <p className="text-gray-800 capitalize">{lead.vehicleBrand}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Model</span>
                        <p className="text-gray-800">{lead.vehicleModel}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Year</span>
                        <p className="text-gray-800">{lead.registrationYear}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Fuel</span>
                        <p className="text-gray-800 capitalize">{lead.fuelType}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Insurance Details */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Insurance Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Coverage</span>
                        <p className="text-gray-800 capitalize">{lead.coverageType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Companies</span>
                        <p className="text-gray-800 truncate">{lead.preferredCompanies?.join(', ') || 'None'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Add-ons</span>
                        <p className="text-gray-800">{lead.selectedAddOns?.join(', ') || 'None'}</p>
                      </div>
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

export default NewVehicleLeads;