import { StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import IconButton from "../IconButton";

function BountyLogTab({ tabDescription, type, onPress, disabled = true }) {
	
	if (type === "Complete Request" || type === "Delete Request" || type === "Creation") {
		return (
			<View style={styles.bountyTabContainer}>
				<Text style={styles.description}>{tabDescription}</Text>
				<View style={styles.buttonContainer}>
					<IconButton
						icon="checkmark-circle"
						onPress={() => onPress("accept")}
						color={GLOBAL_STYLES.colors.brown300}
						iconSize={28}
						disabled={disabled}
					/>
					<IconButton
						icon="close-circle"
						onPress={() => onPress("deny")}
						color={GLOBAL_STYLES.colors.error700}
						iconSize={28}
						disabled={disabled}
					/>
				</View>
			</View>
		);
	}
	if (type === "Edit") {
		return (
			<View>
				<Text>{tabDescription}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bountyTabContainer: {
		flex: 1,
		backgroundColor: GLOBAL_STYLES.colors.brown500,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		minWidth: "100%",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 20,
	},
	description: {
		fontSize: 14,
		fontFamily: "BaiJamjuree-Bold",
		textAlign: "left",
		color: GLOBAL_STYLES.colors.brown700
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
});

export default BountyLogTab;
