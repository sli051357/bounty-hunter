import { resetAuthToken } from "../authToken";
import { resetBountyList } from "../bountyList";
import { resetFriendList } from "../friendList";
import { resetPassToken } from "../passToken";
import { resetPaymentList } from "../payment";
import { resetRating } from "../rating";
import { resetUsername } from "../username";
import { clearStore } from "./clearStore";
import { store } from "./store";

export const resetApp = async () => {
	try {
		await clearStore();
		store.dispatch(resetFriendList());
		store.dispatch(resetBountyList());
		store.dispatch(resetAuthToken());
		store.dispatch(resetPaymentList());
		store.dispatch(resetRating());
		store.dispatch(resetUsername());
		store.dispatch(resetPassToken());
		console.log("Application state has been reset");
	} catch (error) {
		console.error("Failed to reset application state:", error);
	}
};
