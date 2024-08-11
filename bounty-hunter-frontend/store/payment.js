import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	paymentMethods: {},
};
// paymentMethods[i] = {provider string, username string}
const paymentMethodsSlice = createSlice({
	name: "PaymentMethods",
	initialState: initialState,
	reducers: {
		addPaymentMethod: (state, action) => {
			const { linkIdentifier, provider, username } = action.payload;
			state.paymentMethods[linkIdentifier] = [provider, username];
		},
		removePaymentMethod: (state, action) => {
			const { linkIdentifier } = action.payload;
			delete state.paymentMethods[linkIdentifier];
		},
		setPaymentMethod: (state, action) => {
			state.paymentMethods = action.payload;
		},
		resetPaymentList: () => initialState,
	},
});

export const {
	addPaymentMethod,
	removePaymentMethod,
	resetPaymentList,
	setPaymentMethod,
} = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;
