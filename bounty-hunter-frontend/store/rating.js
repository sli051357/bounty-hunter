import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rating: ""
}

const ratingSlice = createSlice({
    name: 'Rating',
    initialState: initialState,
    reducer: {
        setRating: (state, action) => {
            state.rating = action.payload;
        }
    }
})

export const { setRating } = ratingSlice.actions;
export default ratingSlice.reducer;