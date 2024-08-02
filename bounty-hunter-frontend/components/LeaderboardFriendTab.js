import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../constants/styles";

function LeaderboardFriendTab({
	username,
	rating,
	userImage,
	rank,
	friendProfilePage,
}) {
	return (
		<Pressable
			onPress={friendProfilePage}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.container}>
				<View style={styles.userDetailsView}>
					<Text style={styles.rankingText}>{rank}</Text>
					<Image
						source={require("./../assets/profile.jpeg")}
						style={styles.image}
					/>
					<Text style={styles.usernameText}>{username}</Text>
				</View>
				<Text style={styles.ratingText}>{rating}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: GLOBAL_STYLES.colors.brown400,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: GLOBAL_STYLES.colors.brown500,
	},
	userDetailsView: {
		flexDirection: "row",
		gap: 12,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	rankingText: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 30,
		textAlign: "left",
		color: GLOBAL_STYLES.colors.blue300,
	},
	image: {
		width: 64,
		height: 64,
		borderRadius: 32,
	},
	usernameText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.orange700,
		fontSize: 18,
		textAlign: "center",
	},
	ratingText: {
		fontFamily: "BaiJamjuree-Bold",
		color: GLOBAL_STYLES.colors.orange700,
		fontSize: 18,
		textAlign: "right",
	},
	pressed: {
		opacity: 0.75,
		borderRadius: 22,
		borderWidth: 2,
		borderColor: GLOBAL_STYLES.colors.orange700,
	},
});

export default LeaderboardFriendTab;
