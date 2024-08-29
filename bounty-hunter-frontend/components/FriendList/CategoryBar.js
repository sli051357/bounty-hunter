import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles.js";

import { AntDesign } from "@expo/vector-icons";

/*
Implementation Notes:
This is the bar that swaps between categories on the friend list page. Unfortunately I couldn't quite figure out how to do this without hardcoding each button individually, but I also don't see this sort of category thing being used on other pages, so maybe that will be okay (or someone smarter than me can help fix it lol)
*/

function CategoryBar({ stateChanger, list1, list2, list3 }) {
	const [button1, setButton1] = useState(true);
	const [button2, setButton2] = useState(false);
	const [button3, setButton3] = useState(false);

	function clickButton1() {
		setButton1(true);
		setButton2(false);
		setButton3(false);
		stateChanger(1);
	}

	function clickButton2() {
		setButton1(false);
		setButton2(true);
		setButton3(false);
		stateChanger(2);
	}

	function clickButton3() {
		setButton1(false);
		setButton2(false);
		setButton3(true);
		stateChanger(3);
	}

	return (
		<View style={styles.barContainer}>
			<Pressable onPress={clickButton1} style={{ width: "25%" }}>
				{button1 ? (
					<View
						style={[
							styles.button,
							{ backgroundColor: GLOBAL_STYLES.colors.orange700 },
						]}
					>
						<Text style={styles.buttonText}>
							All ({Object.keys(list1).length + Object.keys(list2).length})
						</Text>
					</View>
				) : (
					<View style={[styles.button]}>
						<Text style={styles.buttonText}>All</Text>
					</View>
				)}
			</Pressable>

			<Pressable onPress={clickButton2} style={{ width: "37.5%" }}>
				{button2 ? (
					<View
						style={[
							styles.button,
							{ backgroundColor: GLOBAL_STYLES.colors.orange700 },
						]}
					>
						<Text style={styles.buttonText}>
							Favorites ({Object.keys(list2).length})
						</Text>
					</View>
				) : (
					<View style={[styles.button]}>
						<Text style={styles.buttonText}>Favorites</Text>
					</View>
				)}
			</Pressable>

			<Pressable onPress={clickButton3} style={{ width: "37.5%" }}>
				{button3 ? (
					<View
						style={[
							styles.button,
							{ backgroundColor: GLOBAL_STYLES.colors.orange700 },
						]}
					>
						<Text style={styles.buttonText}>
							Requests ({Object.keys(list3).length})
						</Text>
					</View>
				) : (
					<View style={[styles.button]}>
						<Text style={styles.buttonText}>Requests</Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	barContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: GLOBAL_STYLES.colors.orange300,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
	},
	button: {
		backgroundColor: GLOBAL_STYLES.colors.orange300,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontFamily: "BaiJamjuree-Medium",
		fontSize: 17,
		color: GLOBAL_STYLES.colors.brown300,
	},
});

export default CategoryBar;
