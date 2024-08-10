import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from "redux-persist";
//https://github.com/react-native-async-storage/async-storage/tree/main/packages/default-storage

import authTokenReducer from "../authToken.js";
import paymentMethodsReducer from "../payment.js";
import ratingReducer from "../rating.js";
import userNameReducer from "../username.js";
import bountyListReducer from "./../bountyList.js"; // Remember to complete editBounty
import friendListReducer from "./../friendList.js";
import passTokenReducer from "../passToken.js";

const persistConfig = {
	storage: AsyncStorage,
	key: "root",
};
const rootReducer = combineReducers({
	friendList: friendListReducer,
	bountyList: bountyListReducer,
	authToken: authTokenReducer,
	passToken: passTokenReducer,
	paymentMethods: paymentMethodsReducer,
	rating: ratingReducer,
	username: userNameReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER, FLUSH],
			},
		}),
});
export const persistor = persistStore(store);
