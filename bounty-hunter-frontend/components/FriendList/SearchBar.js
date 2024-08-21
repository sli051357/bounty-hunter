import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../UI/IconButton.js";

import { GLOBAL_STYLES } from "../../constants/styles.js";

import { Ionicons } from "@expo/vector-icons";
import apiService from "../../api/apiRequest.js";
import FriendSearch from "./FriendSearch";

/*
No real usability, only visual effects right now
*/

function SearchBar({ onProfilePress }) {
	const navigation = useNavigation();

	const [text, setText] = React.useState("");
	const [filteredData, setFilteredData] = useState([]);

	async function handleSearchPress() {
		const response = await apiService.searchUsers(text);
		setFilteredData(response.users);
	}

	return (
		<View>
			{/* Search Bar */}
			<View style={styles.barContainer}>
				<IconButton
					icon="search-circle-outline"
					iconSize={24}
					color={styles.searchIcon.color}
					onPress={handleSearchPress}
					style={styles.searchIcon}
				/>

				<TextInput
					style={styles.textInput}
					onChangeText={(text) => {
						setText(text);
						//searchFunction(text);
					}}
					value={text}
					placeholder="Search..."
				/>
			</View>

			{filteredData.map((user) => (
				<FriendSearch
					key={user.username}
					user={user}
					imagePath={user.imageUrl}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	barContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: GLOBAL_STYLES.colors.orange100,
		margin: 5,
		alignItems: "center",
		borderRadius: 100,
		marginBottom: 10,
	},
	searchIcon: {
		color: GLOBAL_STYLES.colors.brown700,
		marginLeft: 5,
		marginRight: 20,
	},
	textInput: {
		fontFamily: "BaiJamjuree-Medium",
		fontSize: 14,
	},
});

export default SearchBar;
