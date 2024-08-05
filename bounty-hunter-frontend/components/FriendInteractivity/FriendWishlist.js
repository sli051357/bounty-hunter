import { useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";
import ScrollViewHelper from "../UI/ScrollViewHelper";
import WishlistCard from "../Wishlist/WishlistCard";

// userId will be used to fetch user Wishlist using axios and useEffect
function FriendWishlist({ route }) {
	const { userId } = route.params;
	console.log(userId);

	const DUMMY_WISHLIST = [
		{
			title: "Lego Set",
			description:
				"https://www.lego.com/en-us/product/wildflower-bouquet-10313",
			price: "55",
			imagePath:
				"https://www.lego.com/cdn/cs/set/assets/bltc4a6c2103a34f22e/10313_alt2.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1.5",
		},
		{
			title: "CSE Tutoring (2hr)",
			description: "Halp",
			price: "40",
			imagePath: "",
		},
	];

	return (
		<ScrollViewHelper backgroundColor={GLOBAL_STYLES.colors.brown300}>
			<View style={styles.page}>
				<Text style={styles.headerText}>Friend Wishlist</Text>
				{/* Wishlist Mapping */}
				<View style={{ gap: 18 }}>
					{DUMMY_WISHLIST.map((item) => (
						<WishlistCard
							key={item.title}
							title={item.title}
							description={item.description}
							price={item.price}
							imagePath={item.imagePath}
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
		gap: 30,
	},
	headerText: {
		fontFamily: "BaiJamjuree-Bold",
		fontSize: 36,
		color: GLOBAL_STYLES.colors.blue300,
		textAlign: "center",
	},
});

export default FriendWishlist;
