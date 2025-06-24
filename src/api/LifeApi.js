import axiosInstance from './axiosInstance'; 
export const submitLifeInsuranceLead = async (formData) => {
  try {
    const response = await axiosInstance.post('/life-insurance-leads', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting Life insurance lead:', error);
    throw error;
  }
};

export const getLifeInsuranceLeads = async () => {
  try {
    const response = await axiosInstance.get('/life-insurance-leads');
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};