import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { GLOBAL_STYLES } from '../../../constants/styles';
import Tag from './Tag';

const EditTagPopup = ({ tag, visible, onClose, onSave }) => {
	const [emojiInput, setEmojiInput] = useState(tag.emoji);
	const [tagInput, setTagInput] = useState(tag.text);
	const [selectedColor, setSelectedColor] = useState(tag.color);

	const saveTag = () => {
		onSave({ ...tag, emoji: emojiInput, text: tagInput, color: selectedColor });
	};

	return (
		<Modal visible={visible} transparent animationType="slide">
			<View style={styles.modalContainer}>
				<View style={styles.popup}>
					<Text style={styles.popupTitle}>Edit Custom Tag</Text>

					<Tag emoji={emojiInput} text={tagInput} color={selectedColor} />

					<TextInput
						style={styles.input}
						placeholder="Tag name"
						value={tagInput}
						onChangeText={setTagInput}
					/>
					<TextInput
						style={[styles.input, styles.emojiInput]}
						placeholder="Emoji"
						value={emojiInput}
						onChangeText={setEmojiInput}
					/>
					<View style={styles.colorPickerContainer}>
						{/* color options */}
						<View style={styles.colorPickerContainer}>
							{/* color presets */}
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#F3674D" },
									selectedColor === "#F3674D" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#F3674D")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#F78C44" },
									selectedColor === "#F78C44" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#F78C44")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#FFDE80" },
									selectedColor === "#FFDE80" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#FFDE80")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#FDF389" },
									selectedColor === "#FDF389" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#FDF389")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#95CF93" },
									selectedColor === "#95CF93" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#95CF93")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#52C8ED" },
									selectedColor === "#52C8ED" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#52C8ED")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#5381C1" },
									selectedColor === "#5381C1" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#5381C1")}
							/>
							<TouchableOpacity
								style={[
									styles.colorOption,
									{ backgroundColor: "#8E71B2" },
									selectedColor === "#8E71B2" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#8E71B2")}
							/>
							<TouchableOpacity style={styles.addColorOption}>
								{/* placeholder for adding new colors */}
								<Text style={styles.addColorText}>+</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity style={styles.createButton} onPress={addTag}>
							<Text style={styles.createButtonText}>Create</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.saveButton} onPress={saveTag}>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	popup: {
		width: "80%",
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderRadius: 10,
		padding: 20,
	},
	popupTitle: {
		fontSize: 18,
		fontFamily: "BaiJamjuree-Bold",
		color: GLOBAL_STYLES.colors.brown700,
		marginBottom: 15,
		textAlign: "center",
	},
	input: {
		fontFamily: "BaiJamjuree-Regular",
		borderColor: GLOBAL_STYLES.colors.brown500,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		color: "#000",
		marginBottom: 15,
	},
	emojiInput: {
		width: 40,
		textAlign: "center",
	},
	colorPickerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	saveButton: {
		backgroundColor: GLOBAL_STYLES.colors.blue300,
		padding: 10,
		borderRadius: 5,
	},
	cancelButton: {
		backgroundColor: GLOBAL_STYLES.colors.brown700,
		padding: 10,
	},
	cancelButtonText: {
		fontSize: 16,
		fontFamily: "BaiJamjuree-Bold",
		color: GLOBAL_STYLES.colors.brown300,
		fontWeight: "bold",
	},
});

export default EditTagPopup;
