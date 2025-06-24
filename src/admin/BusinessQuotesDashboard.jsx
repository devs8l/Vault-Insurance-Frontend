import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBusinessQuotes } from '../api/businessApi';
import { FiCalendar, FiChevronDown, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BusinessQuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
    isActive: false
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      try {
        const data = await getBusinessQuotes();
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (err) {
        console.error('Error fetching business quotes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuotes();
  }, []);

  useEffect(() => {
    let results = [...quotes];
    
    // Search term filter
    if (searchTerm) {
      results = results.filter(quote =>
        quote.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.mobile_number?.includes(searchTerm) ||
        quote.product_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateFilter.isActive && dateFilter.startDate && dateFilter.endDate) {
      results = results.filter(quote => {
        const quoteDate = new Date(quote.created_at);
        return quoteDate >= dateFilter.startDate && quoteDate <= dateFilter.endDate;
      });
    }
    
    setFilteredQuotes(results);
  }, [quotes, searchTerm, dateFilter]);

  const openQuoteDetails = (quote) => {
    setSelectedQuote(quote);
  };

  const closeQuoteDetails = () => {
    setSelectedQuote(null);
  };

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
  };

  const applyDateFilter = () => {
    if (dateFilter.startDate && dateFilter.endDate) {
      setDateFilter({ ...dateFilter, isActive: true });
      setShowDateFilter(false);
    }
  };

  const clearDateFilter = () => {
    setDateFilter({
      startDate: null,
      endDate: null,
      isActive: false
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get business type color
  const getBusinessTypeColor = (type) => {
    const colors = {
      service: 'bg-blue-100 text-blue-800',
      product: 'bg-green-100 text-green-800',
      manufacturing: 'bg-purple-100 text-purple-800',
      retail: 'bg-yellow-100 text-yellow-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[type?.toLowerCase()] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Business Insurance Quotes</h1>
            <p className="text-gray-500 mt-1">Manage and review all business insurance inquiries</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-500">
              Showing <span className="text-blue-600">{filteredQuotes.length}</span> of <span className="text-blue-600">{quotes.length}</span> quotes
            </span>
          </div>
        </div>
        
        {/* Filter Controls */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
          whileHover={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search quotes by name, business, email or product type..."
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleDateFilter}
                className={`flex items-center px-4 py-3 border rounded-lg transition-colors ${dateFilter.isActive ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <FiCalendar className="mr-2" />
                <span>Date Range</span>
                <FiChevronDown className={`ml-2 transition-transform ${showDateFilter ? 'rotate-180' : ''}`} />
              </button>
              
              {dateFilter.isActive && (
                <button
                  onClick={clearDateFilter}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                >
                  <FiX className="h-3 w-3" />
                </button>
              )}
              
              {showDateFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-full md:w-96 bg-white rounded-lg shadow-xl z-10 p-4 border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <DatePicker
                        selected={dateFilter.startDate}
                        onChange={(date) => setDateFilter({ ...dateFilter, startDate: date })}
                        selectsStart
                        startDate={dateFilter.startDate}
                        endDate={dateFilter.endDate}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholderText="Select start date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <DatePicker
                        selected={dateFilter.endDate}
                        onChange={(date) => setDateFilter({ ...dateFilter, endDate: date })}
                        selectsEnd
                        startDate={dateFilter.startDate}
                        endDate={dateFilter.endDate}
                        minDate={dateFilter.startDate}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholderText="Select end date"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={toggleDateFilter}
                      className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyDateFilter}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={!dateFilter.startDate || !dateFilter.endDate}
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {dateFilter.isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-sm text-gray-600"
            >
              Showing quotes from {dateFilter.startDate?.toLocaleDateString()} to {dateFilter.endDate?.toLocaleDateString()}
            </motion.div>
          )}
        </motion.div>
        
        {/* Quotes Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Name', 'Business', 'Contact', 'Product Type', 'Submitted', 'Actions'].map((header) => (
                        <th 
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredQuotes.length > 0 ? (
                        filteredQuotes.map((quote) => (
                          <motion.tr
                            key={quote._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                  {quote.name?.charAt(0) || 'B'}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                                  <div className="text-sm text-gray-500">{quote.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{quote.business_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{quote.mobile_number}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBusinessTypeColor(quote.product_type)} capitalize`}>
                                {quote.product_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(quote.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => openQuoteDetails(quote)}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                              >
                                View Details
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                            No quotes found matching your criteria
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Quote Detail Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeQuoteDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedQuote.business_name} Insurance Quote
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Submitted on {formatDate(selectedQuote.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={closeQuoteDetails}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800">Business Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Business Name:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedQuote.business_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Product Type:</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBusinessTypeColor(selectedQuote.product_type)} capitalize`}>
                            {selectedQuote.product_type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-800">Contact Details</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Contact Person:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedQuote.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedQuote.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm font-medium text-gray-900">{selectedQuote.mobile_number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-yellow-800">Additional Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Submission Date:</span>
                          <span className="text-sm font-medium text-gray-900">{formatDate(selectedQuote.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeQuoteDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessQuotesPage;