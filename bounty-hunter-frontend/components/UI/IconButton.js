import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'

function IconButton({icon, color, onPress, iconSize}) {
    return (
        <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
            <Ionicons name={icon} size={iconSize} color={color}/>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.6
    }
})