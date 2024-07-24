import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { GLOBAL_STYLES } from '../../constants/styles';

const FloatingButton = ({ onPress, icon, color }) => {
  return (
    <Pressable style={[styles.floatingButton, {borderColor: color}]} onPress={onPress}>
      <Ionicons name={icon} size={28} color={color} fontWeight='bold'/>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GLOBAL_STYLES.colors.brown300,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 3
  },
});

export default FloatingButton;
