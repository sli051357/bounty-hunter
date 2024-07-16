import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethods: []
}

const paymentMethodsSlice = createSlice({
    name: 'PaymentMethods',
    initialState: initialState,
    reducers: {
        addPaymentMethod: (state, action) => {
            state.paymentMethods.push(action.payload);
        },
        removePaymentMethod: (state, action) => {
            state.paymentMethods.splice(state.paymentMethods.indexOf(action.payload), 1);
        },
    }
});

export const { addPaymentMethod, removePaymentMethod } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;