import { View, Text, StyleSheet} from "react-native";

import TitleWithButton from "../TitleWithButton";
import { GLOBAL_STYLES } from "../../../constants/styles";
import PaymentMethod from "./PaymentMethod";

function EditPaymentMethods({onPress, isEditing, userData}) {
    console.log

    let payments = 
    <>
        <TitleWithButton
        title='Payment Methods'
        titleColor={GLOBAL_STYLES.colors.orange700}
        icon='create-sharp'
        iconColor={GLOBAL_STYLES.colors.orange700}
        onPress={onPress[0]}/>
        {userData.map((payment) => <PaymentMethod payment={payment} key={payment} icon='card-sharp' onPress={() => {}}/>)}
    </>; 

    if (isEditing) {
        payments = 
        <>
            <View>
                <TitleWithButton
                    title='Payment Methods'
                    titleColor={GLOBAL_STYLES.colors.orange700}
                    icon='checkmark-circle-sharp'
                    iconColor={GLOBAL_STYLES.colors.orange700}
                    onPress={onPress[0]}/>
            </View>        
            {userData.map((payment) => 
            <PaymentMethod 
                payment={payment} 
                key={payment} 
                icon='trash' 
                onPress={() => onPress[1](payment)}/>)}
        </>
    }

    return (
            <View>
                {payments}
            </View>
    )
}

export default EditPaymentMethods;