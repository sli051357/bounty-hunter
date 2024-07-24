import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Button from "../../components/UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";
import { setAuthToken } from "../../store/authToken";


function ReturnLoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    function returnToLoginHandler(){
        navigation.navigate('LoginScreen');
    }

    return (
        <>
            <LinearGradient
            colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <View style={styles.page}>
                <Text style={styles.header}>Password Updated!</Text>
                <Button 
                title='Return to Login'
                onPress={returnToLoginHandler}
                buttonStyles={styles.buttonStyles}
                containerStyle={{alignSelf: 'center'}}/>
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80%',
        gap: 28
    },
    header: {
        textAlign: 'center',
        fontSize: 32,
        color: GLOBAL_STYLES.colors.blue300,
        fontWeight: '900',
        alignSelf: 'center',
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 32,
        paddingVertical: 8,
        backgroundColor: GLOBAL_STYLES.colors.blue300
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
})

export default ReturnLoginScreen;