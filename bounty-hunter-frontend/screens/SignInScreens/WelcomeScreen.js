import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Link } from "@react-navigation/native";

import { GLOBAL_STYLES } from "../../constants/styles";
import Button from "../../components/UI/Button";

function WelcomeScreen(){
    const navigation = useNavigation();

    function signUpDirector() {
        navigation.navigate('SignUpScreen');
    }

    return (
        <View style={styles.page}>
            <LinearGradient 
            colors={[GLOBAL_STYLES.colors.brown300, GLOBAL_STYLES.colors.blue300]}
            style={styles.background}/>
            <View style={styles.container}>
                <Text style={styles.header}>BOUNTY HUNTER</Text>
                <Text style={styles.description}>
                    Keep track of favors owed between you and your friends with bounties!
                    Collect or distribute them today.
                </Text>
                <Button title='Sign Up' 
                onPress={signUpDirector}
                buttonStyles={styles.buttonStyles}/>
                <View style={styles.loginContainer}>
                    <Text style={styles.description}>Already have an account?</Text>
                    <Link to={{screen: "LoginScreen"}} style={[styles.description, styles.link]}>Log In</Link>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 12,
        marginHorizontal: '10%'
    },
    header: {
        textAlign: 'center',
        fontSize: 32,
        color: GLOBAL_STYLES.colors.brown700,
        fontWeight: '900'
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        color: GLOBAL_STYLES.colors.brown700,
        marginBottom: 22
    },
    loginContainer: {
        flexDirection: 'row',
        gap: 2
    },
    buttonStyles: {
        borderRadius: 6,
        paddingHorizontal: 32,
        paddingVertical: 8,
        backgroundColor: GLOBAL_STYLES.colors.blue300
    },
    link: {
        textDecorationLine: 'underline'
    }
})

export default WelcomeScreen;