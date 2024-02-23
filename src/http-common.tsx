import axiosInstance from './axiosInstance';

export const sendFile = async (file: File, email: string) => {
  try {
    if (!file) {
      throw new Error('File is required');
    }

    if (!email) {
      throw new Error('Email is required');
    }

    const formData = {
      "file": file,
      "email": email
    };

    const response = await axiosInstance.post('/saveFile', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};