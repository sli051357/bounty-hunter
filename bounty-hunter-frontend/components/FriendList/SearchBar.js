import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../UI/IconButton.js";

import { GLOBAL_STYLES } from "../../constants/styles.js";

import { Ionicons } from "@expo/vector-icons";
import FriendSearch from "./FriendSearch";

/*
No real usability, only visual effects right now
*/

function SearchBar() {
	const DUMMY_USERBASE = [
		{
			username: "BobTheBuilder",
			id: "B0183049",
			imageUrl:
				"https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Bob_the_builder.jpg/220px-Bob_the_builder.jpg",
		},
		{
			username: "abigail",
			id: "A0139756",
			imageUrl:
				"https://static.wikia.nocookie.net/stardewvalley/images/a/aa/Abigail_1.png/revision/latest?cb=20160428165828",
		},
		{
			username: "Superman012",
			id: "A87654321",
			imageUrl:
				"https://static.wikia.nocookie.net/marvel_dc/images/a/a5/Superman_Vol_5_1_Textless.jpg/revision/latest/scale-to-width-down/1200?cb=20180711061148",
		},
		{
			username: "Joker13",
			id: "J13503923",
			imageUrl:
				"https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/80_0_2400_1440/master/2400.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ede2b27f1cea7c3be30b938195c0cc5c",
		},
		{
			username: "SamCat2013",
			id: "PU028385",
			imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/Streakycat.png",
		},
		{
			username: "RoboCop_64",
			id: "0DK23JL",
			imageUrl:
				"https://cdn11.bigcommerce.com/s-b70w3e4554/images/stencil/1280x1280/products/206/3015/PCS_011_Robocop__60529.1687876586.jpg?c=1",
		},
		{
			username: "WonderWoman45",
			id: "A1309524",
			imageUrl:
				"https://www.diamondartclub.com/cdn/shop/products/wonder-woman-pop-art-diamond-art-painting-30226211766465.jpg?v=1626580338&width=3133",
		},
	];

	const [text, onChangeText] = React.useState("");
	const [data, setData] = useState([]); // CHANGE TO ACTUAL VALUE
	const [filteredData, setFilteredData] = useState([]);

	function handleSearchPress() {

	}

	const searchFunction = (text) => {
		if (text) {
			const newData = data.filter((item) => {
				const itemData = item.username
					? item.username.toUpperCase()
					: "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredData(newData);
		} else {
			// CHANGE TO DATA WHEN REAL ////////////////////
			setFilteredData(DUMMY_USERBASE);
		}
	};

	return (
		<View>
			{/* Search Bar */}
			<View style={styles.barContainer}>
				<IconButton
					icon="search-circle-outline"
					iconSize={24}
					color={styles.searchIcon.color}
					onPress={handleSearchPress}
				/>

				<TextInput
					style={styles.textInput}
					onChangeText={(text) => {
						onChangeText();
						searchFunction(text);
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
		marginRight: 5,
	},
	textInput: {
		fontFamily: "BaiJamjuree-Medium",
		fontSize: 14,
	},
});

export default SearchBar;
