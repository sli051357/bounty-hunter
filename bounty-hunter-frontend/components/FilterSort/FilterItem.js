import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../../constants/styles';

function FilterItem({ name, active }) {
    const [isActive, setIsActive] = useState(active);

    function editActiveStatus() {
        setIsActive((curr) => !curr);
    }

    return (
        <Pressable onPress={(editActiveStatus)}>
            {isActive ? (
                <View style={[styles.itemContainer, {backgroundColor: GLOBAL_STYLES.colors.orange300}]}>
                    <Text style={styles.itemText}>{name}</Text>
                </View>
            ) : (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{name}</Text>
                </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 1.5,
        borderColor: GLOBAL_STYLES.colors.brown700,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginRight: 10,
    },
    itemText: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-Regular',
        color: GLOBAL_STYLES.colors.brown700,
    }
})

export default FilterItem;