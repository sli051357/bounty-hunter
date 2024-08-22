import React from "react";
import { useCallback, useEffect, useState } from "react";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSelector } from "react-redux";
import apiService from "../../api/apiRequest";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay";
import { GLOBAL_STYLES } from "../../constants/styles";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import WishlistImage from "./WishlistImage";

function WishlistAdd({ isVisible, onYes, onNo, onClose }) {
	const [nameText, onChangeNameText] = React.useState("");
	const [priceText, onChangePriceText] = React.useState("");
	const [linkText, onChangeLinkText] = React.useState("");

	let nameIsValid = true;
	let priceIsValid = true;
	// let imageIsValid = true;
	const [nameValidRender, setNameValidRender] = React.useState(nameIsValid);
	const [priceValidRender, setPriceValidRender] = React.useState(priceIsValid);
	// const [imageValidRender, setImageValidRender] = React.useState()

	const [selectedImage, setSelectedImage] = React.useState(null);
	const [base64Name, setBase64Name] = React.useState("");
	const [fileName, setFileName] = React.useState("");
	const [isUploading, setIsUploading] = useState(false);
	const username = useSelector((state) => state.username.username);

	const pickImageAsync = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
			aspect: [1, 1],
			base64: true,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setBase64Name(result.assets[0].base64);
			setFileName(result.assets[0].fileName);
		}
	};

	function removeImage() {
		setSelectedImage(null);
		setBase64Name(null);
		setFileName(null);
	}

	function clearInputs() {
		nameIsValid = false;
		priceIsValid = false;
		onChangeNameText("");
		onChangePriceText("");
		onChangeLinkText("");
		removeImage();
	}

	/////
	function checkInputs() {
		nameIsValid = nameText.length > 0;
		priceIsValid = priceText.length > 0;
		setNameValidRender(nameIsValid);
		setPriceValidRender(priceIsValid);
		if (nameIsValid === true && priceIsValid === true) {
			clearInputs();
			createItem();
			onYes();
		}
	}

	async function createItem() {
		setIsUploading(true);
		try {
			const newItem = {
				title: nameText,
				description: linkText,
				price: priceText,
				filename: fileName,
				photo: base64Name,
				owner: username,
				deleted: false,
			};
			const response = await apiService.addWishlistItem(
				JSON.stringify(newItem),
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		setIsUploading(false);
	}

	if (isUploading) {
		<LoadingOverlay
			message="Inputting data..."
			backgroundColor={{ backgroundColor: GLOBAL_STYLES.colors.brown500 }}
		/>;
	}

	function cancelAdd() {
		clearInputs();
		onNo();
	}

	return (
		<Modal visible={isVisible} transparent={true}>
			<View style={styles.modalContainer}>
				<View style={styles.modalStyle}>
					<View>
						<Pressable onPress={cancelAdd}>
							<Ionicons
								name="chevron-back"
								size={24}
								color={GLOBAL_STYLES.colors.brown700}
								style={{ marginBottom: 10 }}
							/>
						</Pressable>
					</View>

					<View
						style={{
							borderBottomWidth: 2,
							borderColor: GLOBAL_STYLES.colors.brown700,
							paddingBottom: 5,
							marginTop: 10,
						}}
					>
						<Text style={styles.titleText}>Add Item</Text>
					</View>

					<ScrollView>
						{/* Name Input */}
						<View style={{ marginTop: 15 }}>
							<View style={{ flexDirection: "row" }}>
								<Text style={styles.headerText}>Name </Text>
								<Text
									style={[
										styles.headerText,
										{ color: GLOBAL_STYLES.colors.blue700 },
									]}
								>
									*
								</Text>
							</View>

							<TextInput
								style={styles.textInput}
								onChangeText={onChangeNameText}
								value={nameText}
							/>

							{nameValidRender ? (
								<View />
							) : (
								<Text style={styles.errorText}>This field is required.</Text>
							)}
						</View>

						{/* Price Input */}
						<View style={{ marginTop: 15 }}>
							<View style={{ flexDirection: "row" }}>
								<Text style={styles.headerText}>Price </Text>
								<Text
									style={[
										styles.headerText,
										{ color: GLOBAL_STYLES.colors.blue700 },
									]}
								>
									*
								</Text>
							</View>

							<TextInput
								inputMode="numeric"
								style={styles.textInput}
								onChangeText={onChangePriceText}
								value={priceText}
							/>

							{priceValidRender ? (
								<View />
							) : (
								<Text style={styles.errorText}>This field is required.</Text>
							)}
						</View>

						{/* Link/Description */}
						<View style={{ marginTop: 15 }}>
							<Text style={styles.headerText}>Link / Description </Text>

							<TextInput
								multiline={true}
								style={styles.textInput}
								onChangeText={onChangeLinkText}
								value={linkText}
							/>
						</View>

						{/* Photo Upload */}
						<View style={{ marginTop: 15 }}>
							<Text style={styles.headerText}>Photo</Text>
						</View>

						<View style={{ flexDirection: "row" }}>
							{/* Image Preview */}

							<View style={{ marginRight: 10, marginVertical: 10 }}>
								<WishlistImage selectedImage={selectedImage} />
							</View>

							{/* Buttons */}
							<View style={{ marginTop: 10 }}>
								<Pressable
									onPress={pickImageAsync}
									style={[
										styles.photoButton,
										{
											backgroundColor: GLOBAL_STYLES.colors.yellow300,
											borderColor: GLOBAL_STYLES.colors.brown700,
										},
									]}
								>
									<Text
										style={{
											fontSize: 14,
											color: GLOBAL_STYLES.colors.brown700,
											fontFamily: "BaiJamjuree-Regular",
										}}
									>
										Upload
									</Text>
								</Pressable>

								<Pressable
									onPress={removeImage}
									style={[
										styles.photoButton,
										{
											backgroundColor: GLOBAL_STYLES.colors.orange300,
											borderColor: GLOBAL_STYLES.colors.blue300,
										},
									]}
								>
									<Text
										style={{
											fontSize: 14,
											color: GLOBAL_STYLES.colors.blue300,
											fontfamily: "BaiJamjuree-Regular",
										}}
									>
										Remove
									</Text>
								</Pressable>
							</View>
						</View>
					</ScrollView>

					<View>
						<Pressable
							onPress={checkInputs}
							style={[
								styles.photoButton,
								{
									backgroundColor: GLOBAL_STYLES.colors.orange700,
									borderWidth: 0,
									marginTop: 20,
								},
							]}
						>
							<Text
								style={{
									fontSize: 17,
									color: GLOBAL_STYLES.colors.brown300,
									fontFamily: "BaiJamjuree-SemiBold",
								}}
							>
								Add Item
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: GLOBAL_STYLES.colors.gray500,
		display: "flex",
	},
	modalStyle: {
		height: "75%",
		width: "100%",
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
		padding: 30,
	},
	titleText: {
		fontSize: 20,
		fontFamily: "BaiJamjuree-Medium",
		color: GLOBAL_STYLES.colors.brown700,
	},
	headerText: {
		fontSize: 17,
		fontFamily: "BaiJamjuree-SemiBold",
		color: GLOBAL_STYLES.colors.orange700,
	},
	textInput: {
		fontSize: 17,
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		borderWidth: 1.5,
		borderColor: GLOBAL_STYLES.colors.brown700,
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: "center",
		borderRadius: 5,
		marginVertical: 5,
	},
	photoButton: {
		borderWidth: 1.5,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		margin: 5,
	},
	imagePreview: {
		width: 100,
		height: 100,
		backgroundColor: "blue",
		borderRadius: 10,
		marginRight: 10,
		marginVertical: 10,
	},
	errorText: {
		marginTop: 2,
		color: GLOBAL_STYLES.colors.orange700,
		fontFamily: "BaiJamjuree-Regular",
		fontSize: 14,
	},
});

export default WishlistAdd;
