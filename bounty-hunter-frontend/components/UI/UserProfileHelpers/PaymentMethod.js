import { StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import IconButton from "../IconButton";

function PaymentMethod({ icon, paymentName, paymentUsername, onPress}) {
	return (
		<View style={styles.container}>
			<IconButton
				icon={icon}
				color={GLOBAL_STYLES.colors.brown700}
				onPress={onPress}
				iconSize={18}
			/>
			<Text style={styles.title}>
				{paymentName.toUpperCase() + ": "}
				{paymentUsername}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		justifyContent: "flex-start",
		marginVertical: 8,
	},
	title: {
		fontSize: 18,
		color: GLOBAL_STYLES.colors.brown700,
		textAlign: "center",
	},
});

export default PaymentMethod;
