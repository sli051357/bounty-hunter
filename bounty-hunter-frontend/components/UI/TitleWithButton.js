import { View, Text, StyleSheet } from "react-native";

import IconButton from "./IconButton";

function TitleWithButton({title, titleColor, icon, iconColor, onPress}){
    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
            <IconButton icon={icon} iconSize={24} color={iconColor} onPress={onPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 18
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    }
})

export default TitleWithButton;