import { View, Text, StyleSheet, Image, Pressable, ScrollView} from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';

function WishlistCard({ title, description, price, imagePath }) {
    return (
        <View style={styles.card}>
            <View style={{width: '70%'}}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.descriptionText}>{description}</Text>
                <Text style={styles.priceText}>${price}</Text>
            </View>

            <View style={{width: '30%'}}>
                <Image style={styles.imageStyle} source={imagePath}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: GLOBAL_STYLES.colors.yellow300,
        borderWidth: 3,
        borderColor: GLOBAL_STYLES.colors.orange300,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 20,
        color: GLOBAL_STYLES.colors.orange700,
        margin: 5,
    },
    descriptionText: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 11,
        color: GLOBAL_STYLES.colors.brown700,
        margin: 5,
        marginTop: 0,
    },
    priceText: {
        fontFamily: 'BaiJamjuree-SemiBold',
        fontSize: 17,
        color: GLOBAL_STYLES.colors.blue300,
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
})

export default WishlistCard;