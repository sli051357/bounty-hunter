import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'

//import IconButton from "./UI/IconButton";
import { GLOBAL_STYLES } from "../constants/styles";

/* 
Implementation Notes: 
    - The Pressable Component needs to receieve an 'onPress' prop that will
    take the user to more Edit Favor page.
    - The 'favor' prop is to take info of the favor. DUMMY_FAVORS_OF_PROFILE 
    outlines the object keys and values that are in the favor. 
    - Tags will be added once Tag system has been set up, following the mockup
    designs. 
    - The 'check-mark' icon is suppose to reflect the status of the icon. It will
    be changed in the edit favor. 
*/

function FavorCard({favor, onPress}){
    // console.log(favor.description);
    return (
        <Pressable onPress={() => onPress(favor.bountyId)}>
            <View style={styles.container}>
                <View style={[styles.innerContainer, {alignItems: 'flex-start'}]}>
                    <View style={styles.iconsContainer}>
                        <Image style={styles.icon}
                        source={require('../assets/batman.jpeg')}
                        />
                        <Ionicons name='arrow-forward'
                        size={22}
                        color={GLOBAL_STYLES.colors.blue300}
                        style={styles.icon}/>
                        <Image style={styles.icon}
                        source={require('../assets/profile.jpeg')}
                        />
                    </View>
                    <Text style={styles.mainTextLeft}>{favor.name}</Text>
                    <Text style={styles.text}>{favor.description}</Text>
                </View>
                <View style={[styles.innerContainer, {alignItems: 'flex-end'}]}>
                    <Text style={styles.text}>Created: {favor.dateCreated}</Text>
                    <Text style={styles.mainTextRight}>{favor.paymentOwed}</Text>
                    <Ionicons name='checkbox'
                        size={22}
                        color={GLOBAL_STYLES.colors.blue300}
                        style={styles.icon}/>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        width: '100%',
        borderColor: GLOBAL_STYLES.colors.orange700,
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'space-between',
        padding: 12,
        marginVertical: 8
    },
    innerContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    iconsContainer: {
        flexDirection: 'row',
        gap: 6
    },
    icon: {
        width: 22,
        height: 22,
        borderRadius: 11
    },
    mainTextLeft: {
        fontSize: 22,
        fontFamily: 'BaiJamjuree-Bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'left'
    },
    mainTextRight: {
        fontSize: 22,
        fontFamily: 'BaiJamjuree-Bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'right'
    },
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 12,
        fontFamily: 'BaiJamjuree-Regular',
    }
})

export default FavorCard;