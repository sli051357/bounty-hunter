import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authToken: ""
}

const authTokenSlice = createSlice({
    name: 'AuthToken',
    initialState: initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        resetAuthToken: () => initialState
    }
})

export const { setAuthToken, resetAuthToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;