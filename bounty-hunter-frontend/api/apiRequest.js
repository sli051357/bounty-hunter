import axiosInstance from "./axiosInstance";

const apiService = {
	getUserBio: async (id) => {
		try {
			const response = await axiosInstance.get(`/users/profiles/${id}/bio`);
			return response.data;
		} catch (error) {}
	},
	getUserPic: async (id) => {
		try {
			const response = await axiosInstance.get(
				`/users/profiles/${id}/profile-pic`,
			);
			return response.data;
		} catch (error) {}
	},
	getUserLinks: async (id) => {
		try {
			const response = await axiosInstance.get(`/users/profiles/${id}/links`);
			return response.data;
		} catch (error) {}
	},
	deleteUser: async (id) => {
		try {
			const response = await axiosInstance.get(`/users/profiles/${id}/delete/`);
			return response.data;
		} catch (error) {}
	},

	updateUserBio: async (id, data) => {
		try {
			const response = await axiosInstance.post(
				`/users/profiles/${id}/edit-bio/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	updateUserProfilePic: async (id, data) => {
		try {
			const response = await axiosInstance.post(
				`users/profiles/${id}/edit-profile-pic/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	addAccountLink: async (id, data) => {
		try {
			const response = await axiosInstance.post(
				`/users/profiles/${id}/add-link/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	removeAccountLink: async (id, data) => {
		try {
			const response = await axiosInstance.post("/users/get-token/", data);
			return response.data;
		} catch (error) {}
	},

	signIn: async (id, data) => {
		try {
			const response = await axiosInstance.post(
				`/users/profiles/${id}/edit-bio`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	createBounty: async (data) => {
		try {
			const response = await axiosInstance.post("favors/create", data);
			return response.data;
		} catch (error) {}
	},

	// takes user's filter, sort, and a search parameters
	// filterParams and sortParams = {}, searchParam = " "
	viewBountyList: async (filterParams, sortParams, searchParam) => {
		try {
			const params = new URLSearchParams({
				...filterParams,
				...sortParams,
				search: searchParam,
			}); // combines all params into one object of URL query format
			const response = await axiosInstance.get(`/favors?${params}`); // puts params into url
			return response.data;
		} catch (error) {}
	},

	viewBounty: async (id) => {
		try {
			const response = await axiosInstance.get(`/favors/${id}`);
			return response.data;
		} catch (error) {}
	},

	// Once logged in, you don't need to pass in the id. This should send back data in the following format:
	// {"<id of the friend request>": {"from_user": username1, "to_user": username2}, ...}
	getFriendRequests: async () => {
		try {
			const response = await axiosInstance.get("/users/get-friend-requests/");
			return response.data;
		} catch (error) {}
	},

	//Same thing here,  dont need to pass id. Sorrya bout the formatting, the response needs to be a dict.
	//returns {"username1": "is friend :)", "username2": "is friend :)"}
	getFriendsList: async () => {
		try {
			const response = await axiosInstance.get("/users/get-friends-list/");
			return response.data;
		} catch (error) {}
	},

	//username: the username of the friend to request.
	//returns {"success": True}
	sendFriendRequest: async (username) => {
		try {
			const response = await axiosInstance.get(
				`/users/send-friend-request/${username}/`,
			);
			return response.data;
		} catch (error) {}
	},

	//requestID: the integer id of the request (make sure to cast to string)
	//returns {"success": True}
	acceptFriendRequest: async (requestID) => {
		try {
			const response = await axiosInstance.get(
				`/users/accept-friend-request/${requestID}/`,
			);
			return response.data;
		} catch (error) {}
	},

	//requestID: the integer id of the request (make sure to cast to string)
	//returns {"success": True}
	rejectFriendRequest: async (requestID) => {
		try {
			const response = await axiosInstance.get(
				`/users/reject-friend-request/${requestID}/`,
			);
			return response.data;
		} catch (error) {}
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
