import { TextInput, Text, View, StyleSheet} from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import IconButton from "../IconButton";

function ManageLinks({ username, paymentName, editUsername, deletePayment, saveEdits }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{paymentName}:</Text>
            <TextInput
                style={[styles.text, styles.editBox]}
                placeholder="Username..."
                onChangeText={(text) => editUsername(text)}
                value={username}
            />
            <View style={styles.buttonContainer}>
                <IconButton
                    icon="trash"
                    color={GLOBAL_STYLES.colors.blue300}
                    onPress={() => deletePayment("venmo")}
                    iconSize={28}
                />
                <IconButton
                    icon="checkbox"
                    color={GLOBAL_STYLES.colors.blue300}
                    onPress={saveEdits}
                    iconSize={28}
                />
            </View>
		</View>
    )
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
    text: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 18,
	},
});

export default ManageLinks;