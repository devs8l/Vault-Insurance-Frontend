import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getContactSubmissions } from '../api/contactApi';

const ContactsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'descending'
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const data = await getContactSubmissions();
        setContacts(data);
        setFilteredContacts(data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  useEffect(() => {
      let results = [...contacts];
      
      // Apply search filter
      if (searchTerm) {
        results = results.filter(contact =>
          contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm) ||
          contact.helpWith.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply date filter
      if (dateFilter !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        results = results.filter(contact => {
          const contactDate = new Date(contact.createdAt);
          
          switch(dateFilter) {
            case 'today':
              return contactDate >= today;
            case 'week':
              const weekAgo = new Date(today);
              weekAgo.setDate(weekAgo.getDate() - 7);
              return contactDate >= weekAgo;
            case 'month':
              const monthAgo = new Date(today);
              monthAgo.setMonth(monthAgo.getMonth() - 1);
              return contactDate >= monthAgo;
            default:
              return true;
          }
        });
      }
      
      // Apply sorting
      if (sortConfig.key) {
        results.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      
      setFilteredContacts(results);
    }, [contacts, searchTerm, dateFilter, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    const getSortIndicator = (key) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };
  
    const openMessageModal = (contact) => {
      setSelectedMessage(contact);
    };
  
    const closeMessageModal = () => {
      setSelectedMessage(null);
    };
  
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Submissions</h1>
                  <div className="flex items-center space-x-2">
                    <span className="hidden md:inline text-sm text-gray-500">
                      {filteredContacts.length} of {contacts.length} results
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
                          placeholder="Search contacts..."
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
                    <div className="w-full md:w-48">
                      <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
                
                {/* Contacts Table */}
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
                              {['#', 'First Name', 'Last Name', 'Phone', 'Help With', 'Date', 'Message'].map((header, index) => (
                                <th 
                                  key={index}
                                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer transition-colors hover:bg-gray-100 ${index === 6 ? 'text-right' : ''}`}
                                  onClick={() => requestSort(
                                    index === 0 ? 'id' : 
                                    index === 1 ? 'firstName' : 
                                    index === 2 ? 'lastName' : 
                                    index === 3 ? 'phone' : 
                                    index === 4 ? 'helpWith' : 'createdAt'
                                  )}
                                >
                                  <div className="flex items-center">
                                    {header}
                                    <span className="ml-1">
                                      {getSortIndicator(
                                        index === 0 ? 'id' : 
                                        index === 1 ? 'firstName' : 
                                        index === 2 ? 'lastName' : 
                                        index === 3 ? 'phone' : 
                                        index === 4 ? 'helpWith' : 'createdAt'
                                      )}
                                    </span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <AnimatePresence>
                              {filteredContacts.length > 0 ? (
                                filteredContacts.map((contact, index) => (
                                  <motion.tr
                                    key={contact.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">
                                        {contact.firstName}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">
                                        {contact.lastName}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {contact.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {contact.helpWith}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(contact.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button
                                        onClick={() => openMessageModal(contact)}
                                        className="text-blue-600 hover:text-blue-900 transition-colors"
                                      >
                                        View Message
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
                                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No contacts found matching your criteria
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
        
              {/* Message Detail Modal */}
              <AnimatePresence>
                {selectedMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={closeMessageModal}
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
                          <h2 className="text-xl font-bold text-gray-800">
                            Message from {selectedMessage.firstName} {selectedMessage.lastName}
                          </h2>
                          <button
                            onClick={closeMessageModal}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                              <p className="mt-1 text-sm text-gray-900">{selectedMessage.phone}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Help With</h3>
                              <p className="mt-1 text-sm text-gray-900">{selectedMessage.helpWith}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Submitted On</h3>
                            <p className="mt-1 text-sm text-gray-900">
                              {new Date(selectedMessage.createdAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Message</h3>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-900 whitespace-pre-line">
                                {selectedMessage.message}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={closeMessageModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    )

}

export default ContactsDashboard;