import { View, TextInput, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../constants/styles";


function CustomTextInput({typeTitle, onPress, maxLength, value, keyboardType, helperText, secureTextEntry}){
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{typeTitle.toUpperCase()}</Text>
            <TextInput 
            onChangeText={(text) => onPress(text, typeTitle)}
            numberOfLines={1}
            maxLength={maxLength}
            value={value}
            keyboardType={keyboardType}
            style={styles.textInput}
            secureTextEntry={secureTextEntry}/>
            <Text style={styles.helperText}>{helperText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        gap: 4
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: GLOBAL_STYLES.colors.brown300
    },
    textInput: {
        fontSize: 16,
        borderRadius: 12,
        borderColor: GLOBAL_STYLES.colors.brown300,
        color: GLOBAL_STYLES.colors.brown300,
        padding: 4,
        borderWidth: 2,
        width: '100%',
        overflow: 'hidden'
    },
    helperText: {
        fontSize: 12,
        textAlign: 'left',
        color: GLOBAL_STYLES.colors.brown300
    }
})

export default CustomTextInput;