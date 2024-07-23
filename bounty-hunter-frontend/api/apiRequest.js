import axiosInstance from "./axiosInstance";

const apiService = {
    getUserBio: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${userId}/bio`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    getUserPic: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${userId}/profile-pic`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    getUserLinks: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${userId}/links`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    deleteUser: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${userId}/delete/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    updateUserBio: async (userId, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${userId}/edit-bio`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserProfilePic: async (userId, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${userId}/edit-profile-pic`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addAccountLink: async (userId, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${userId}/add-link`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeAccountLink: async (userId, data) => {
        try {
            const response = await axiosInstance.post(`/users/get-token/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signIn: async (userId, data) => {
        try {
            // is the url supposed to be edit-bio?
            const response = await axiosInstance.post(`/users/profiles/${userId}/edit-bio`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFavorList: async () => {
        try {
            const response = await axiosInstance.get(`/favors/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getSpecFavor: async (favorId) => {
        try {
            const response = await axiosInstance.get(`/favors/${favorId}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createFavor: async (data) => {
        try {
            const response = await axiosInstance.post(`/favors/create/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    editFavor: async (favorId, data) => {
        try {
            const response = await axiosInstance.post(`/favors/${favorId}/edit`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getTags: async () => {
        try {
            const response = await axiosInstance.get(`/favors/tags/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getSpecTag: async (tagId) => {
        try {
            const response = await axiosInstance.get(`/favors/tags/${tagId}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createTag: async (data) => {
        try {
            const response = await axiosInstance.post(`/favors/tags/create`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    editTag: async (tagId, data) => {
        try {
            const response = await axiosInstance.post(`/favors/tags/${tagId}/edit/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default apiService;

//     path('profiles/<slug:request_username>/', views.profile, name="profile"),
//     path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
//     path('profiles/<slug:request_username>/edit-bio', views.edit_bio, name="edit_bio"),
//     path('profiles/<slug:request_username>/edit-profile-pic', views.edit_profile_pic, name="edit_profile_pic"),
//     path('profiles/<slug:request_username>/add-link', views.add_link, name="add_link"),
//     path('profiles/<slug:request_username>/remove-link', views.remove_link, name="remove_link"),
//     path('get-token/', rest_framework.authtoken.views.obtain_auth_token)