import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import apiService from "../../../api/apiRequest";
import ScrollViewHelper from "../../../components/UI/ScrollViewHelper";
import ManageLinks from "../../../components/UI/UserProfileHelpers/ManageLinks";
import { GLOBAL_STYLES } from "../../../constants/styles";

function UserLinkedAccountsScreen() {
	const username = useSelector((state) => state.username.username);
	const [currPayments, setCurrPayments] = useState({});

	useFocusEffect(
		useCallback(() => {
			const fetchLinks = async () => {
				try {
					const response = apiService.getUserLinks(username);
					setCurrPayments(response);
				} catch (error) {
					console.log(error);
				}
			};
			fetchLinks();
		}, [username]),
	);

	function editUsernameHandler() {}

	function deletePaymentHandler() {}

	function saveEditsHandler() {}

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<View style={styles.page}>
				<Text style={styles.mainHeader}>Linked Accounts</Text>
				<ManageLinks />
				<ManageLinks />
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
});

export default UserLinkedAccountsScreen;
