import { configureStore } from "@reduxjs/toolkit";

import friendListReducer from './../friendList.js';
import bountyListReducer from './../bountyList.js'; // Remember to complete editBounty
import authTokenReducer from '../authToken.js';
import paymentMethodsReducer from '../payment.js';
import ratingReducer from '../rating.js';
import userNameReducer from '../username.js';

export const store = configureStore({
    reducer: {
        friendList: friendListReducer,
        bountyList: bountyListReducer,
        authToken: authTokenReducer,
        paymentMethods: paymentMethodsReducer,
        rating: ratingReducer,
        username: userNameReducer
    }
})