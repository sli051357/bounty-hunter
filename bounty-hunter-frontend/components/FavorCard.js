import { Ionicons } from "@expo/vector-icons";
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import apiService from "../api/apiRequest";
//import IconButton from "./UI/IconButton";
import { GLOBAL_STYLES } from "../constants/styles";

/* 
Implementation Notes: 
    - The Pressable Component needs to receieve an 'onPress' prop that will
    take the user to more Edit Favor page.
    - The 'favor' prop is to take info of the favor. DUMMY_FAVORS_OF_PROFILE 
    outlines the object keys and values that are in the favor. 
    - Tags will be added once Tag system has been set up, following the mockup
    designs. 
    - The 'check-mark' icon is suppose to reflect the status of the icon. It will
    be changed in the edit favor. 
*/

function FavorCard({ favor, onPress }) {
	const [picInfo, setPicInfo] = useState({
		assignee: "",
		sender: "",
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getProfilePictures() {
			setIsLoading(true);
			try {
				const assignPicResponse = await apiService.getUserPic(favor.assignee);
				const senderPicResponse = await apiService.getUserPic(favor.owner);
				console.log(assignPicResponse)
				console.log(senderPicResponse)
				setPicInfo({
					assignee: assignPicResponse.url,
					sender: senderPicResponse.url,
				});
			} catch (error) {
				console.error(error);
			}
			setIsLoading(false);
		}
		getProfilePictures();
	}, [favor.sender, favor.assignee]);

	if (isLoading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}

	dayjs.extend(utc);
	return (
		<Pressable onPress={!favor.completed ? onPress : null}>
			<View style={styles.container}>
				<View style={[styles.innerContainer, { alignItems: "flex-start" }]}>
					<View style={styles.iconsContainer}>
						<Image style={styles.icon} source={{ uri: picInfo.sender }} />
						<Ionicons
							name="arrow-forward"
							size={22}
							color={GLOBAL_STYLES.colors.blue300}
							style={styles.icon}
						/>
						<Image style={styles.icon} source={{ uri: picInfo.assignee }} />
					</View>
					<Text style={styles.mainTextLeft}>{favor.name}</Text>
					<Text style={styles.text}>{favor.description}</Text>
				</View>
				<View style={[styles.innerContainer, { alignItems: "flex-end" }]}>
					<Text style={styles.text}>
						Created: {dayjs(favor.created_at).utc().format("YYYY-MM-DD")}
					</Text>
					<Text style={styles.mainTextRight}>
						{favor.total_owed_type === "Monetary"
							? `$${favor.total_owed_amt}`
							: favor.total_owed_wishlist}
					</Text>
					<Ionicons
						name={!favor.completed ? "code-working" : "checkbox"}
						size={22}
						color={GLOBAL_STYLES.colors.blue300}
						style={styles.icon}
					/>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 3,
		width: "100%",
		borderColor: GLOBAL_STYLES.colors.brown500,
		flexDirection: "row",
		borderRadius: 12,
		justifyContent: "space-between",
		padding: 12,
		marginVertical: 8,
		backgroundColor: GLOBAL_STYLES.colors.brown400,
	},
	innerContainer: {
		flex: 1,
		overflow: "hidden",
	},
	iconsContainer: {
		flexDirection: "row",
		gap: 6,
	},
	icon: {
		width: 22,
		height: 22,
		borderRadius: 11,
	},
	mainTextLeft: {
		fontSize: 22,
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "left",
	},
	mainTextRight: {
		fontSize: 22,
		fontWeight: "bold",
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "right",
	},
	text: {
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 12,
	},
});

export default FavorCard;
