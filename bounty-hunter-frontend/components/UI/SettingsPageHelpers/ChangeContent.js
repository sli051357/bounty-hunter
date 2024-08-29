import { StyleSheet, Text, TextInput, View } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import TitleWithButton from "../TitleWithButton";

function ChangeContent({
	title,
	onPressToggleEdit,
	onPressSaveChanges,
	currText,
	isEditing,
	helperText,
}) {
	let editText = (
		<>
			<TitleWithButton
				title={title}
				titleColor={GLOBAL_STYLES.colors.orange700}
				icon="create-sharp"
				iconColor={GLOBAL_STYLES.colors.orange700}
				onPress={onPressToggleEdit}
			/>
			<Text style={[styles.text, styles.editBox]}>{currText}</Text>
			<Text style={styles.helperText}>{helperText}</Text>
		</>
	);

	if (isEditing) {
		editText = (
			<>
				<TitleWithButton
					title={title}
					titleColor={GLOBAL_STYLES.colors.orange700}
					icon="checkmark-circle-sharp"
					iconColor={GLOBAL_STYLES.colors.orange700}
					onPress={onPressToggleEdit}
				/>
				<TextInput
					style={[styles.text, styles.editBox]}
					onChangeText={(text) => onPressSaveChanges(text)}
					value={currText}
					multiline={true}
					maxLength={175}
				/>
				<Text style={styles.helperText}>{helperText}</Text>
			</>
		);
	}

	return <View>{editText}</View>;
}

const styles = StyleSheet.create({
	text: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 18,
		fontFamily: "BaiJamjuree-Regular",
	},
	editBox: {
		borderColor: GLOBAL_STYLES.colors.brown700,
		borderRadius: 8,
		padding: 4,
		paddingHorizontal: 8,
		borderWidth: 1.5,
	},
	helperText: {
		color: GLOBAL_STYLES.colors.orange700,
		textAlign: "left",
		fontFamily: "BaiJamjuree-Regular",
		marginTop: 5,
	},
});

export default ChangeContent;
