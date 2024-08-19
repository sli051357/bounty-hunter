import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { GLOBAL_STYLES } from "../../../constants/styles";

const EditTagPopup = ({ tag, visible, onClose, onSave }) => {
  const [emojiInput, setEmojiInput] = useState(tag.emoji);
  const [tagInput, setTagInput] = useState(tag.text);
  const [selectedColor, setSelectedColor] = useState(tag.color);

  const saveTag = () => {
    onSave({ ...tag, emoji: emojiInput, text: tagInput, color: selectedColor });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>Edit Custom Tag</Text>
          <TextInput
            style={styles.input}
            placeholder="Tag name"
            value={tagInput}
            onChangeText={setTagInput}
          />
          <TextInput
            style={[styles.input, styles.emojiInput]}
            placeholder="Emoji"
            value={emojiInput}
            onChangeText={setEmojiInput}
          />
          <View style={styles.colorPickerContainer}>
            {/* Color Picker logic similar to TaggingComponent */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={saveTag}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: GLOBAL_STYLES.colors.brown300,
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontFamily: "BaiJamjuree-Bold",
    color: GLOBAL_STYLES.colors.brown700,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    fontFamily: "BaiJamjuree-Regular",
    borderColor: GLOBAL_STYLES.colors.brown500,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: '#000',
    marginBottom: 15,
  },
  emojiInput: {
    width: 40,
    textAlign: 'center',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: GLOBAL_STYLES.colors.blue300,
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: GLOBAL_STYLES.colors.brown700,
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "BaiJamjuree-Bold",
    color: GLOBAL_STYLES.colors.brown300,
    fontWeight: 'bold',
  },
});

export default EditTagPopup;
