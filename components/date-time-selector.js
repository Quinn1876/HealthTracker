import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

import { HeaderText } from './header-text';

import CalendarImage from '../assets/imgs/calendar_img.png';
import ClockImage from '../assets/imgs/clock.png';

// DateTimeSelector
// A User Interface for activating the date and time popups
export const DateTimeSelector = ({ date, onTimePress, onDatePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onTimePress}>
        <View style={styles.buttonContainer}>
          <HeaderText>
            {date
              ? `Time: ${date?.getHours()}:${
                  date?.getMinutes() < 10
                    ? '0' + date?.getMinutes()
                    : date.getMinutes()
                }`
              : 'Select Time'}
          </HeaderText>
          <Image source={ClockImage} style={styles.sprite} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDatePress}>
        <View style={styles.buttonContainer}>
          <HeaderText>
            {date
              ? `Date: ${
                  dateMap[date?.getMonth()]
                } ${date?.getDate()}, ${date.getFullYear()}`
              : 'Select Date'}
          </HeaderText>
          <Image source={CalendarImage} style={styles.sprite} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default DateTimeSelector;
// Styles for DateTimeSelector
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    borderColor: 'royalblue',
    borderWidth: 5,
    borderRadius: 15,
    paddingVertical: 8,
    margin: 8,
    backgroundColor: 'white',
  },
  sprite: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 24,
  },
});

const dateMap = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
