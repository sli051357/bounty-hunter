import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../../constants/styles';

function SortItem({ name, active }) {

    const [isActive, setIsActive] = useState(active);

    function editActiveStatus() {
        setIsActive((curr) => !curr);
    }

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{name}</Text>

            <Pressable onPress={(editActiveStatus)} style={{marginLeft: 'auto',}}>
                {isActive ? (
                    <View style={[styles.itemCheck, {backgroundColor: GLOBAL_STYLES.colors.orange300}]}></View>
                ) : (
                    <View style={styles.itemCheck}></View>
                )}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 17,
        fontFamily: 'BaiJamjuree-Regular',
        color: GLOBAL_STYLES.colors.brown700,
    },
    itemCheck: {
        width: 25,
        height: 25,
        borderWidth: 1.5,
        borderColor: GLOBAL_STYLES.colors.brown700,
        borderRadius: 5,
    }
})

export default SortItem;