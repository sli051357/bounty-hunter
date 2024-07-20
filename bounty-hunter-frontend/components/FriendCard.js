import { View, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { AntDesign } from '@expo/vector-icons';

function FriendCard({ friend, imagePath }) {
    const [ favorite, setFavorite ] = useState(false);

    function editFavoritestatus() {
        setFavorite((curr) => !curr);
    }

    return (
        <View style={styles.card}>
            <Image style={styles.picture} source={imagePath}/>

            <View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.usernameText}> Hello </Text>

                    <Pressable onPress={(editFavoriteStatus)}>
                        {favorite ? (
                            <AntDesign name="staro" size={24} color={GLOBAL_STYLES.colors.orange300} />
                        ) : (
                            <AntDesign name="star" size={24} color={GLOBAL_STYLES.colors.orange700} />
                        )}
                    </Pressable>
                </View>

                <Text style={styles.userID}> Hello </Text>
            </View>

            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray',
        alignItems: 'center',
        margin: 5,
    },
    picture: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    horizontalContainer: {
        flexDirection: 'row',
    },
    usernameText: {
        fontFamiy: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        marginRight: 10,
        marginTop: 2,
    },
    userID: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 18,
        color: GLOBAL_STYLES.colors.brown700,
    },
})

export default FriendCard;