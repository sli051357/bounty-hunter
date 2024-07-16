import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friendList: []
}

const friendListSlice = createSlice({
    name: 'FriendList',
    initialState: initialState,
    reducers: {
        addFriend: (state, action) => {
            const friend = {
                id: action.payload.id,
                friendName: action.payload.username,
                friendNickName: action.payload.nickname
            }
            state.friendList.push(friend);
        },
        removeFriend: (state, action) => {
            state.friendList = state.friendList.filter((friend) => {
                return friend.id !== action.payload.id
            })
        }
    }
});

export const { addFriend, removeFriend } = friendListSlice.actions;
export default friendListSlice.reducer;