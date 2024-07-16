import { createSlice } from "@reduxjs/toolkit";

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
                status: action.payload.description,
                bountyEditHistory: action.payload.bountyEditHistory
            }
            state.bountyList.push(bounty)
        }, 
        removeBounty: (state, action) => {
            state.bountyList = state.bountyList.filter((bounty) => {
                bounty.bountyId !== action.payload.bountyId
            })
        },
        editBounty: (state, action) => {
            // Todo (refer to State manage sheet)
        }
    }
});

export const { addBounty, removeBounty, editBounty } = bountyListSlice.actions;
export default bountyListSlice.reducer;