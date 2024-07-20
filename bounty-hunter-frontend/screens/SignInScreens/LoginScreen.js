import { 
    View, 
    Text, 
    StyleSheet, 
    Alert
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { setAuthToken } from "../../store/authToken";
import { setUsername } from "../../store/username";
import { GLOBAL_STYLES } from "../../constants/styles";
import CustomTextInput from "../../components/UI/AccountHelpers/CustomTextInput";
import Button from "../../components/UI/Button";
import LoadingOverlay from "../../components/UI/AccountHelpers/LoadingOverlay";

function LoginScreen(){
    const insets = useSafeAreaInsets()
    const [signInUser, setSignInUser] = useState({
        ['username or email']: '',
        password: '',
    });
    const [error, setError] = useState({
        emailOrUsername: false,
        password: false
    })
    const [isAuthenticateing, setIsAuthenticating] = useState(false);
    const dispatch = useDispatch();

    function signInUserChangeHandler(text, type) {
        setSignInUser((prevState) => ({
            ...prevState, [type]: text
        }))
    }

    // Turn this into async function when axios is added
    function confirmChangesHandler() {
        setIsAuthenticating(true);
        try {
            // Will Set Up Axios Later:
            // const token = await apiService.signIn(signInUser);
            // dispatch(setAuthToken(token))
            console.log(signInUser);
            dispatch(setUsername(signInUser['username or email']));
            dispatch(setAuthToken('IsVerified'));

        } catch (error) {
            setError({
                emailOrUsername: true,
                password: true
            })
            Alert.alert("Sign In Failed", "Try again later");
            // console.log(error);
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticateing) {
        return (
            <>
                <LinearGradient
                colors={[GLOBAL_STYLES.colors.orange300, GLOBAL_STYLES.colors.blue300]}
                style={styles.background}/>
                <LoadingOverlay message="Creating user..."/>
            </>
        )
    }

    return (
        <>
            <LinearGradient
            colors={[GLOBAL_STYLES.colors.orange300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <View style={{flex: 1, marginTop: insets.top+40}}>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Login</Text>
                        <CustomTextInput
                        typeTitle='username or email'
                        onPress={signInUserChangeHandler}
                        maxLength={64}
                        value={signInUser['username or email']}
                        keyboardType='default'
                        helperText=""
                        secureTextEntry={false}
                        isInValid={error.emailOrUsername}/>
                        <View style={{width: '100%'}}>
                            <CustomTextInput
                            typeTitle='password'
                            onPress={signInUserChangeHandler}
                            maxLength={22}
                            value={signInUser.password}
                            keyboardType='default'
                            helperText={error.password && "Incorrect Password, Username, or Email."}
                            secureTextEntry={true}
                            isInValid={error.password}/>
                            <Link to={{screen: 'VerifyEmailScreen'}} style={[styles.description, styles.link]}>Forgot Password?</Link> 
                        </View>
                        <Button
                        title="Login"
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
        justifyContent: 'center',
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
        // marginHorizontal: '10%',
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
    },
    description: {
        textAlign: 'right',
        fontSize: 14,
        color: GLOBAL_STYLES.colors.brown300,
    },
    link: {
        textDecorationLine: 'underline'
    }
})

export default LoginScreen;