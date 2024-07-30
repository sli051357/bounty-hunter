import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rating: ""
}

const ratingSlice = createSlice({
    name: 'Rating',
    initialState: initialState,
    reducers: {
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        resetRating: () => initialState
    }
})

export const { setRating, resetRating } = ratingSlice.actions;
export default ratingSlice.reducer;