import { createSlice } from "@reduxjs/toolkit";

import { DUMMY_FAVORS_OF_PROFILE_Updated } from "../util/dummy-data";

const initialState = {
	bountyList: [],
};

const bountyListSlice = createSlice({
	name: "BountyList",
	initialState: initialState,
	reducers: {
		addBounty: (state, action) => {
			const bounty = {
				favorName: action.payload.favorName,
				bountyId: action.payload.bountyId,
				senderId: action.payload.senderId,
				assigneeId: action.payload.assigneeId,
				dateCreated: action.payload.dateCreated,
				tags: action.payload.tags,
				paymentType: action.payload.paymentType,
				paymentOwed: action.payload.paymentOwed,
				description: action.payload.description,
				status: action.payload.status,
				bountyEditHistory: action.payload.bountyEditHistory,
				privacyStatus: action.payload.privacyStatus,
			};
			state.bountyList.push(bounty);
		},
		removeBounty: (state, action) => {
			state.bountyList = state.bountyList.filter((bounty) => {
				return bounty.bountyId !== action.payload;
			});
		},
		editBounty: (state, action) => {
			const bountyIndex = state.bountyList.findIndex(
				(bounty) => bounty.bountyId === action.payload.bountyId,
			);
			state.bountyList[bountyIndex] = action.payload;
		},
		resetBountyList: () => initialState,
	},
});

export const { addBounty, removeBounty, editBounty, resetBountyList } =
	bountyListSlice.actions;
export default bountyListSlice.reducer;
