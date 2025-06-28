import axiosInstance from './axiosInstance';

// 🔵 Create New Vehicle
export const createNewVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post('/vehicles/new', vehicleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔵 Get All New Vehicles
export const getAllNewVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles/new');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔵 Create Old Vehicle with Files (Cloudinary)
export const createOldVehicle = async (formData) => {
  try {
    const response = await axiosInstance.post('/vehicles/old', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔵 Get All Old Vehicles
export const getAllOldVehicles = async () => {
  try {
    const response = await axiosInstance.get('/vehicles/old');
    return response.data;
  } catch (error) {
    throw error;
  }
};
