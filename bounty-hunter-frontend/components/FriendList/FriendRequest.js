import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

/* 
* Implementation Notes:
- "user" is an object for a requesting user that includes their nickname, ID, and profile picture
- imagePath currently proves that you can pass different image paths with the same map, although this might not be necessary if "friend" contains the image file/link itself instead of a hard-coded asset
*/

function FriendCard({ user, imagePath }) {
	function addRequest() {
		console.log("friend added");
	}

	function deleteRequest() {
		console.log("request deleted");
	}

	return (
		<View style={styles.card}>
			{/* Profile Picture */}
			<Image style={styles.picture} source={imagePath} />

			{/* Friend Text */}
			<View>
				<Text style={styles.usernameText}>{user.username}</Text>
				<Text style={styles.userID}>{user.id}</Text>
			</View>

			<View style={{ flexDirection: "row", marginLeft: "auto" }}>
				<View
					style={[
						styles.button,
						{ backgroundColor: GLOBAL_STYLES.colors.orange700 },
					]}
				>
					<Pressable onPress={addRequest}>
						<FontAwesome
							name="check"
							size={20}
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
					<Pressable onPress={deleteRequest}>
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
});

export default FriendCard;
