import { View, TextInput, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { GLOBAL_STYLES } from "../../../constants/styles";


function InputFields({type, typeTitle, 
    onPress, maxLength, 
    value, keyboardType, 
    children, multiLineStyles, multiline = false})
    {
    return (
        <View style={[styles.container, multiLineStyles]}>
            <Text style={[styles.label]}>{typeTitle}</Text>
            {children}
            <TextInput 
            onChangeText={(text) => onPress(text, type)}
            numberOfLines={1}
            maxLength={maxLength}
            value={value}
            keyboardType={keyboardType}
            style={[styles.textInput]}
            multiline={multiline}
            textAlignVertical="top"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        gap: 4,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: GLOBAL_STYLES.colors.orange700
    },
    textInput: {
        fontSize: 18,
        borderRadius: 8,
        borderColor: GLOBAL_STYLES.colors.orange700,
        color: GLOBAL_STYLES.colors.brown700,
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderWidth: 2,
        maxWidth: '100%',
        overflow: 'hidden',
        flex: 1
    },
    inputIsInValid: {
        borderColor: GLOBAL_STYLES.colors.error300
    }
})

export default InputFields;