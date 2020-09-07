import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SymptomListItem = ({ notes, dateTime, medication }) => (
  <View style={styles.container}>
    <View>
      {!!medication && (
        <View>
          <Text>Medication:</Text>
          <Text>{medication}</Text>
        </View>
      )}
      {!!notes && (
        <View>
          <Text>Notes:</Text>
          <Text style={styles.note}>{notes.toString()}</Text>
        </View>
      )}
    </View>
    <View>
      <Text>
        <Text>Time: </Text>
        <Text>{`${
          dateTime.getHours() > 12
            ? dateTime.getHours() - 12
            : dateTime.getHours()
        }:${dateTime.getMinutes()}`}</Text>
      </Text>
      <Text>
        <Text>Date: </Text>
        <Text>
          {`${day[dateTime.getDay()]} ${
            month[dateTime.getMonth()]
          } ${dateTime.getDate()}`}
        </Text>
      </Text>
    </View>
  </View>
);

const day = ['Sun', 'Mon', 'Tues', 'Wed', 'Thr', 'Fri', 'Sat'];
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const styles = StyleSheet.create({
  container: {
    borderColor: 'royalblue',
    borderRadius: 9,
    borderWidth: 1,
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 8,
    paddingRight: 96,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  note: {
    flex: 1,
    maxWidth: 160,
  },
  date: {
    flex: 1,
  },
});
