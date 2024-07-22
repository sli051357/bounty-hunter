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
        }
    }
})

export const { setAuthToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;