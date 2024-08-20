import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { GLOBAL_STYLES } from "../../../constants/styles";
import EditTagPopup from './EditTagPopup';
import Tag from './Tag';

const TaggingComponent = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [emojiInput, setEmojiInput] = useState('🍀'); // default emoji
  const [selectedColor, setSelectedColor] = useState(GLOBAL_STYLES.colors.brown500); // default color
  const [editTagVisible, setEditTagVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);

  const addTag = () => {
    if (tagInput.trim() && emojiInput.trim()) {
      setTags([...tags, { text: tagInput.trim(), emoji: emojiInput.trim(), color: selectedColor }]);
      setTagInput('');
      setEmojiInput('🍀'); // reset to default
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const editTag = (index) => {
    setCurrentTag(tags[index]);
    setEditTagVisible(true);
  };

  const saveEditedTag = (updatedTag) => {
    setTags(tags.map(tag => (tag === currentTag ? updatedTag : tag)));
    setEditTagVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tags</Text>

        {/* preset tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preset</Text>
          <View style={styles.line} />
          <View style={styles.presetTagsContainer}>
            <TouchableOpacity style={[styles.presetTag, { backgroundColor: '#F2B093' }]}>
              <Text style={styles.presetTagText}>🛍️ Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.presetTag, { backgroundColor: '#F2B093' }]}>
              <Text style={styles.presetTagText}>🍽️ Dining</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* custom tags */}
        <View style={styles.section}>
          <View style={styles.customTagsHeader}>
            <Text style={styles.sectionTitle}>Custom</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditTagVisible(true)}>
              <MaterialIcons name="edit" size={20} color={GLOBAL_STYLES.colors.blue300} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.line}/>
          <FlatList
            data={tags}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={[styles.tag, { backgroundColor: item.color }]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.tagText}>{item.text}</Text>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
            style={styles.tagList}
          />
        </View>

        {/* custom tags creation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create Custom Tag</Text>
          <View style={styles.line} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Click to name"
              value={tagInput}
              onChangeText={setTagInput}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.emojiInput]}
              placeholder="Icon"
              value={emojiInput}
              onChangeText={setEmojiInput}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.colorPickerContainer}>
            {/* color options */}
            <View style={styles.colorPickerContainer}> 
            {/* color presets */}
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#F3674D' },
                selectedColor === '#F3674D' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#F3674D')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#F78C44' },
                selectedColor === '#F78C44' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#F78C44')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#FFDE80' },
                selectedColor === '#FFDE80' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#FFDE80')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#FDF389' },
                selectedColor === '#FDF389' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#FDF389')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#95CF93' },
                selectedColor === '#95CF93' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#95CF93')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#52C8ED' },
                selectedColor === '#52C8ED' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#52C8ED')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#5381C1' },
                selectedColor === '#5381C1' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#5381C1')}
            />
            <TouchableOpacity
              style={[
                styles.colorOption,
                { backgroundColor: '#8E71B2' },
                selectedColor === '#8E71B2' && styles.selectedColorOption
              ]}
              onPress={() => setSelectedColor('#8E71B2')}
            />
            <TouchableOpacity style={styles.addColorOption}>
              {/* placeholder for adding new colors */}
              <Text style={styles.addColorText}>+</Text>
            </TouchableOpacity>
            </View>
          <TouchableOpacity style={styles.createButton} onPress={addTag}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
          </View>
          {/* edit tag popup */}
          {editTagVisible && (
            <EditTagPopup
              tag={currentTag}
              visible={editTagVisible}
              onClose={() => setEditTagVisible(false)}
              onSave={saveEditedTag}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GLOBAL_STYLES.colors.brown300,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontFamily: "BaiJamjuree-Bold",
    color: GLOBAL_STYLES.colors.blue300,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "BaiJamjuree-Medium",
    color: GLOBAL_STYLES.colors.brown700,
    marginBottom: 10,
  },
  line:{
    borderWidth: 0.5,
    borderColor:GLOBAL_STYLES.colors.brown700,
    marginBottom: 10,
  },
  presetTagsContainer: {
    flexDirection: 'row',
  },
  presetTag: {
    borderRadius: 10,
    padding: 7,
    marginRight: 10,
  },
  presetTagText: {
    fontFamily: "BaiJamjuree-Regular",
    color: GLOBAL_STYLES.colors.brown700,
    fontSize: 13,
  },
  customTagsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontFamily: "BaiJamjuree-Medium",
    color: GLOBAL_STYLES.colors.blue300,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    fontFamily: "BaiJamjuree-Regular",
    flex: 1,
    borderColor: GLOBAL_STYLES.colors.brown500,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: '#000',
    marginHorizontal: 5,
    minWidth: 100,
  },
  emojiInput: {
    fontFamily: "BaiJamjuree-Regular",
    width: 40, 
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GLOBAL_STYLES.colors.brown500,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
  },
  tagList: {
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 10,
    marginRight: 10,
    // height: 36,
  },
  emoji: {
    marginRight: 2,
    fontSize: 13,
  },
  tagText: {
    fontFamily: "BaiJamjuree-Regular",
    color: GLOBAL_STYLES.colors.brown700,
    fontSize: 13,
  },
  removeButtonText: {
    fontFamily: "BaiJamjuree-Regular",
    color: GLOBAL_STYLES.colors.brown700,
    paddingLeft: 5,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  selectedColorOption: {
    borderColor: GLOBAL_STYLES.colors.brown500,
    borderWidth: 2,
  },
  addColorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GLOBAL_STYLES.colors.brown500,
    borderWidth: 1,
    backgroundColor: GLOBAL_STYLES.colors.brown300,
  },
  addColorText: {
    color: GLOBAL_STYLES.colors.brown500,
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: GLOBAL_STYLES.colors.blue300,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: "BaiJamjuree-Bold",
    color: GLOBAL_STYLES.colors.brown300,
    fontWeight: 'bold',
  },
});

export default TaggingComponent;
