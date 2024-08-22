import { useState, useEffect, useCallback } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { useSelector } from "react-redux";
import apiService from "../../api/apiRequest";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import { GLOBAL_STYLES } from "../../constants/styles";

import ScrollViewHelper from "../../components/UI/ScrollViewHelper.js";
import FloatingButton from "../../components/UI/FloatingButton.js";
import WishlistAdd from "../../components/Wishlist/WishlistAdd.js";
import WishlistCard from "../../components/Wishlist/WishlistCard.js";
import WishlistDelete from "../../components/Wishlist/WishlistDelete.js";

function WishlistScreen({ user }) {
	const authToken = useSelector((state) => state.authToken.authToken);

	const [userWishlist, setUserWishlist] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const [isEditing, setIsEditing] = useState(false);
	const [isAddVisible, setIsAddVisible] = useState(false);

	const fetchWishlist = useCallback(async () => {
		setError(null);
		setIsLoading(true);

		try {
			const response = await apiService.viewWishlist(authToken);
			if (!response) {
				throw new Error("Undefined Information");
			}
			console.log(response);
			setUserWishlist(response);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
			setError("Failed to fetch wishlist. Please try again.");
			setIsLoading(false);
		}
	}, [authToken]);
	
	useEffect(() => {
		fetchWishlist();
		
		const intervalId = setInterval(() => fetchWishlist(), 60000);
		return () => clearInterval(intervalId);
	}, [fetchWishlist]);

	function isEditingHandler() {
		setIsEditing((curr) => !curr);
	}

	function considerAdd() {
		console.log("consider adding item");
		setIsAddVisible(true);
	}

	function addItem() {
		console.log("item added");
		setIsAddVisible(false);
		// setRerender((curr) => !curr);
		fetchWishlist();
	}

	function cancelAdd() {
		console.log("add item canceled");
		setIsAddVisible(false);
	}

	async function deleteItem(itemId) {
		data = itemId.toString();
		response = await apiService.removeWishlistItem(itemId, authToken);
		if (response.status === "success") {
			fetchWishlist();
		} else {
			console.log("failed");
		}
	}

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
		<View style={styles.page}>
			<View>
				<Text style={styles.headerText}>My Wishlist</Text>
			</View>

			{/* Edit Button */}
			<View>
				{!isEditing ? (
					<Pressable onPress={isEditingHandler} style={styles.editButton}>
						<Text style={styles.editButtonText}>Edit</Text>
						<Feather
							name="edit-2"
							size={13}
							color={GLOBAL_STYLES.colors.orange700}
						/>
					</Pressable>
				) : (
					<Pressable onPress={isEditingHandler} style={styles.doneButton}>
						<Text style={styles.doneButtonText}>Done</Text>
					</Pressable>
				)}
			</View>

			{/* Wishlist Mapping */}
			<View>
				{/* {DUMMY_WISHLIST.map((item) => (
					<WishlistCard
						key={item.title}
						title={item.title}
						description={item.description}
						price={item.price}
						imagePath={item.imagePath}
						editStatus={isEditing}
					/>
				))} */}

				{Object.entries(userWishlist).map(
					([title, [name, description, price, username, imageUrl, pk]]) => (
						<WishlistCard
							key={pk}
							title={title}
							description={description}
							price={price}
							imagePath={imageUrl}
							itemId={pk}
							editStatus={isEditing}
							onDelete={deleteItem}
						/>
					)
				)}
			</View>

			{/* Add Button */}
			{isEditing ? (
				<FloatingButton
					onPress={considerAdd}
					icon="add"
					color={GLOBAL_STYLES.colors.orange700}
				/>
			) : null}

			<WishlistAdd isVisible={isAddVisible} onYes={addItem} onNo={cancelAdd} />
		</View>
		</ScrollViewHelper>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingTop: 100,
	},
	headerText: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 36,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
		marginBottom: -15,
	},
	editButton: {
		backgroundColor: GLOBAL_STYLES.colors.yellow300,
		borderWidth: 3,
		borderColor: GLOBAL_STYLES.colors.orange300,
		borderRadius: 20,
		paddingLeft: 10,
		paddingRight: 10,
		marginLeft: "auto",
		flexDirection: "row",
		marginRight: "5%",
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	editButtonText: {
		color: GLOBAL_STYLES.colors.orange700,
		fontSize: 13,
		fontFamily: "BaiJamjuree-Regular",
		marginRight: 5,
	},
	doneButton: {
		backgroundColor: GLOBAL_STYLES.colors.brown700,
		borderWidth: 3,
		borderColor: GLOBAL_STYLES.colors.brown700,
		borderRadius: 20,
		paddingLeft: 10,
		paddingRight: 10,
		marginLeft: "auto",
		marginRight: "5%",
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	doneButtonText: {
		color: GLOBAL_STYLES.colors.brown300,
		fontSize: 13,
		fontFamily: "BaiJamjuree-Regular",
	},
	addButton: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderWidth: 3,
		borderColor: GLOBAL_STYLES.colors.orange700,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 100,
		marginLeft: "auto",
	},
});

export default WishlistScreen;
