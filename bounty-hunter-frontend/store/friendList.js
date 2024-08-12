import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	friendList: [
		// { nickname: "Superman012", id: "A87654321", fav: true },
		// { nickname: "Joker13", id: "J13503923", fav: false },
		// { nickname: "SamCat2013", id: "PU028385", fav: false },
		// { nickname: "RoboCop_64", id: "0DK23JL", fav: false },
		// { nickname: "WonderWoman45", id: "A1309524", fav: true },
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
			return {
				...state,
				friends: state.friendList.map(friend => {
					if (friend.id !== action.payload.id) {
						return friend;
					}

					return {
						...friend,
						favoriteStatus: !friend.favoriteStatus
					}
				})
			}
		},
		resetFriendList: () => initialState,
	},
});

export const { addFriend, removeFriend, resetFriendList } =
	friendListSlice.actions;
export default friendListSlice.reducer;
