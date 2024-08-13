import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	passToken: "",
};

const passTokenSlice = createSlice({
	name: "passToken",
	initialState: initialState,
	reducers: {
		setPassToken: (state, action) => {
			state.passToken = action.payload;
		},
		resetPassToken: () => initialState,
	},
});

export const { setPassToken, resetPassToken } = passTokenSlice.actions;
export default passTokenSlice.reducer;
