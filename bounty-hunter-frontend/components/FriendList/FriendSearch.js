import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

import { MaterialIcons } from "@expo/vector-icons";

function FriendSearch({ user, imagePath }) {
	function sendRequest() {
		console.log("request sent");
	}

	return (
		<View style={styles.card}>
			{/* Profile Picture */}
			<Image style={styles.picture} source={{ uri: imagePath }} />

			{/* Friend Text */}
			<View>
				<Text style={styles.usernameText}>{user.username}</Text>
				<Text style={styles.userID}>{user.id}</Text>
			</View>

			<View style={{ flexDirection: "row", marginLeft: "auto" }}>
				<View
					style={[
						styles.button,
						{ backgroundColor: GLOBAL_STYLES.colors.orange300 },
					]}
				>
					<Pressable onPress={sendRequest}>
						<MaterialIcons
							name="person-add-alt"
							size={20}
							color={GLOBAL_STYLES.colors.brown700}
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

export default FriendSearch;
