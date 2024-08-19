import { useState, useCallback} from "react";
import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

import { useNavigation, useFocusEffect} from "@react-navigation/native";
import apiService from "../../api/apiRequest";
import { GLOBAL_STYLES } from "../../constants/styles";
import { DUMMY_FAVORS_OF_PROFILE } from "../../util/dummy-data";
import FavorCard from "../FavorCard";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import ScrollViewHelper from "../UI/ScrollViewHelper";
import EditAboutMe from "../UI/UserProfileHelpers/EditAboutMe";
import ViewPaymentMethods from "./ViewPaymentMethods";

function FriendUserProfile({ route }) {
	const navigation = useNavigation();
	const { userId } = route.params;
	const username = userId;
	const [nickname, setNickname] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [aboutMe, setAboutMe] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [bounties, setBounties] = useState([]);
	const paymentMethods = [];
	const [isPfpModalVisible, setIsPfpModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [rating, setRating] = useState("");
	const [friendCount, setFriendCount] = useState("");

	useFocusEffect(
		useCallback(() => {
			const fetchProfile = async () => {
				try {
					//set the bio
					const response = await apiService.getUserBio(username);
					setAboutMe(response.bio);

					const responseHi = await apiService.getRating(username);
					setRating(responseHi.rating);

					const responseHello = await apiService.getFriendCount(username);
					setFriendCount(responseHello.friendCount);

					const response3 = await apiService.getUserPic(username);
					setImageUrl(response3.url);
					console.log(imageUrl);
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			};

			fetchProfile();
		}, [ imageUrl]),
	);







	function toggleEdit() {
		setIsEditing((curr) => !curr);
	}
	function changeNicknameHandler(text) {
		setNickname(text);
	}
	function setNicknameHandler() {
		if (nickname.length > 6) {
			// Set Nickname of Friend
		}
		toggleEdit();
	}

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={isEditing}
				onRequestClose={() => toggleEdit()}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalHeader}>Edit Friend Nickname</Text>
						<TextInput
							style={styles.textInputModal}
							placeholder="Enter..."
							value={nickname}
							textAlignVertical="center"
							onChangeText={changeNicknameHandler}
							maxLength={14}
						/>
						<View style={styles.modalButtonsContainer}>
							<Button
								title="Cancel"
								onPress={toggleEdit}
								buttonStyles={{
									backgroundColor: GLOBAL_STYLES.colors.brown500,
								}}
								containerStyle={{
									backgroundColor: GLOBAL_STYLES.colors.brown500,
									paddingHorizontal: 20,
									borderRadius: 6,
									paddingVertical: 6,
								}}
								textStyle={{ fontSize: 14 }}
							/>
							<Button
								title="Confirm"
								onPress={setNicknameHandler}
								buttonStyles={{ backgroundColor: GLOBAL_STYLES.colors.blue300 }}
								containerStyle={{
									backgroundColor: GLOBAL_STYLES.colors.blue300,
									paddingHorizontal: 20,
									borderRadius: 6,
									paddingVertical: 6,
								}}
								textStyle={{ fontSize: 14 }}
							/>
						</View>
					</View>
				</View>
			</Modal>

			<View style={styles.page}>
				<View style={[styles.userMainDetails]}>
					<View style={styles.userMainDetailsTopView}>
						<View style={styles.imageAndUsernameView}>
							<Image
								style={styles.profilePicture}
								source={require("../../assets/profile.jpeg")}
							/>
							<View>
								<Text style={styles.usernameStyles}>{username}</Text>
								<Text style={styles.smallTextBrown}>#{userId}</Text>
							</View>
						</View>
						<View style={styles.editView}>
							<Pressable onPress={toggleEdit}>
								<Text
									style={[
										styles.smallTextBrown,
										{ textDecorationLine: "underline" },
									]}
								>
									Edit
								</Text>
							</Pressable>
							<IconButton
								icon="pencil"
								color={GLOBAL_STYLES.colors.brown700}
								iconSize={18}
								onPress={toggleEdit}
							/>
						</View>
					</View>
					<View style={styles.userMainDetailsBottomView}>
						<View style={styles.editView}>
							<Text style={[styles.smallTextOrange, { textAlign: "center" }]}>
								Rating:
							</Text>
							<Text style={styles.scoreTextStyles}>{rating}</Text>
						</View>
						<View style={styles.editView}>
							<Text style={[styles.smallTextOrange, { textAlign: "center" }]}>
								Friend Count:{" "}
							</Text>
							<Text style={styles.scoreTextStyles}>
								{friendCount}
							</Text>
						</View>
					</View>
				</View>

					<EditAboutMe aboutMe={aboutMe} />
					<ViewPaymentMethods
						paymentData={paymentMethods}
						onPress={() => navigation.navigate("FriendWishlist", { userId: username })}
					/>
				<View style={styles.recentBountiesStyles}>
					<Text style={styles.subtitle}>Recent Bounties: </Text>
					{bounties.map((favor) => (
						<FavorCard
							key={favor.description}
							favor={favor}
							onPress={() => console.log("Favor Card Details")}
						/>
					))}
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
		alignItems: "stretch",
		justifyContent: "center",
	},
	smallTextBrown: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 18,
	},
	smallTextOrange: {
		color: GLOBAL_STYLES.colors.orange700,
		fontSize: 18,
	},
	userMainDetails: {
		flex: 1,
		gap: 28,
	},
	userMainDetailsTopView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	imageAndUsernameView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 16,
	},
	profilePicture: {
		width: 64,
		height: 64,
		borderRadius: 32,
	},
	usernameStyles: {
		fontSize: 30,
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "left",
	},
	editView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
	},
	userMainDetailsBottomView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	scoreTextStyles: {
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		fontSize: 22,
		textAlign: "center",
	},
	subtitle: {
		color: GLOBAL_STYLES.colors.orange700,
		fontWeight: "bold",
		textAlign: "left",
		fontSize: 18,
	},
	recentBountiesStyles: {
		flex: 1,
		gap: 8,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		maxWidth: 300,
		minWidth: 300,
		padding: 20,
		backgroundColor: GLOBAL_STYLES.colors.brown300,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
	textInputModal: {
		fontSize: 16,
		borderRadius: 12,
		borderColor: GLOBAL_STYLES.colors.brown700,
		color: GLOBAL_STYLES.colors.brown700,
		padding: 4,
		borderWidth: 2,
		minWidth: "100%",
		overflow: "hidden",
	},
	modalButtonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		minWidth: "100%",
	},
	modalHeader: {
		fontSize: 18,
		fontFamily: "BaiJamjuree-Bold",
		textAlign: "center",
	},
});

export default FriendUserProfile;
