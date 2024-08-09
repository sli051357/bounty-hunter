import axiosInstance from "./axiosInstance";
import axios from "axios";



const apiService = {
	signUp: async (data) => {
		try {
			const response = await axiosInstance.post(
				`/users/register/`,
				data
			);
			return response.data;
		} catch (error) { throw error;}
	},

	// username = "username"
	// returns {"bio":user_profile.bio_text}
	getUserBio: async (username) => {
		try {
			const response = await axiosInstance.get(
				`/users/profiles/${username}/bio`,
			);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// returns {"pfp":base64.b64encode(user_profile.profile_image)}
	getUserPic: async (username) => {
		try {
			const response = await axiosInstance.get(
				`/users/profiles/${username}/profile-pic`,
			);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// returns = {"accounts":linked_accs}
	getUserLinks: async (username) => {
		try {
			const response = await axiosInstance.get(
				`/users/profiles/${username}/links`,
			);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// return {"success": True} if deletion is successful, {"success": False} if deletion fails
	deleteUser: async (username) => {
		try {
			const response = await axiosInstance.get(
				`/users/profiles/${username}/delete/`,
			);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// data = "new bio, max length 200 characters"
	// returns {"success": True} if successful, {"success": False} if fails
	updateUserBio: async (username, data, token) => {
		try {
			const response = await axiosInstance.post(`/users/profiles/${username}/edit-bio/`,data, {headers: { 'authorization': `Token ${token}`}},);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// data = an image (models.ImageField(upload_to='res/'))
	// returns {"success": True} if successful, {"success": False} if fails
	updateUserProfilePic: async (username, data) => {
		try {
			const response = await axiosInstance.post(
				`users/profiles/${username}/edit-profile-pic/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	// username = "username"
	// data = "link"
	// returns {"success": True} if successful, {"success": False} if fails
	addAccountLink: async (username, data) => {
		try {
			const response = await axiosInstance.post(
				`/users/profiles/${username}/add-link/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	removeAccountLink: async (username, id, data) => {
		try {
			const response = await axiosInstance.post(
				`/users/profiles/${username}/remove-link/`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	// data = { "username": "username", "password": "password" }
	// returns { 'token' : '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' }
	signIn: async (data) => {
		try {
			const response = await axiosInstance.post("/users/get-token/", data);
			return response.data;
		} catch (error) {
			console.error("Error during sign-in:", error);
        	throw new Error("Failed to sign in. Please try again later.");
		}
	},

	// data = {pass1, pass2, token}
	// pass1 = request.POST["pass1"]
    // pass2 = request.POST["pass2"]
    // token = request.POST["token"]
	// returns {status: "fail" or "success"}
	resetPassword: async (data) => {
		try {
			const response = await axiosInstance.post("/users/reset-password/", data);
			return response.data;
		} catch (error) {
			console.log("Error during change password:", error);
		}
	},

	verifyCode: async (data) => {
		try {
			const response = await axiosInstance.post("/users/verify-code/", data);
			return response.data;
		} catch (error) {
			console.log("Error during change password:", error);
		}
	},

	forgotPassword: async (data) => {
		try {
			const response = await axiosInstance.post("/users/forgot-password/", data);
			return response.data;
		} catch (error) {
			console.log("Error during forgot password:", error);
		}
	},

	// data = {'name': 'favor name', 'description': 'description here', 'assignee': pick from other users, 'total_owed_type': 'Monetary'/'Nonmonetary', 'total_owed_amt': 20.50,
	// 'privacy': 'Public'/'Private', 'active': True/False, 'completed': True/False, 'tags': tag objects? should be able to pick from existing }
	// returns {"success": True, "favor_id": favor.id} if creation is successful
	// {"success": False, "errors": form.errors} if creation unsuccessful
	// {"error": "GET method not allowed"} if wrong http method is used
	createBounty: async (data) => {
		try {
			const response = await axiosInstance.post("favors/create", data);
			return response.data;
		} catch (error) {}
	},

	// filterParams = { query: 'and'/'or', owner: user.id, assignee: friend.id, tag: tag.id, status: 'sent'/'received'/'incomplete'/'complete',
	// start_date: 2024-01-30, end_date: 2024-02-30, price_low: 5.00, price_high: 10.50 } if none, leave blank ''
	// sortParams = { sort_by: 'name'/'date'/'amount'/'assignee', order: 'ascending'/'descending' } if none, leave blank ''
	// searchParam = 'some keyword(s) in these quotation marks - searches by bounty title, description, or assignee name'
	// returns {"favors": list of all favors, including all info about a favor}
	// to know what each individual favor looks like, see return object below
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

	// id = id # of bounty you want to see
	// returns {"name": favor.name, "id": favor.id, "description": favor.description, "owner": {"id": favor.owner.id, "email": favor.owner.email, "username": favor.owner.username},
	// "assignee": {"id": favor.assignee.id, "email": favor.assignee.email, "username": favor.assignee.username}, "created_at": favor.created_at, "updated_at": favor.updated_at,
	// "total_owed_type": favor.total_owed_type, "total_owed_amt": favor.total_owed_amt, "privacy": favor.privacy, "owner_status": favor.owner_status,
	// "assignee_status": favor.assignee_status, "is_active": favor.active, "is_deleted": favor.deleted, "is_completed": favor.completed, "tags": tags,}
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
		} catch (error) {
			return error;
		}
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

	// username: "username of friend to remove"
	// returns {"success": True} if successful, {"success": False} if not
	removeFriend: async (username) => {
		try {
			const response = await axiosInstance.post(
				`/users/remove-friend/${username}/`,
			);
			return response.data;
		} catch (error) {}
	},

	//you need to call this before calling login required methods. It sets the header to the tokens for auth
	setAuthorizationHeader: (token) => {
		axios.defaults.headers.common['Authorization'] = `Token ${token}`; 
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
