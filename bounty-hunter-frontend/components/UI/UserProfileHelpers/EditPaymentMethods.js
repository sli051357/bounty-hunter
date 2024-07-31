import { View, Text, StyleSheet, Pressable} from "react-native";
import * as Clipboard from 'expo-clipboard';

import TitleWithButton from "../TitleWithButton";
import { GLOBAL_STYLES } from "../../../constants/styles";
import PaymentMethod from "./PaymentMethod";

function EditPaymentMethods({isEditing, userData, managePaymentsPage}) {

    async function copyPayment(payment) {
        await Clipboard.setStringAsync(payment)
    }
    // console.log(userData)
    let payments = 
    <View style={styles.container}>
        <Text style={styles.title}>Payment Methods:</Text>
        {userData.map((payment) => <PaymentMethod paymentName={payment.paymentName} paymentUsername={payment.username}
        key={payment.paymentName} icon='attach-outline' onPress={() => copyPayment(payment.username)}/>)}
    </View>; 

    if (isEditing) {
        payments = 
        <View style={styles.container}>
            <Text style={styles.title}>Payment Methods:</Text>
            {userData.map((payment) => <PaymentMethod paymentName={payment.paymentName} paymentUsername={payment.username}
            key={payment.paymentName} icon='attach-outline' onPress={() => copyPayment(payment.username)}/>)}
            <Pressable onPress={managePaymentsPage}>
                <Text style={styles.managePayments}>Manage linked accounts</Text>
            </Pressable>
        </View>
    }

    return payments
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        gap: 4,
        // minHeight: 155, 
        flex: 1
    },
    text: {
        color: GLOBAL_STYLES.colors.brown700,
        fontSize: 18
    },
    title: {
        color: GLOBAL_STYLES.colors.orange700,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 18
    },
    editBox: {
        fontSize: 18,
        borderRadius: 8,
        borderColor: GLOBAL_STYLES.colors.brown700,
        color: GLOBAL_STYLES.colors.brown700,
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderWidth: 2,
        maxWidth: '100%',
        overflow: 'hidden',
        flex: 1 
    },
    managePayments: {
        color: GLOBAL_STYLES.colors.blue300,
        textDecorationLine: 'underline',
        textAlign: 'left'
    }
})

export default EditPaymentMethods;