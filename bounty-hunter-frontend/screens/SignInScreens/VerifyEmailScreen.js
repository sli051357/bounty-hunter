import { 
    View, 
    Text, 
    StyleSheet, 
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";


function VerifyEmailScreen(){
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [codeVerify, setCodeVerify] = useState('');

    function codeVerifyHandler(text){
        setCodeVerify(text)
    }

    function confirmChangesHandler() {
        console.log(codeVerify);
        setCodeVerify('');
        navigation.navigate('UpdatePasswordScreen');
    }

    return (
        <>
        <LinearGradient
            colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <View style={{flex: 1, marginTop: insets.top+40}}>
                <View style={[styles.page]}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Verify Email</Text>
                        <Text style={styles.description}>
                            A verification code has been sent
                            to the email registered with this account.
                            Enter the verification code below.
                        </Text>
                        <CustomTextInput
                        typeTitle='Verification Code'
                        onPress={codeVerifyHandler}
                        maxLength={6}
                        value={codeVerify}
                        keyboardType='default'
                        helperText="Incorrect verfication code."
                        secureTextEntry={false}/>
                        <Button
                        title="Verify"
                        onPress={confirmChangesHandler}
                        buttonStyles={styles.buttonStyles}
                        containerStyle={{alignSelf: 'center'}}/>
                    </View>
                </View>
            </View>
        </>
            
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '100%'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 22,
        padding: 12,
        marginHorizontal: '5%',
        width: '90%'
    },
    header: {
        textAlign: 'center',
        fontSize: 32,
        color: GLOBAL_STYLES.colors.blue300,
        fontWeight: '900',
        alignSelf: 'center'
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 32,
        paddingVertical: 8,
        backgroundColor: GLOBAL_STYLES.colors.blue300
    },
    description: {
        textAlign: 'center',
        fontSize: 22,
        color: GLOBAL_STYLES.colors.brown700,
    },
})

export default VerifyEmailScreen;