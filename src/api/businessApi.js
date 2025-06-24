import axiosInstance from './axiosInstance';

export const submitBusinessQuote = async (formData) => {
  try {
    const response = await axiosInstance.post('/business-quotes', formData);
    return response.data;
  } catch (error) {
    console.error('Business quote submission failed:', error);
    throw error;
  }
};

export const getBusinessQuotes = async () => {
  try {
    const response = await axiosInstance.get('/business-quotes');
    return response.data;
  } catch (error) {
    console.error('Fetching business quotes failed:', error);
    throw error;
  }
};
