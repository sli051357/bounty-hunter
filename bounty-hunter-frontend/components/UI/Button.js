import { StyleSheet, Pressable, View, Text } from "react-native";
import { GLOBAL_STYLES } from "../../constants/styles";

function Button({title, onPress, buttonStyles, containerStyle}){
    return (
        <View style={containerStyle}>
            <Pressable onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, buttonStyles]}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'black'
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        borderRadius: 4
    },
    button: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        width: '100%'
    }
})

export default Button;