import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
	favoriteList: [],
};

const favoriteListSlice = createSlice({
	name: "favoriteList",
	initialState: initialState,
	reducers: {
		addFavorite: (state, action) => {
			state.favoriteList.push(action.payload);
		},
		//pass in username
		removeFavorite: (state, action) => {
			const idx = state.favoriteList.indexOf(action.payload);
			if (idx > -1) {
				state.favoriteList.splice(idx, 0);
			}
		},

		resetFavoriteList: () => initialState,
	},
});

export const { addFavorite, removeFavorite, resetBountyList } =
	favoriteListSlice.actions;
export default favoriteListSlice.reducer;
