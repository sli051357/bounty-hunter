import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles.js";

import { Ionicons } from "@expo/vector-icons";

/*
No real usability, only visual effects right now
*/

function SearchBar() {
	const [text, onChangeText] = React.useState("");

	return (
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
