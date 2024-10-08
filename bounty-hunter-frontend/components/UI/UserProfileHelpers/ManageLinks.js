import { StyleSheet, Text, TextInput, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import IconButton from "../IconButton";

function ManageLinks({
	username,
	paymentName,
	editUsername,
	deletePayment,
	editPaymentType,
	saveEdits,
	isEditing = false,
	index,
}) {
	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.text, styles.editBox]}
				placeholder="Payment Provider..."
				onChangeText={(text) => editPaymentType(text, index)}
				value={paymentName}
			/>
			<TextInput
				style={[styles.text, styles.editBox]}
				placeholder="Username..."
				onChangeText={(text) => editUsername(text, index)}
				value={username}
			/>
			<View style={styles.buttonContainer}>
				{isEditing && (
					<IconButton
						icon="trash"
						color={GLOBAL_STYLES.colors.blue300}
						onPress={() => deletePayment(index)}
						iconSize={28}
					/>
				)}
				<IconButton
					icon="checkbox"
					color={GLOBAL_STYLES.colors.blue300}
					onPress={() => saveEdits(index)}
					iconSize={28}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "stretch",
		gap: 4,
		flex: 1,
	},
	title: {
		color: GLOBAL_STYLES.colors.orange700,
		fontWeight: "bold",
		textAlign: "left",
		fontSize: 18,
	},
	editBox: {
		fontSize: 18,
		borderRadius: 8,
		borderColor: GLOBAL_STYLES.colors.brown700,
		color: GLOBAL_STYLES.colors.brown700,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderWidth: 1.5,
		maxWidth: "100%",
		overflow: "hidden",
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 6,
		marginTop: 10,
	},
	text: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 18,
		fontFamily: "BaiJamjuree-Regular",
	},
});

export default ManageLinks;
