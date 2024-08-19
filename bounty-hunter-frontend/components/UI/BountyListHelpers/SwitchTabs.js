import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";

function SwitchTabs({ tabOne, tabTwo, onPress, isActive, containerStyles, editable = true }) {
	return (
		<View style={[styles.container, containerStyles]}>
			<Pressable
				style={[
					styles.defaultPressableStyles,
					isActive && styles.selectedPressableStyles,
				]}
				onPress={editable ? () => onPress(tabOne) : null}
			>
				<Text style={[styles.defaultText, isActive && styles.selectedText]}>
					{tabOne}
				</Text>
			</Pressable>
			<Pressable
				style={[
					styles.defaultPressableStyles,
					!isActive && styles.selectedPressableStyles,
				]}
				onPress={editable ? () => onPress(tabTwo) : null}
			>
				<Text style={[styles.defaultText, !isActive && styles.selectedText]}>
					{tabTwo}
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignSelf: "flex-start",
		flexDirection: "row",
		borderRadius: 20,
		backgroundColor: GLOBAL_STYLES.colors.brown500,
	},
	defaultPressableStyles: {
		backgroundColor: GLOBAL_STYLES.colors.brown500,
		borderRadius: 20,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	selectedPressableStyles: {
		backgroundColor: GLOBAL_STYLES.colors.orange700,
	},
	defaultText: {
		color: GLOBAL_STYLES.colors.brown700,
	},
	selectedText: {
		color: GLOBAL_STYLES.colors.brown300,
	},
});

export default SwitchTabs;
