import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import apiService from "../../../api/apiRequest";
import { GLOBAL_STYLES } from "../../../constants/styles";
import EditTagPopup from "./EditTagPopup";
import Tag from "./Tag";

const AddTagScreen = ({ currTags, tagsUpdateHandler }) => {
	const authToken = useSelector((state) => state.authToken.authToken);
	const [tags, setTags] = useState(currTags);
	const [tagInput, setTagInput] = useState("");
	const [emojiInput, setEmojiInput] = useState("🍀"); // default emoji
	const [selectedColor, setSelectedColor] = useState(
		GLOBAL_STYLES.colors.brown500,
	);

	useEffect(() => {
		tagsUpdateHandler(tags);
	}, [tagsUpdateHandler, tags]);

	async function createTagCustom(tag) {
		try {
			const response = await apiService.createTag(tag, authToken);
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteTagCustom(tag) {
		try {
			const response = await apiService.deleteTag(tag.name);
		} catch (error) {
			console.error(error);
		}
	}

	function addPresetTag(text, color, emoji) {
		const index = tags.findIndex((tag) => tag.text === text);
		console.log(index);
		if (index === -1) {
			setTags((prev) => [
				...prev,
				{
					name: text,
					emoji: emoji,
					color: color,
				},
			]);
		}
	}

	const addTag = () => {
		if (tagInput.trim() && emojiInput.trim()) {
			setTags([
				...tags,
				{
					name: tagInput.trim(),
					emoji: emojiInput.trim(),
					color: selectedColor,
					tag_type: "Custom",
				},
			]);
			createTagCustom({
				name: tagInput.trim(),
				emoji: emojiInput.trim(),
				color: selectedColor,
				tag_type: "Custom",
			});
			setTagInput("");
			setEmojiInput("🍀"); // reset to default
		}
	};

	const removeTag = (index) => {
		const tagToRemove = tags[index];
		deleteTagCustom(tagToRemove);
		const newTags = tags.filter((_, i) => i !== index);
		setTags(newTags);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>Tags</Text>

				{/* preset tags */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Preset</Text>
					<View style={styles.line} />
					<View style={styles.presetTagsContainer}>
						<Pressable
							style={[styles.presetTag, { backgroundColor: "#F2B093" }]}
							onPress={() => addPresetTag("Shopping", "#F2B093", "🛍️")}
						>
							<Text style={styles.presetTagText}>🛍️ Shopping</Text>
						</Pressable>
						<Pressable
							style={[styles.presetTag, { backgroundColor: "#F2B093" }]}
							onPress={() => addPresetTag("Dining", "#F2B093", "🍽️")}
						>
							<Text style={styles.presetTagText}>🍽️ Dining</Text>
						</Pressable>
						<Pressable
							style={[styles.presetTag, { backgroundColor: "#F2B093" }]}
							onPress={() => addPresetTag("Travel", "#F2B093", "✈️")}
						>
							<Text style={styles.presetTagText}>✈️ Travel</Text>
						</Pressable>
					</View>
				</View>

				{/* custom tags */}
				<View style={styles.section}>
					<View style={styles.customTagsHeader}>
						<Text style={styles.sectionTitle}>Selected</Text>
					</View>
					<View style={styles.line} />
					<FlatList
						data={tags}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<View style={[styles.tag, { backgroundColor: item.color }]}>
								<Text style={styles.emoji}>{item.emoji}</Text>
								<Text style={styles.tagText}>{item.name}</Text>
								<Pressable onPress={() => removeTag(index)}>
									<Text style={styles.removeButtonText}>X</Text>
								</Pressable>
							</View>
						)}
						horizontal={true}
						style={styles.tagList}
					/>
				</View>

				{/* custom tags creation */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Create Custom Tag</Text>
					<View style={styles.line} />
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Click to name"
							value={tagInput}
							onChangeText={setTagInput}
							placeholderTextColor="#999"
						/>
						<TextInput
							style={[styles.input, styles.emojiInput]}
							placeholder="Icon"
							value={emojiInput}
							onChangeText={setEmojiInput}
							placeholderTextColor="#999"
						/>
					</View>
					<View style={styles.colorPickerContainer}>
						{/* color options */}
						<View style={styles.colorPickerContainer}>
							{/* color presets */}
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#F3674D" },
									selectedColor === "#F3674D" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#F3674D")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#F78C44" },
									selectedColor === "#F78C44" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#F78C44")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#FFDE80" },
									selectedColor === "#FFDE80" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#FFDE80")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#FDF389" },
									selectedColor === "#FDF389" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#FDF389")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#95CF93" },
									selectedColor === "#95CF93" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#95CF93")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#52C8ED" },
									selectedColor === "#52C8ED" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#52C8ED")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#5381C1" },
									selectedColor === "#5381C1" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#5381C1")}
							/>
							<Pressable
								style={[
									styles.colorOption,
									{ backgroundColor: "#8E71B2" },
									selectedColor === "#8E71B2" && styles.selectedColorOption,
								]}
								onPress={() => setSelectedColor("#8E71B2")}
							/>
							<Pressable style={styles.addColorOption}>
								{/* placeholder for adding new colors */}
								<Text style={styles.addColorText}>+</Text>
							</Pressable>
						</View>
						<Pressable style={styles.createButton} onPress={addTag}>
							<Text style={styles.createButtonText}>Create</Text>
						</Pressable>
					</View>
					{/* edit tag popup */}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: GLOBAL_STYLES.colors.brown300,
	},
	container: {
		padding: 20,
		flex: 1,
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 24,
		fontFamily: "BaiJamjuree-Bold",
		color: GLOBAL_STYLES.colors.blue300,
		marginBottom: 20,
		textAlign: "center",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.brown700,
		marginBottom: 10,
	},
	line: {
		borderWidth: 0.5,
		borderColor: GLOBAL_STYLES.colors.brown700,
		marginBottom: 10,
	},
	presetTagsContainer: {
		flexDirection: "row",
	},
	presetTag: {
		borderRadius: 10,
		padding: 7,
		marginRight: 10,
	},
	presetTagText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 13,
	},
	customTagsHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	editButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	editText: {
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.blue300,
		marginLeft: 5,
	},
	inputContainer: {
		flexDirection: "row-reverse",
		alignItems: "center",
		marginBottom: 15,
	},
	input: {
		fontFamily: "BaiJamjuree-Regular",
		flex: 1,
		borderColor: GLOBAL_STYLES.colors.brown500,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		color: "#000",
		marginHorizontal: 5,
		minWidth: 100,
	},
	emojiInput: {
		fontFamily: "BaiJamjuree-Regular",
		width: 40,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		borderColor: GLOBAL_STYLES.colors.brown500,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		textAlign: "center",
	},
	tagList: {
		marginTop: 10,
	},
	tag: {
		flexDirection: "row",
		alignItems: "center",
		padding: 7,
		borderRadius: 10,
		marginRight: 10,
		// height: 36,
	},
	emoji: {
		marginRight: 2,
		fontSize: 13,
	},
	tagText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 13,
	},
	removeButtonText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		paddingLeft: 5,
	},
	colorPickerContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
	},
	colorOption: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 5,
	},
	selectedColorOption: {
		borderColor: GLOBAL_STYLES.colors.brown500,
		borderWidth: 2,
	},
	addColorOption: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 5,
		justifyContent: "center",
		alignItems: "center",
		borderColor: GLOBAL_STYLES.colors.brown500,
		borderWidth: 1,
		backgroundColor: GLOBAL_STYLES.colors.brown300,
	},
	addColorText: {
		color: GLOBAL_STYLES.colors.brown500,
		fontSize: 18,
		fontWeight: "bold",
	},
	createButton: {
		backgroundColor: GLOBAL_STYLES.colors.blue300,
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	createButtonText: {
		fontSize: 16,
		fontFamily: "BaiJamjuree-Bold",
		color: GLOBAL_STYLES.colors.brown300,
		fontWeight: "bold",
	},
});

export default AddTagScreen;
