import axiosInstance from "./axiosInstance";

const apiService = {
    getUserBio: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${id}/bio`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    getUserPic: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${id}/profile-pic`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    getUserLinks: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${id}/links`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    deleteUser: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${id}/delete/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    updateUserBio: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${id}/edit-bio/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserProfilePic: async (id, data) => {
        try {
            const response = await axiosInstance.post(`users/profiles/${id}/edit-profile-pic/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addAccountLink: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${id}/add-link/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeAccountLink: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/users/get-token/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${id}/edit-bio`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createBounty: async (data) => {
        try {
            const response = await axiosInstance.post('favors/create', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default apiService;

//     path('profiles/<slug:request_username>/', views.profile, name="profile"),
//     path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
//     path('profiles/<slug:request_username>/edit-bio', views.edit_bio, name="edit_bio"),
//     path('profiles/<slug:request_username>/edit-profile-pic', views.edit_profile_pic, name="edit_profile_pic"),
//     path('profiles/<slug:request_username>/add-link', views.add_link, name="add_link"),
//     path('profiles/<slug:request_username>/remove-link', views.remove_link, name="remove_link"),
//     path('get-token/', rest_framework.authtoken.views.obtain_auth_token)