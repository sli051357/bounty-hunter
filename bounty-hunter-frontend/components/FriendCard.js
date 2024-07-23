import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

{/* 
  * Implementation Notes:
    - "friend" is an object for a user's friend that includes their nickname, ID, and profile picture
    - imagePath currently proves that you can pass different image paths with the same map, although this might not be necessary if "friend" contains the image file/link itself instead of a hard-coded asset
  */}

function FriendCard({ friend, imagePath }) {
    const [ favorite, setFavorite ] = useState(false);

    function editFavoriteStatus() {
        setFavorite((curr) => !curr);
    }

    function createFavor() {
        console.log("Favor created");
    }

    return (
        <View style={styles.card}>
            {/* Profile Picture */}
            <Image style={styles.picture} source={imagePath}/>

            {/* Friend Text */}
            <View>
                <Text style={styles.usernameText}>{friend}</Text>
                <Text style={styles.userID}>Username</Text>
            </View>


            <View style={{marginLeft: 10, marginTop: -10}}>
                <Pressable onPress={(editFavoriteStatus)}>
                    {favorite ? (
                        <AntDesign name="star" size={24} color={GLOBAL_STYLES.colors.orange700} />
                    ) : (
                        <AntDesign name="staro" size={24} color={GLOBAL_STYLES.colors.orange300} />
                    )}
                </Pressable>
            </View>

            <View style={styles.favorButton}>
                <Pressable onPress={(createFavor)}>
                    <FontAwesome6 name="money-bill-transfer" size={24} color={GLOBAL_STYLES.colors.brown700} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    picture: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 10,
    },
    horizontalContainer: {
        flexDirection: 'row',
    },
    usernameText: {
        fontFamily: 'BaiJamjuree-SemiBold',
        fontSize: 20,
        color: GLOBAL_STYLES.colors.blue300,
    },
    userID: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 12,
        color: GLOBAL_STYLES.colors.brown700,
        marginTop: -10,
    },
    favorButton: {
        marginLeft: 'auto',
        backgroundColor: GLOBAL_STYLES.colors.orange300,
        padding: 10,
        borderRadius: 5,
    }
})

export default FriendCard;