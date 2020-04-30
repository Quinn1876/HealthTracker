import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

export const FloatingCircleButton = ({ onPress, children }) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: 'deepskyblue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    fontSize: 48,
    fontWeight: '500',
    color: 'white',
    lineHeight: 60,
    paddingLeft: 3,
  },
  view: {
    flex: 1,
  },
});
