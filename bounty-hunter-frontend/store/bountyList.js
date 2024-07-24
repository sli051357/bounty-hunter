import { createSlice } from "@reduxjs/toolkit";

import { DUMMY_FAVORS_OF_PROFILE_Updated } from "../util/dummy-data";

const initialState = {
    bountyList: []
}

const bountyListSlice = createSlice({
    name: 'BountyList',
    initialState: initialState,
    reducers: {
        addBounty: (state, action) => {
            const bounty = {
                bountyId: action.payload.bountyId,
                senderId: action.payload.senderId,
                receiverId: action.payload.receiverId,
                dateCreated: action.payload.dateCreated,
                tags: action.payload.tags,
                paymentType: action.payload.paymentType,
                paymentOwed: action.payload.paymentOwed,
                description: action.payload.description,
                status: action.payload.status,
                bountyEditHistory: action.payload.bountyEditHistory,
                privacyStatus: action.payload.privacyStatus

            }
            state.bountyList.push(bounty)
        }, 
        removeBounty: (state, action) => {
            state.bountyList = state.bountyList.filter((bounty) => {
                return bounty.bountyId !== action.payload;
            })

        },
        editBounty: (state, action) => {
            // Todo (refer to State manage sheet)
        }
    }
});

export const { addBounty, removeBounty, editBounty } = bountyListSlice.actions;
export default bountyListSlice.reducer;