import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  DatePickerAndroid,
  DatePickerIOS,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

export const NewSymptomScreen = ({ navigation, route }) => {
  return (
    <View>
      <DatePickerAndroid />
      <DatePickerIOS />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
