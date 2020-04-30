import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
});

export const HeaderText = ({ children }) => (
  <Text style={styles.headerText}>{children}</Text>
);
