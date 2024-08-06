import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function FilterSlider({ minPrice, maxPrice }) {
	const [priceFilter, setPriceFilter] = useState([minPrice, maxPrice]);

	const handlePriceFilterChange = (value) => {
		setPriceFilter(value);
	};

	return (
		<View>
			<View style={styles.container}>
				<MultiSlider
					values={priceFilter}
					onValuesChange={handlePriceFilterChange}
					sliderLength={350}
					min={minPrice}
					max={maxPrice}
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
					Min: ${priceFilter[0]}
				</Text>

				<Text style={[styles.labelText, { marginLeft: "auto" }]}>
					Max: ${priceFilter[1]}
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
