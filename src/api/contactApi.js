import axiosInstance from './axiosInstance';

export const submitContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
};

export const getContactSubmissions = async () => {
  try {
    const response = await axiosInstance.get('/contact');
    return response.data;
  } catch (error) {
    console.error('Fetching contacts failed:', error);
    throw error;
  }
};
