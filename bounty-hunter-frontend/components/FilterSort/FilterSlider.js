import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function FilterSlider({ minPrice, maxPrice, onPress }) {
	const handlePriceFilterChange = (value) => {
		onPress(value);
	};

	return (
		<View>
			<View style={styles.container}>
				<MultiSlider
					values={[minPrice, maxPrice]}
					onValuesChange={handlePriceFilterChange}
					sliderLength={350}
					min={0}
					max={1000}
					step={1}
					allowOverlap={false}
					snapped={true}
					markerStyle={{ backgroundColor: GLOBAL_STYLES.colors.brown700 }}
					selectedStyle={{ backgroundColor: GLOBAL_STYLES.colors.brown700 }}
					unselectedStyle={{ backgroundColor: GLOBAL_STYLES.colors.orange300 }}
				/>
			</View>

			<View style={{ flexDirection: "row", alignItems: "stretch" }}>
				<Text style={[styles.labelText, { marginRight: "auto" }]}>
					Min: ${minPrice}
				</Text>

				<Text style={[styles.labelText, { marginLeft: "auto" }]}>
					Max: ${maxPrice === 1000 ? "MAX" : maxPrice}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	labelText: {
		fontFamily: "BaiJamjuree-Regular",
		color: GLOBAL_STYLES.colors.brown700,
		fontSize: 17,
		marginTop: -10,
	},
});

export default FilterSlider;
