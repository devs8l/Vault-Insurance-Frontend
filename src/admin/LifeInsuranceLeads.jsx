import React, { useEffect, useState } from 'react';
import { getLifeInsuranceLeads } from '../api/LifeApi';
import { FiSearch, FiFilter, FiCalendar, FiPhone, FiMail, FiUser, FiX, FiChevronDown } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LifeInsuranceLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    plan: '',
    company: '',
    startDate: null,
    endDate: null
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getLifeInsuranceLeads();
        setLeads(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    // Search term filter
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.selected_plan?.toLowerCase().includes(searchTerm.toLowerCase());

    // Gender filter
    const matchesGender = 
      !filters.gender || lead.gender === filters.gender;

    // Plan filter
    const matchesPlan = 
      !filters.plan || lead.selected_plan === filters.plan;

    // Company filter
    const matchesCompany = 
      !filters.company || 
      (lead.preferred_companies && 
       lead.preferred_companies.includes(filters.company));

    // Date range filter
    const matchesDate = !filters.startDate || !filters.endDate || (
      new Date(lead.created_at) >= filters.startDate &&
      new Date(lead.created_at) <= filters.endDate
    );

    return matchesSearch && matchesGender && matchesPlan && matchesCompany && matchesDate;
  });

  // Extract unique values for filters
  const allPlans = [...new Set(leads.map(lead => lead.selected_plan))];
  const allCompanies = [...new Set(
    leads.flatMap(lead => lead.preferred_companies || [])
  )];

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearDateFilter = () => {
    setFilters({...filters, startDate: null, endDate: null});
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">Error loading leads: {error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Life Insurance Leads</h1>
            <p className="text-gray-500 mt-1">
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={toggleFilters}
              className={`inline-flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (filters.gender || filters.plan || filters.company || filters.startDate) 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiFilter className="mr-2" />
              Filters
              {(filters.gender || filters.plan || filters.company || filters.startDate) && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  value={filters.plan}
                  onChange={(e) => setFilters({...filters, plan: e.target.value})}
                >
                  <option value="">All Plans</option>
                  {allPlans.map(plan => (
                    <option key={plan} value={plan}>{plan}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  value={filters.company}
                  onChange={(e) => setFilters({...filters, company: e.target.value})}
                >
                  <option value="">All Companies</option>
                  {allCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="relative">
                  <button
                    className={`flex items-center justify-between w-full pl-3 pr-10 py-2 text-left text-base border ${
                      filters.startDate ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    onClick={() => document.getElementById('datePicker').focus()}
                  >
                    <span className="truncate">
                      {filters.startDate ? 
                        `${filters.startDate.toLocaleDateString()} - ${filters.endDate?.toLocaleDateString() || ''}` : 
                        'Select date range'}
                    </span>
                    <FiCalendar className="ml-2 text-gray-400" />
                  </button>
                  {filters.startDate && (
                    <button
                      onClick={clearDateFilter}
                      className="absolute right-5 top-3 text-gray-400 hover:text-gray-600"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <DatePicker
                    id="datePicker"
                    selected={filters.startDate}
                    onChange={(date) => setFilters({...filters, startDate: date})}
                    selectsStart
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    placeholderText="Start date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <DatePicker
                    selected={filters.endDate}
                    onChange={(date) => setFilters({...filters, endDate: date})}
                    selectsEnd
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    minDate={filters.startDate}
                    placeholderText="End date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filters indicator */}
        {(filters.gender || filters.plan || filters.company || filters.startDate) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.gender && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Gender: {filters.gender}
                <button 
                  onClick={() => setFilters({...filters, gender: ''})}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.plan && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Plan: {filters.plan}
                <button 
                  onClick={() => setFilters({...filters, plan: ''})}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-green-400 hover:text-green-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.company && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Company: {filters.company}
                <button 
                  onClick={() => setFilters({...filters, company: ''})}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-purple-400 hover:text-purple-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.startDate && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Date: {filters.startDate.toLocaleDateString()} - {filters.endDate?.toLocaleDateString()}
                <button 
                  onClick={clearDateFilter}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-yellow-400 hover:text-yellow-600"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No leads found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Desktop table view */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan & Companies
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{lead.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FiPhone className="mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{lead.selected_plan}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {lead.preferred_companies?.join(', ') || 'No companies selected'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          DOB: {lead.dob || 'Not provided'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <div key={lead._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiUser className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{lead.gender}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 flex items-center">
                        <FiMail className="mr-2" />
                        Email
                      </div>
                      <div className="text-gray-900 truncate">{lead.email}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 flex items-center">
                        <FiPhone className="mr-2" />
                        Phone
                      </div>
                      <div className="text-gray-900">{lead.phone}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">Plan</div>
                      <div className="text-gray-900 font-medium">{lead.selected_plan}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">Preferred Companies</div>
                      <div className="text-gray-900">
                        {lead.preferred_companies?.join(', ') || 'None'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 flex items-center">
                        <FiCalendar className="mr-2" />
                        Created
                      </div>
                      <div className="text-gray-900">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">DOB</div>
                      <div className="text-gray-900">{lead.dob || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeInsuranceLeads;