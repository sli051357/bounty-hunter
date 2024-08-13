import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles.js";

import { Ionicons } from "@expo/vector-icons";

/*
No real usability, only visual effects right now
*/

function SearchBar() {
	const DUMMY_USERBASE = [
		{
			username: "BobTheBuilder",
			id: "B0183049",
			imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Bob_the_builder.jpg/220px-Bob_the_builder.jpg",
		},
		{
			username: "abigail",
			id: "A0139756",
			imageUrl: "https://static.wikia.nocookie.net/stardewvalley/images/a/aa/Abigail_1.png/revision/latest?cb=20160428165828",
		}
	];
	const [text, onChangeText] = React.useState("");
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	return (
		<View>
			{/* Search Bar */}
			<View style={styles.barContainer}>
				<Ionicons
					name="search-circle-outline"
					size={24}
					style={styles.searchIcon}
				/>

				<TextInput
					style={styles.textInput}
					onChangeText={onChangeText}
					value={text}
					placeholder="Search..."
				/>
			</View>

			<ScrollView>

			</ScrollView>
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
	},
	searchIcon: {
		color: GLOBAL_STYLES.colors.brown700,
		marginLeft: 5,
		marginRight: 5,
	},
	textInput: {
		fontFamily: "BaiJamjuree-Medium",
		fontSize: 14,
	},
});

export default SearchBar;
