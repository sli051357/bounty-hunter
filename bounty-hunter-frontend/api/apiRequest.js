import axiosInstance from "./axiosInstance";

const apiService = {
    // username = "username"
    // returns data = {"bio":user_profile.bio_text}
    getUserBio: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${username}/bio`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    // username = "username"
    // data = {"pfp":base64.b64encode(user_profile.profile_image)}
    getUserPic: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${username}/profile-pic`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    // username = "username"
    // data = {"accounts":linked_accs}
    getUserLinks: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${username}/links`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    // username = "username"
    // return {"success": False} if deletion is successful, {"success": True} if deletion fails
    deleteUser: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/profiles/${username}/delete/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    // username = "username"
    // data = "new bio"
    // returns {"success": False}
    updateUserBio: async (username, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${id}/edit-bio/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // username = "username"
    // 
    // returns {"success": False}
    updateUserProfilePic: async (username, data) => {
        try {
            const response = await axiosInstance.post(`users/profiles/${username}/edit-profile-pic/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // username = username, data = new linked account
    addAccountLink: async (username, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${id}/add-link/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // data = 
    // returns 
    removeAccountLink: async (id, data) => {
        try {
            const response = await axiosInstance.post(`/users/get-token/`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // username = username, data = 'new bio'
    // returns {"success": False}
    signIn: async (username, data) => {
        try {
            const response = await axiosInstance.post(`/users/profiles/${username}/edit-bio`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // data = {name: 'favor name', description: 'description here', assignee: assignee id, total_owed_type: 'Monetary'/'Nonmonetary', total_owed_amt: 20.50, 
            // privacy: 'Public'/'Private', active: True/False, completed: True/False, tags: tag objects? should be able to pick from existing }
    // returns {"success": True, "favor_id": favor.id} if creation is successful
            // {"success": False, "errors": form.errors} if creation unsuccessful
            // {"error": "GET method not allowed"} if wrong http method is used
    createBounty: async (data) => {
        try {
            const response = await axiosInstance.post('favors/create', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // filterParams = { query: 'and'/'or', owner: user.id, assignee: friend.id, tag: tag.id, status: 'sent'/'received'/'incomplete'/'complete',
                    // start_date: 2024-01-30, end_date: 2024-02-30, price_low: 5.00, price_high: 10.50 } if none, leave blank ''
    // sortParams = { sort_by: 'name'/'date'/'amount'/'assignee', order: 'ascending'/'descending' } if none, leave blank ''
    // searchParam = 'some keyword(s) in these quotation marks - fyi searches by bounty title, description, or assignee name'
    // returns {"favors": list of all favors, including all info about a favor}
    viewBountyList: async (filterParams, sortParams, searchParam) => {
        try {
            const params = new URLSearchParams({...filterParams, ...sortParams, search: searchParam})     // combines all params into one object of URL query format
            const response = await axiosInstance.get(`/favors?${params}`)   // puts params into url
            return response.data
        } catch (error) {
            throw error;
        }
    },

    // id = id of bounty you want to see
    // returns favor_data = {data of the favor}
    viewBounty: async (id) => {
        try {
            const response = await axiosInstance.get(`/favors/${id}`) 
            return response.data
        } catch (error) {
            throw error;
        }
    },

    // Once logged in, you don't need to pass in the id. This should send back data in the following format:
    // {"<id of the friend request>": {"from_user": username1, "to_user": username2}, ...}
    getFriendRequests: async () => {
        try {
            const response = await axiosInstance.get(`/users/get-friend-requests/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    //Same thing here,  dont need to pass id. Sorrya bout the formatting, the response needs to be a dict.
    //returns {"username1": "is friend :)", "username2": "is friend :)"} 
    getFriendsList: async () => {
        try {
            const response = await axiosInstance.get(`/users/get-friends-list/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    //username: the username of the friend to request.
    //returns {"success": True}
    sendFriendRequest: async (username) => {
        try {
            const response = await axiosInstance.get(`/users/send-friend-request/${username}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    //requestID: the integer id of the request (make sure to cast to string)
    //returns {"success": True}
    acceptFriendRequest: async (requestID) => {
        try {
            const response = await axiosInstance.get(`/users/accept-friend-request/${requestID}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    //requestID: the integer id of the request (make sure to cast to string)
    //returns {"success": True}
    rejectFriendRequest: async (requestID) => {
        try {
            const response = await axiosInstance.get(`/users/reject-friend-request/${requestID}/`);
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