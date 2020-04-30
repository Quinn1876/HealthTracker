import React from 'react';

import { Text, View, Button, StyleSheet } from 'react-native';

export const Home = ({ navigation }) => (
  <View style={styles.root}>
    <Text style={styles.text}>Home Page</Text>
    <Button
      title="Go to Quinn's Profile Page"
      onPress={() => navigation.navigate('Profile', { name: 'Quinn' })}
    />
    <Button
      title="Go to the Symptom Tracker"
      onPress={() => navigation.navigate('SymptomTracker')}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    height: 500,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
