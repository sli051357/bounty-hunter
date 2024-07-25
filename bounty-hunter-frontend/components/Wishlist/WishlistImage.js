import { View, StyleSheet, Image } from 'react-native';
import { GLOBAL_STYLES } from '../../constants/styles';

import { Feather } from '@expo/vector-icons';

export default function ImageViewer({ selectedImage }) {
    const imageSource = { uri: selectedImage };
    let content;

    if (selectedImage) {
        content = 
        <Image source={imageSource} style={styles.image} />
        
    } else {
        content = 
        <View style={[styles.image, {borderWidth: 1.5, borderColor: GLOBAL_STYLES.colors.brown700, justifyContent: 'center', alignItems: 'center',}]}>
            <Feather name="camera" size={24} color={GLOBAL_STYLES.colors.brown700} />
        </View>
    }

    return (
        <View>{content}</View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    }
})