import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethods: [{'paymentName' : 'venmo', 'username': ''}
        , {'paymentName': 'zelle', 'username': ''}]
}
// paymentMethods[i].paymentType is Display Name : i is 0 or 1
// paymentMethods[i].paymentType is username : i is 0 or 1
const paymentMethodsSlice = createSlice({
    name: 'PaymentMethods',
    initialState: initialState,
    reducers: {
        addPaymentMethod: (state, action) => {
            const paymentName = action.payload.paymentName;
            const username = action.payload.username;
            if (paymentName === 'venmo'){
                state.paymentMethods[0].username = username
            } else {
                state.paymentMethods[1].username = username
            }
        },
        removePaymentMethod: (state, action) => {
            const paymentName = action.payload;
            if (paymentName === 'venmo'){
                state.paymentMethods[0].username = ''
            } else {
                state.paymentMethods[1].username = ''
            }
        },
    }
});

export const { addPaymentMethod, removePaymentMethod } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;