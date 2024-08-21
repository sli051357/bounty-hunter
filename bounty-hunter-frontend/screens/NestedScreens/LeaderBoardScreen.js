import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import apiService from "../../api/apiRequest";
import LeaderboardFriendTab from "../../components/LeaderboardFriendTab";
import ScrollViewHelper from "../../components/UI/ScrollViewHelper";
import { GLOBAL_STYLES } from "../../constants/styles";
import { fullYear } from "../../util/date";
import { DETAILED_FRIEND_LIST } from "../../util/dummy-data";

/*
    Need an axios call to get current FriendList with
    - Friend ID,
    - Friend username
    - Friend profile reference
    - Friend Rating
    (Look at dummy_data DETAILED_FRIEND_LIST for reference)
*/

function LeaderBoardScreen() {
	const navigation = useNavigation();
	const authToken = useSelector((state) => state.authToken.authToken);
	const username = useSelector((state) => state.username.username);
	const [friendList, setFriendList] = useState([]);
	const [loading, setIsLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			const fetchProfile = async () => {
				setIsLoading(true);
				try {
					const friendList = await apiService.getFriendsList(authToken);
					const favoriteList = await apiService.getFavoritedFriends(authToken);
					const myRating = await apiService.getRating(username);
					const myProfilePic = await apiService.getUserPic(username);
					const mergedList = { ...friendList, ...favoriteList };
					const tempFriendList = [];
					Object.entries(mergedList).map(
						([username, [id, rating, imageUrl]]) => {
							const entry = {
								friendUsername: username,
								friendRating: rating,
								friendProfilePic: imageUrl,
								friendId: id,
							};
							tempFriendList.push(entry);
						},
					);
					tempFriendList.push({
						friendUsername: username,
						friendRating: myRating.rating,
						friendProfilePic: myProfilePic.imageUrl,
						friendId: username,
					});
					console.log(tempFriendList);
					setFriendList(
						tempFriendList.sort((a, b) => b.friendRating - a.friendRating),
					);
				} catch (error) {
					console.log(error);
				}
				setIsLoading(false);
			};

			fetchProfile();
		}, [authToken, username]),
	);

	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<View style={styles.page}>
				<Text style={styles.mainHeader}>Leaderboard</Text>
				<Text style={styles.dateHeader}>{fullYear}</Text>
				<View style={styles.listContainer}>
					{friendList.map((value, index) => (
						<LeaderboardFriendTab
							username={value.friendUsername}
							rating={value.friendRating}
							userImage={value.friendProfilePic}
							rank={index + 1}
							key={value.friendId}
						/>
					))}
				</View>
			</View>
		</ScrollViewHelper>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "10%",
		paddingVertical: 4,
		gap: 8,
		alignItems: "stretch",
		justifyContent: "center",
	},
	mainHeader: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 30,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
	dateHeader: {
		fontFamily: "BaiJamjuree-Regular",
		fontSize: 18,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
		marginBottom: 12,
	},
	listContainer: {
		gap: 24,
		flex: 1,
	},
});

export default LeaderBoardScreen;
