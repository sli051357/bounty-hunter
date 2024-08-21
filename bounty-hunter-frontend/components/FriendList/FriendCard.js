import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { GLOBAL_STYLES } from "../../constants/styles";

import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import apiService from "../../api/apiRequest";

/* 
* Implementation Notes:
- "friend" is an object for a user's friend that includes their nickname, ID, and profile picture
- imagePath currently proves that you can pass different image paths with the same map, although this might not be necessary if "friend" contains the image file/link itself instead of a hard-coded asset
*/

function FriendCard({
	id,
	username,
	imageUrl,
	favoriteState,
	addFav,
	removeFav,
	onDelete,
	onProfilePress,
}) {
	const [favorite, setFavorite] = useState(favoriteState);
	const authToken = useSelector((state) => state.authToken.authToken);

	async function editFavoriteStatus() {
		setFavorite((curr) => !curr);
	}

	function createFavor() {
		console.log("Favor created");
	}

	function deleteFriend() {
		console.log("Friend deleted");
	}

	return (
		<View style={styles.card}>
			<View style={styles.userDetails}>
				{/* Profile Picture */}
				<Pressable onPress={onProfilePress}>
					<Image style={styles.picture} source={{ uri: imageUrl }} />
				</Pressable>
				{/* Friend Text */}
				<View style={styles.friendText}>
					<Text style={styles.usernameText}>{id}</Text>
					<Text style={styles.userID}>{username}</Text>
				</View>
				<View style={{ marginLeft: 15 }}>
					{favorite ? (
						<Pressable
							onPress={() => {
								removeFav(username);
								editFavoriteStatus;
							}}
						>
							<AntDesign
								name="star"
								size={24}
								color={GLOBAL_STYLES.colors.orange700}
							/>
						</Pressable>
					) : (
						<Pressable
							onPress={() => {
								addFav(username);
								editFavoriteStatus;
							}}
						>
							<AntDesign
								name="staro"
								size={24}
								color={GLOBAL_STYLES.colors.orange300}
							/>
						</Pressable>
					)}
				</View>
			</View>

			<View style={{ flexDirection: "row", marginLeft: "auto" }}>
				<View
					style={[
						styles.button,
						{ backgroundColor: GLOBAL_STYLES.colors.orange700 },
					]}
				>
					<Pressable onPress={createFavor}>
						<FontAwesome6
							name="money-bill-transfer"
							size={24}
							color={GLOBAL_STYLES.colors.brown300}
						/>
					</Pressable>
				</View>

				<View
					style={[
						styles.button,
						{ backgroundColor: GLOBAL_STYLES.colors.orange300 },
					]}
				>
					<Pressable
						onPress={() => {
							onDelete(username);
						}}
					>
						<MaterialIcons
							name="delete"
							size={20}
							color={GLOBAL_STYLES.colors.brown300}
						/>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 10,
	},
	picture: {
		width: 45,
		height: 45,
		borderRadius: 22.5,
		marginRight: 10,
	},
	horizontalContainer: {
		flexDirection: "row",
	},
	usernameText: {
		fontFamily: "BaiJamjuree-SemiBold",
		fontSize: 20,
		color: GLOBAL_STYLES.colors.blue300,
		marginBottom: -5,
	},
	userID: {
		fontFamily: "BaiJamjuree-Regular",
		fontSize: 12,
		color: GLOBAL_STYLES.colors.brown700,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		marginLeft: 10,
	},
	userDetails: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	friendText: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
});

export default FriendCard;
