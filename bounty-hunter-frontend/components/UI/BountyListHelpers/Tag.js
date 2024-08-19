import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tag = ({ emoji, text, color }) => {
  return (
    <View style={[styles.tagContainer, { backgroundColor: color }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    marginRight: 10,
  },
  emoji: {
    fontSize: 18,
    marginRight: 5,
    fontFamily: "BaiJamjuree-Regular",
  },
  tagText: {
    fontSize: 16,
    fontFamily: "BaiJamjuree-Regular",
  },
});

export default Tag;