import * as Clipboard from "expo-clipboard";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";
import PaymentMethod from "../UI/UserProfileHelpers/PaymentMethod";

function ViewPaymentMethods({ paymentData, onPress }) {
	async function copyPayment(payment) {
		await Clipboard.setStringAsync(payment);
	}

	const payments = (
		<View style={styles.container}>
			<Text style={styles.title}>Payment Methods:</Text>
			{paymentData.map((payment) => {
				if (payment.username.length > 0) {
					return (
						<PaymentMethod
							paymentName={`${payment.paymentName}: `}
							paymentUsername={payment.username}
							key={payment.paymentName}
							icon={"attach-outline"}
							onPress={() => copyPayment(payment.username)}
						/>
					);
				}
			})}
			<PaymentMethod
				paymentName="Wishlist"
				paymentUsername=""
				icon="eye"
				onPress={onPress}
			/>
		</View>
	);

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
	},
});

export default ViewPaymentMethods;
