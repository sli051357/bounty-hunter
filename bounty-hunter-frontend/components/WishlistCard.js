import { View, Text, StyleSheet, Image, Pressable, Linking} from 'react-native';
import { useState } from 'react';

import Hyperlink from 'react-native-hyperlink';

import { GLOBAL_STYLES } from '../constants/styles';

function WishlistCard({ title, description, price, imagePath }) {
    return (
        <View style={styles.card}>
            <View style={{width: '69%', flexWrap: 'wrap'}}>
                <Text style={styles.titleText}>{title}</Text>

                <Hyperlink linkDefault={true} linkStyle={styles.linkStyle}>
                    <Text style={styles.descriptionText}>Test Test aaaa {description}</Text>
                </Hyperlink>

                <Text style={styles.priceText}>${price}</Text>
            </View>

            <View>
                <Image style={styles.imageStyle} source={imagePath}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: GLOBAL_STYLES.colors.yellow300,
        borderWidth: 3,
        borderColor: GLOBAL_STYLES.colors.orange300,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    titleText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 20,
        color: GLOBAL_STYLES.colors.orange700,
    },
    descriptionText: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 11,
        color: GLOBAL_STYLES.colors.brown700,

    },
    linkStyle: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 11,
        color: GLOBAL_STYLES.colors.blue300,

    },
    priceText: {
        fontFamily: 'BaiJamjuree-SemiBold',
        fontSize: 17,
        color: GLOBAL_STYLES.colors.blue300,
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginLeft: 15,
    },
})

export default WishlistCard;