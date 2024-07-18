import { 
    View, 
    Text, 
    StyleSheet, 
    KeyboardAvoidingView, 
    ScrollView, 
    SafeAreaView 
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";

function LoginScreen(){
    const [signInUser, setSignInUser] = useState({
        ['username or email']: '',
        password: '',
    });

    function signInUserChangeHandler(text, type) {
        setSignInUser((prevState) => ({
            ...prevState, [type]: text
        }))
    }

    function confirmChangesHandler() {
        console.log(signInUser);
        setSignInUser({
            usernameOrEmail: '',
            password: '',
        })
    }

    return (
        <>
        <LinearGradient
            colors={[GLOBAL_STYLES.colors.orange300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <SafeAreaView style={{flex: 1}}>
                            <View style={[styles.page]}>
                                <View style={styles.container}>
                                    <Text style={styles.header}>Login</Text>
                                    <CustomTextInput
                                    typeTitle='username or email'
                                    onPress={signInUserChangeHandler}
                                    maxLength={64}
                                    value={signInUser['username or email']}
                                    keyboardType='default'
                                    helperText=""
                                    secureTextEntry={false}/>
                                    <View style={{width: '100%'}}>
                                        <CustomTextInput
                                        typeTitle='password'
                                        onPress={signInUserChangeHandler}
                                        maxLength={22}
                                        value={signInUser.password}
                                        keyboardType='default'
                                        helperText="Forgot Password?"
                                        secureTextEntry={true}/>
                                        <Link to={{screen: 'VerifyEmailScreen'}}>Forgot Password?</Link> 
                                    </View>
                                    <Button
                                    title="Login"
                                    onPress={confirmChangesHandler}
                                    buttonStyles={styles.buttonStyles}
                                    containerStyle={{alignSelf: 'center'}}/>
                                </View>
                            </View>
            </SafeAreaView>
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
        color: GLOBAL_STYLES.colors.brown300,
        fontWeight: '900',
        alignSelf: 'center'
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 32,
        paddingVertical: 8,
    }
})

export default LoginScreen;