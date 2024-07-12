import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'

//import IconButton from "./UI/IconButton";
import { GLOBAL_STYLES } from "../constants/styles";

function FavorCard({favor}){
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.iconsContainer}>
                    <Image style={styles.icon} 
                    source={require('../assets/batman.jpeg')}
                    />
                    <Ionicons name='arrow-forward' 
                    size={18} 
                    color={GLOBAL_STYLES.colors.blue300}
                    style={styles.icon}/>
                    <Image style={styles.icon} 
                    source={require('../assets/profile.jpeg')}
                    />
                </View>
                <Text style={styles.mainTextLeft}>{favor.receiver}</Text>
                <Text style={styles.text}>{favor.description}</Text>
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.text}>Created: {favor.dateCreated}</Text>
                <Text style={styles.mainTextRight}>{favor.paymentOwed}</Text>
                <Ionicons name='checkbox' 
                    size={18} 
                    color={GLOBAL_STYLES.colors.blue300}
                    style={styles.icon}/>
            </View>
        </View>
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
        overflow: 'hidden'
    },
    iconsContainer: {
        flexDirection: 'row',
        gap: 6
    },
    icon: {
        width: 18,
        height: 18,
        borderRadius: 9
    },
    mainTextLeft: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'left'
    },
    mainTextRight: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'right'
    },
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 12
    }
})

export default FavorCard;