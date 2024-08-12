import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	friendList: [
		{
			id: "A87654321",
			friendName: "Superman012",
			friendNickname: "Super",
			favoriteStatus: true,
		},
		{
			id: "J13503923",
			friendName: "Joker13",
			friendNickname: "Joker13",
			favoriteStatus: false,
		},
	],
};

const friendListSlice = createSlice({
	name: "FriendList",
	initialState: initialState,
	reducers: {
		addFriend: (state, action) => {
			const friend = {
				id: action.payload.id,
				friendName: action.payload.username,
				friendNickName: action.payload.nickname,
				favoriteStatus: action.payload.favoriteStatus,
			};
			state.friendList.push(friend);
		},
		removeFriend: (state, action) => {
			state.friendList = state.friendList.filter((friend) => {
				return friend.id !== action.payload.id;
			});
		},
		favoriteFriend: (state, action) => {
			console.log("pressed");
			console.log("current state " + state.favoriteStatus);
			return {
				...state,
				favoriteStatus: !state.favoriteStatus
			}
		},
		resetFriendList: () => initialState,
	},
});

export const { addFriend, removeFriend, favoriteFriend, resetFriendList } =
	friendListSlice.actions;
export default friendListSlice.reducer;
