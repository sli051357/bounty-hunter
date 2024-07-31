import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "../../components/UI/IconButton";
import ScrollViewHelper from "../../components/UI/ScrollViewHelper";
import { GLOBAL_STYLES } from "../../constants/styles";
import { addPaymentMethod, removePaymentMethod } from "../../store/payment";

function UserLinkedAccountsScreen() {
	const dispatch = useDispatch();
	const payments = useSelector((state) => state.paymentMethods.paymentMethods);
	// console.log(payments)
	const [venmo, setVenmo] = useState({
		paymentName: "venmo",
		username: payments[0].username,
	});
	const [zelle, setZelle] = useState({
		paymentName: "zelle",
		username: payments[1].username,
	});

	function editVenmoPaymentHandler(text) {
		setVenmo((prevState) => ({
			...prevState,
			username: text,
		}));
	}
	function editZellePaymentHandler(text) {
		setZelle((prevState) => ({
			...prevState,
			username: text,
		}));
	}
	function saveVenmoHandler() {
		if (venmo.username.length > 0) {
			dispatch(addPaymentMethod(venmo));
		}
	}
	function saveZelleHandler() {
		if (zelle.username.length > 0) {
			dispatch(addPaymentMethod(zelle));
		}
	}
	function deletePaymentHandler(type) {
		if (type === "venmo") {
			// console.log(type)
			editVenmoPaymentHandler("");
		} else {
			editZellePaymentHandler("");
		}
		dispatch(removePaymentMethod(type));
	}
	// Come back later to update payment methods to databases via axios api

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<View style={styles.page}>
				<Text style={styles.mainHeader}>Linked Accounts</Text>
				<View style={styles.container}>
					<Text style={styles.title}>Venmo:</Text>
					<TextInput
						style={[styles.text, styles.editBox]}
						placeholder="Username..."
						onChangeText={(text) => editVenmoPaymentHandler(text)}
						value={venmo.username}
					/>
					<View style={styles.buttonContainer}>
						<IconButton
							icon="trash"
							color={GLOBAL_STYLES.colors.blue300}
							onPress={() => deletePaymentHandler("venmo")}
							iconSize={28}
						/>
						<IconButton
							icon="checkbox"
							color={GLOBAL_STYLES.colors.blue300}
							onPress={saveVenmoHandler}
							iconSize={28}
						/>
					</View>
				</View>
				<View style={styles.container}>
					<Text style={styles.title}>Zelle:</Text>
					<TextInput
						style={[styles.text, styles.editBox]}
						placeholder="Username..."
						onChangeText={(text) => editZellePaymentHandler(text)}
						value={zelle.username}
					/>
					<View style={styles.buttonContainer}>
						<IconButton
							icon="trash"
							color={GLOBAL_STYLES.colors.blue300}
							onPress={() => deletePaymentHandler("zelle")}
							iconSize={28}
						/>
						<IconButton
							icon="checkbox"
							color={GLOBAL_STYLES.colors.blue300}
							onPress={saveZelleHandler}
							iconSize={28}
						/>
					</View>
				</View>
			</View>
		</ScrollViewHelper>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		flex: 1,
		paddingHorizontal: "10%",
		paddingVertical: 12,
		gap: 18,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	mainHeader: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 36,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
	container: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "stretch",
		gap: 4,
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
	buttonContainer: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 6,
	},
});

export default UserLinkedAccountsScreen;
