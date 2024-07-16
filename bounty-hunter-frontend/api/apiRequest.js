import axiosInstance from "./axiosInstance";

const apiService = {
    getUserById: async (id) => {
        try {
            const response = await axiosInstance.get('/data/${id}');
            return response.data;
        } catch (error) {
            throw error;
        }
    }, // 
    updateUserData: async (id, data) => {
        try {
            const response = await axiosInstance.put('/data/${id}', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default apiService;