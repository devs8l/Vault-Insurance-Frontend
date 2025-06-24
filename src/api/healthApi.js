import axiosInstance from './axiosInstance';

export const submitHealthInsuranceLead = async (formData, isFormData = false) => {
    try {
        const config = {
            headers: isFormData ? {
                'Content-Type': 'multipart/form-data'
            } : {}
        };

        // Use axiosInstance instead of axios
        const response = await axiosInstance.post('/health-insurance-leads', formData, config);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
};

export const getHealthInsuranceLeads = async () => {
    try {
        const response = await axiosInstance.get('/health-insurance-leads');
        return response.data;
    } catch (error) {
        console.error('Error fetching leads:', error);
        throw error;
    }
};