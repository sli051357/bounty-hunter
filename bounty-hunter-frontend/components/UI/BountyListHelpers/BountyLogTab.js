import { View, Text, StyleSheet } from "react-native";

import { GLOBAL_STYLES } from "../../../constants/styles";
import IconButton from "../IconButton";


function BountyLogTab({tabDescription, type, onPress}) {

    if (type === "Complete Request") {
        return (
            <View style={styles.bountyTabContainer}>
                <Text style={styles.description}>{tabDescription}</Text>
                <View style={styles.buttonContainer}>
                    <IconButton 
                        icon="checkmark-circle" 
                        onPress={() => onPress("accept")}
                        color={GLOBAL_STYLES.colors.brown300}
                        iconSize={28}
                    />
                    <IconButton 
                        icon="close-circle" 
                        onPress={() => onPress("deny")}
                        color={GLOBAL_STYLES.colors.error700}
                        iconSize={28}
                    />
                </View>
            </View>
        )

    } else if (type === "Delete Request") {
        return (
            <View style={styles.bountyTabContainer}>
                <Text style={styles.description}>{tabDescription}</Text>
                <View style={styles.buttonContainer}>
                    <IconButton 
                        icon="checkmark-circle" 
                        onPress={() => onPress("accept")}
                        color={GLOBAL_STYLES.colors.brown300}
                        iconSize={28}
                    />
                    <IconButton 
                        icon="close-circle" 
                        onPress={() => onPress("deny")}
                        color={GLOBAL_STYLES.colors.error700}
                        iconSize={28}
                    />
                </View>
            </View>
        )

    } else {
        return (
            <View>
                <Text>{tabDescription}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    bountyTabContainer: {
        flex: 1,
        backgroundColor: GLOBAL_STYLES.colors.brown500,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "100%",
        padding: 20,
        borderRadius: 20
    },
    description: {
        fontSize: 14,
        fontFamily: "BaiJamjuree-Bold",
        textAlign: "left"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
    }
})


export default BountyLogTab;