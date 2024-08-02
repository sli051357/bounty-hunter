import { persistor } from "./store.js";

export const clearStore = async () => {
	try {
		await persistor.purge();
		console.log("Persisted state has been purged");
	} catch (error) {
		console.error("Failed to purge persisted state:", error);
	}
};
