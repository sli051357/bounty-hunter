import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";

function InputFields({
	type,
	typeTitle,
	onPress,
	maxLength,
	value,
	keyboardType,
	children,
	multiLineStyles,
	multiline = false,
	editable = true,
}) {
	return (
		<View style={[styles.container, multiLineStyles]}>
			<Text style={[styles.label]}>{typeTitle}</Text>
			{children}
			<TextInput
				onChangeText={(text) => onPress(text, type)}
				numberOfLines={1}
				maxLength={maxLength}
				value={value}
				keyboardType={keyboardType}
				style={[styles.textInput]}
				multiline={multiline}
				textAlignVertical="top"
				editable={editable}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "stretch",
		justifyContent: "stretch",
		gap: 4,
	},
	label: {
		fontSize: 18,
		textAlign: "left",
		color: GLOBAL_STYLES.colors.orange700,
		fontFamily: "BaiJamjuree-SemiBold",
	},
	textInput: {
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
		fontFamily: "BaiJamjuree-Regular",
	},
	inputIsInValid: {
		borderColor: GLOBAL_STYLES.colors.error300,
	},
});

export default InputFields;
