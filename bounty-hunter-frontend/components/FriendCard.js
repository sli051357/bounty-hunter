import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { AntDesign } from '@expo/vector-icons';

function FriendCard({imagePath}) {
    return (
        <Image style={styles.picture} source={imagePath}/>
    )
}

const styles = StyleSheet.create({
    picture: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
})

export default FriendCard;