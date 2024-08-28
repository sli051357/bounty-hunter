import axios from "axios";
import axiosInstance from "./axiosInstance";

const apiService = {
	getDisplayName: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/display-name/`,
		);
		return response.data;
	},

	changeDisplayName: async (data, token) => {
		const response = await axiosInstance.post(
			"/users/profiles/change-display-name/",
			data,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	addFavoritedFriend: async (data, token) => {
		const response = await axiosInstance.post(
			"/users/add-favorited-friend/",
			data,
			{
				headers: { authorization: `Token ${token}` },
			},
		);
		return response.data;
	},

	removeFavoritedFriend: async (data, token) => {
		const response = await axiosInstance.post(
			"/users/remove-favorited-friend/",
			data,
			{
				headers: { authorization: `Token ${token}` },
			},
		);
		return response.data;
	},

	getFavoritedFriends: async (token) => {
		const response = await axiosInstance.get("/users/get-favorited-friends/", {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	searchUsers: async (query) => {
		const response = await axiosInstance.get(
			`/users/profiles/search/?q=${query}`,
		);
		return response.data;
	},

	signUp: async (data) => {
		const response = await axiosInstance.post("/users/register/", data);
		return response.data;
	},

	// username = "username"
	// returns {"bio":user_profile.bio_text}
	getUserBio: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/bio/`,
		);
		return response.data;
	},

	getRating: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/rating/`,
		);
		return response.data;
	},

	getFriendCount: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/friend-count/`,
		);
		return response.data;
	},

	// username = "username"
	// returns url in response.url
	getUserPic: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/profile-pic/`,
		);
		return response.data;
	},

	removeUserPic: async (token) => {
		const response = await axiosInstance.get("/users/profiles/remove-pfp/", {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	//data is a dict of entries: data[str(entry.id)] = [entry.provider_text, entry.account_text]
	getUserLinks: async (username) => {
		const response = await axiosInstance.get(
			`/users/profiles/${username}/links/`,
		);
		return response.data.data;
	},

	// username: "username"
	// return {"success": True} if deletion is successful, {"success": False} if deletion fails
	deleteUser: async (username, token) => {
		const response = await axiosInstance.post("/users/delete/", data, {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	// username: "username"
	// data: "new bio, max length 200 characters"
	// returns {"success": True} if successful, {"success": False} if fails
	updateUserBio: async (username, data, token) => {
		const response = await axiosInstance.post(
			`/users/profiles/${username}/edit-bio/`,
			data,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	// username = "username"
	// data = an image encoded in b64 (models.ImageField(upload_to='res/'))
	// returns {"success": True} if successful, {"success": False} if fails
	updateUserProfilePic: async (username, data, token) => {
		const response = await axiosInstance.post(
			`users/profiles/${username}/edit-profile-pic/`,
			data,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	// username: "username"
	// data: "link"
	// returns {"success": True} if successful, {"success": False} if fails
	addAccountLink: async (username, data, token) => {
		const response = await axiosInstance.post(
			`/users/profiles/${username}/add-link/`,
			data,
			{
				headers: { authorization: `Token ${token}` },
			},
		);
		return response.data;
	},

	removeAccountLink: async (username, data, token) => {
		const response = await axiosInstance.post(
			`/users/profiles/${username}/remove-link/`,
			data,
			{
				headers: { authorization: `Token ${token}` },
			},
		);
		return response.data;
	},

	// data = { "username": "username", "password": "password" }
	// returns { 'token' : '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' }
	signIn: async (data) => {
		const response = await axiosInstance.post("/users/get-token/", data);
		return response.data;
	},

	// requires login. //added auth to reset pasword, need to fix the screen stuff
	// data = {pass1, pass2}
	// returns {status: "fail" or "success"}
	resetPassword: async (data, token) => {
		const response = await axiosInstance.post("/users/reset-password/", data, {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	verifyCode: async (data) => {
		const response = await axiosInstance.post("/users/verify-code/", data);
		return response.data;
	},

	forgotPassword: async (data) => {
		const response = await axiosInstance.post("/users/forgot-password/", data);
		return response.data;
	},

	// data: {'name': 'favor name', 'description': 'description here', 'assignee': pick from other users, 'total_owed_type': 'Monetary'/'Nonmonetary', 'total_owed_amt': 20.50,
	// 'privacy': 'Public'/'Private', 'deleted': True/False, 'completed': True/False, 'active': True/False, 'tags': tag objects? should be able to pick from existing }
	// returns {"success": True, "favor_id": favor.id} if creation is successful
	// {"success": False, "errors": form.errors} if creation unsuccessful
	// {"error": "GET method not allowed"} if wrong http method is used
	createBounty: async (data, token) => {
		const response = await axiosInstance.post("/favors/create/", data, {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	// filterParams: { query: 'and'/'or', owner: user.id, assignee: friend.id, tag: tag.id, status: 'sent'/'received'/'incomplete'/'complete',
	// start_date: 2024-01-30, end_date: 2024-02-30, price_low: 5.00, price_high: 10.50 } if none, leave blank ''
	// sortParams: { sort_by: 'name'/'date'/'amount'/'assignee', order: 'ascending'/'descending' } if none, leave blank ''
	// searchParam: 'some keyword(s) in these quotation marks - searches by bounty title, description, or assignee name'
	// returns {"favors": list of all favors, including all info about a favor}
	// to know what each individual favor looks like, see return object below
	viewBountyList: async (filterParams, sortParams, searchParam, username) => {
		const params = new URLSearchParams({
			...filterParams,
			...sortParams,
			search: searchParam,
		}); // combines all params into one object of URL query format
		console.log(username);
		const response = await axiosInstance.get(`/favors/${username}/?${params}`); // puts params into url
		return response.data;
	},

	deleteBounty: async (id,token) => {
		const response = await axiosInstance.get(`/favors/delete/${id}/`,{
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	completeBounty: async (id,token) => {
		const response = await axiosInstance.get(`/favors/complete/${id}/`,{
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	// id:id # of bounty you want to see
	// returns {"name": favor.name, "id": favor.id, "description": favor.description, "owner": {"id": favor.owner.id, "email": favor.owner.email, "username": favor.owner.username},
	// "assignee": {"id": favor.assignee.id, "email": favor.assignee.email, "username": favor.assignee.username}, "created_at": favor.created_at, "updated_at": favor.updated_at,
	// "total_owed_type": favor.total_owed_type, "total_owed_amt": favor.total_owed_amt, "privacy": favor.privacy, "owner_status": favor.owner_status,
	// "assignee_status": favor.assignee_status, "is_active": favor.active, "is_deleted": favor.deleted, "is_completed": favor.completed, "tags": tags,}
	viewBounty: async (id) => {
		const response = await axiosInstance.get(`/favors/${id}/`);
		return response.data;
	},

	// Once logged in, you don't need to pass in the id. This should send back data in the following format:
	// {"<id of the friend request>": {"from_user": username1, "to_user": username2}, ...}
	getFriendRequests: async (token) => {
		const response = await axiosInstance.get("/users/get-friend-requests/", {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	//Same thing here,  dont need to pass id. Sorrya bout the formatting, the response needs to be a dict.
	//returns {'friend 1': {'username': 'user1', 'id': 0, 'rating': 0, 'image url': 'url'}, 'friend 2': {'username': 'user2', 'id': 1, 'rating': 0, 'image url': 'url'}}

	getFriendsList: async (token) => {
		const response = await axiosInstance.get("/users/get-friends-list/", {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	//username: the username of the friend to request.
	//returns {"success": True}
	sendFriendRequest: async (username, token) => {
		const response = await axiosInstance.get(
			`/users/send-friend-request/${username}/`,
			{
				headers: { authorization: `Token ${token}` },
			},
		);
		return response.data;
	},

	//requestID: the integer id of the request (make sure to cast to string)
	//returns {"success": True}
	acceptFriendRequest: async (requestID, token) => {
		// const response = await axiosInstance.get(
		// 	`/users/accept-friend-request/${requestID}/`,
		// );

		const response = await axiosInstance.get(
			`/users/accept-friend-request/${requestID}/`,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	//requestID: the integer id of the request (make sure to cast to string)
	//returns {"success": True}
	rejectFriendRequest: async (requestID, token) => {
		const response = await axiosInstance.get(
			`/users/reject-friend-request/${requestID}/`,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	// username: "username of friend to remove"
	// returns {"success": True} if successful, {"success": False} if not
	removeFriend: async (username, token) => {
		const response = await axiosInstance.get(
			`/users/remove-friend/${username}/`,
			{ headers: { authorization: `Token ${token}` } },
		);
		return response.data;
	},

	//you need to call this before calling login required methods. It sets the header to the tokens for auth
	setAuthorizationHeader: (token) => {
		axios.defaults.headers.common.Authorization = `Token ${token}`;
	},

	// to_user_username: "username"
	// returns {"amount_owed": balance} where balance is a decimal
	getAmtOwed: async (to_user_username) => {
		try {
			const response = await axiosInstance.get(
				`/favors/amount-owed/${to_user_username}/`,
			);
			return response.data;
		} catch (error) {}
	},

	// returns {"tags": tags_list} where tags_list lists all tags owned by the current user
	// viewTagsList: async () => {
	// 	try {
	// 		const response = await axiosInstance.get("/favors/tags/");
	// 		return response.data;
	// 	} catch (error) {}
	// },

	// returns {"name": "tag name", "id": id#, "color": "#ABCDEF", "favors": list of tagged favors}
	viewTag: async (tag_id) => {
		try {
			const response = await axiosInstance.get(`/favors/tags/${tag_id}`);
			return response.data;
		} catch (error) {}
	},

	// data: {'name': 'favor name', 'description': 'description here', 'assignee': pick from other users, 'total_owed_type': 'Monetary'/'Nonmonetary', 'total_owed_amt': 20.50,
	// 'privacy': 'Public'/'Private', 'deleted': True/False, 'completed': True/False, 'active': True/False, 'tags': tag objects? should be able to pick from existing }
	// id: id#
	// returns {"success": True, "new_favor_pk": id#} or {"success": False, "errors": form.errors} or {"error": "GET method not allowed"}
	// editBounty: async (data, id) => {
	// 	try {
	// 		const response = await axiosInstance.post(`/favors/${id}/edit`, data);
	// 		return response.data;
	// 	} catch (error) {}
	// },

	// data: {'emoji': 'emoji',, 'owner : 'current user', 'name': 'name', 'color': #ABD123, 'tag_type': 'Preset'/'Custom'}
	// returns {"success": True, "tag_id": tag.id} or {"success": False, "errors": form.errors} or {"error": "GET method not allowed"}
	createTag: async (data, token) => {
		try {
			const response = await axiosInstance.post("/favors/tags/create/", data, {
				headers: { authorization: `Token ${token}` },
			});
			return response.data;
		} catch (error) {}
	},

	// data: {'name': 'tag name', 'color': #ABD123, 'tag_type': 'Preset'/'Custom'}
	// returns {"success": True} or {"success": False, "errors": form.errors} or {"error": "GET method not allowed"}
	editTag: async (data, id) => {
		try {
			const response = await axiosInstance.post(
				`/favors/tags/${id}/edit`,
				data,
			);
			return response.data;
		} catch (error) {}
	},

	// id: id#
	// returns {"success": True} or {"success": False}
	deleteTag: async (tag_name) => {
		try {
			const response = await axiosInstance.post(
				`/favors/tags/${tag_name}/delete/`,
			);
			return response.data;
		} catch (error) {}
	},

	// data: {"username": "username", "password": "password", "email": "email@gmail.com"}
	// redirects to '/users/sign-up/'
	registerUser: async (data) => {
		try {
			const response = await axiosInstance.post("/users/register", data);
			return response.data;
		} catch (error) {}
	},

	// token: "verification token"
	// redirect to 'users/sign-up/'
	verifyUser: async (token) => {
		try {
			const response = await axiosInstance.get(`/users/verify/${token}`);
			return response.data;
		} catch (error) {}
	},

	// data: {"pass1": "password", "pass2": "password again", "token": "token"}
	// for return, redirects to 'temp' method
	resetPasswordAttempt: async (data) => {
		try {
			const response = await axiosInstance.post("/users/reset-password/", data);
			return response.data;
		} catch (error) {}
	},

	// getFriendRequests: async (token) => {
	// 	const response = await axiosInstance.get("/users/get-friend-requests/", {
	// 		headers: { authorization: `Token ${token}` },
	// 	});
	// 	return response.data;
	// },

	// returns list of all wishlist objects
	viewWishlist: async (token) => {
		const response = await axiosInstance.get("/wishlist/", {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	// data: {"title": "item title", "price": "##", "url": "link", "photo": image field (upload_to='res/'), "owner": pick from user objects}
	// returns {'form': data dictionary ^}, {'status': 'success', 'item_id': item.id}
	addWishlistItem: async (data) => {
		const response = await axiosInstance.post("/wishlist/add/", data);
		return response.data;
		// try {
		// 	const response = await axiosInstance.post("/wishlist/add/", data);
		// 	return response.data;
		// } catch (error) {}
	},

	// id: id of item to remove
	// returns {'status': 'success', 'item_id': pk}
	removeWishlistItem: async (id, token) => {
		const response = await axiosInstance.post(`/wishlist/remove/${id}/`, {
			headers: { authorization: `Token ${token}` },
		});
		return response.data;
	},

	// getWishlistItemPic: async (id, token) => {
	// 	const response = await axiosInstance.post(
	// 		`wishlist/pic/${id}/`,
	// 		{ headers: { authorization: `Token ${token}` } },
	// 	);
	// 	return response.data;
	// },

	// editWishlistItemPic: async (id, token, data) => {
	// 	const response = await axiosInstance.post(
	// 		`wishlist/pic/${id}/`,
	// 		data,
	// 		{ headers: { authorization: `Token ${token}` } },
	// 	);
	// 	return response.data;
	// },
};

export default apiService;

//     path('profiles/<slug:request_username>/', views.profile, name="profile"),
//     path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
//     path('profiles/<slug:request_username>/edit-bio', views.edit_bio, name="edit_bio"),
//     path('profiles/<slug:request_username>/edit-profile-pic', views.edit_profile_pic, name="edit_profile_pic"),
//     path('profiles/<slug:request_username>/add-link', views.add_link, name="add_link"),
//     path('profiles/<slug:request_username>/remove-link', views.remove_link, name="remove_link"),
//     path('get-token/', rest_framework.authtoken.views.obtain_auth_token)
