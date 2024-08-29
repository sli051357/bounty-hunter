import * as Clipboard from "expo-clipboard";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import TitleWithButton from "../TitleWithButton";
import PaymentMethod from "./PaymentMethod";

function EditPaymentMethods({ isEditing, userData, managePaymentsPage }) {
	async function copyPayment(payment) {
		await Clipboard.setStringAsync(payment);
	}

	console.log(userData);
	let payments = (
		<View style={styles.container}>
			<Text style={styles.title}>Payment Methods:</Text>
			<>
				{userData.map((entry) => (
					<PaymentMethod
						key={entry.id} // Use the id from the object as the key for the component
						paymentName={entry.provider} // The provider (e.g., "venmo", "zelle")
						paymentUsername={entry.account} // The username associated with the provider
						icon="attach-outline" // The icon to display
						onPress={() => copyPayment(entry.account)} // Function to handle the press event
					/>
				))}
			</>
		</View>
	);

	if (isEditing) {
		payments = (
			<View style={styles.container}>
				<Text style={styles.title}>Payment Methods:</Text>
				{userData.map((entry) => (
					<PaymentMethod
						key={entry.id} // Use the id from the object as the key for the component
						paymentName={entry.provider} // The provider (e.g., "venmo", "zelle")
						paymentUsername={entry.account} // The username associated with the provider
						icon="attach-outline" // The icon to display
						onPress={() => copyPayment(entry.account)} // Function to handle the press event
					/>
				))}
				<Pressable onPress={managePaymentsPage}>
					<Text style={styles.managePayments}>Manage linked accounts</Text>
				</Pressable>
			</View>
		);
	}

	return payments;
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "stretch",
		gap: 4,
		// minHeight: 155,
		flex: 1,
	},
	text: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 18,
		fontFamily: "BaiJamjuree-Regular",
	},
	title: {
		color: GLOBAL_STYLES.colors.orange700,
		textAlign: "left",
		fontSize: 18,
		fontFamily: "BaiJamjuree-SemiBold",
	},
	editBox: {
		fontSize: 18,
		borderRadius: 8,
		borderColor: GLOBAL_STYLES.colors.brown700,
		color: GLOBAL_STYLES.colors.brown700,
		paddingHorizontal: 6,
		paddingVertical: 8,
		borderWidth: 2,
		maxWidth: "100%",
		overflow: "hidden",
		flex: 1,
	},
	managePayments: {
		color: GLOBAL_STYLES.colors.blue300,
		textDecorationLine: "underline",
		textAlign: "left",
		fontFamily: "BaiJamjuree-Regular",
	},
});

export default EditPaymentMethods;
