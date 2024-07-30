import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
 } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
//https://github.com/react-native-async-storage/async-storage/tree/main/packages/default-storage

import friendListReducer from './../friendList.js';
import bountyListReducer from './../bountyList.js'; // Remember to complete editBounty
import authTokenReducer from '../authToken.js';
import paymentMethodsReducer from '../payment.js';
import ratingReducer from '../rating.js';
import userNameReducer from '../username.js';

const persistConfig = {
    storage: AsyncStorage,
    key: 'root'
}
const rootReducer = combineReducers({
    friendList: friendListReducer,
    bountyList: bountyListReducer,
    authToken: authTokenReducer,
    paymentMethods: paymentMethodsReducer,
    rating: ratingReducer,
    username: userNameReducer
})

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER, FLUSH],
            }
        })
});
export const persistor = persistStore(store);