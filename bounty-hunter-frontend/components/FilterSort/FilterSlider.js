import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

function FilterSlider() {
    const [priceFilter, setPriceFilter] = useState([10, 30]);

    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FilterSlider;