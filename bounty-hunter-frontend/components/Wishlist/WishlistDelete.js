import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { GLOBAL_STYLES } from '../../constants/styles';
 

function WishlistDelete({ isVisible, onYes, onNo, onClose }) {
    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalStyle}>
                    <View style={styles.modalTop}>
                        <Text style={styles.modalText}>Delete this item?</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row',}}>
                            <Pressable onPress={(onYes)} style={[styles.modalButton, {borderRightWidth: 1, borderColor: GLOBAL_STYLES.colors.orange300,}]}>
                                <Text style={styles.modalText}>Yes</Text>
                            </Pressable>

                            <Pressable onPress={(onNo)} style={[styles.modalButton, {borderLeftWidth: 1, borderColor: GLOBAL_STYLES.colors.orange300,}]}>
                                <Text style={styles.modalText}>No</Text>
                            </Pressable>
                    </View>
                </View>
            </View>
            
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: GLOBAL_STYLES.colors.gray500,
        display: 'flex',
    },
    modalStyle: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flexDirection: 'column',
        width: '75%',
        height: '25%',
        borderRadius: 25,
        margin: 'auto',
    },
    modalTop: {
        height: '70%',
        borderBottomWidth: 2,
        borderColor: GLOBAL_STYLES.colors.orange300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        height: '75%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontFamily: 'BaiJamjuree-Regular',
        fontSize: 17,
        color: GLOBAL_STYLES.colors.brown700,
    }
})

export default WishlistDelete;