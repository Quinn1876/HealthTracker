import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  YellowBox,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { SymptomActions } from './symptom-tracker.screen';

/**
 * The app does not persist naviagtion state. This means that we can safely ignor
 * this error because we are not serializing the dispatch callback that is being
 * passed in from the symptom tracker screen component.
 */
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

/**
 * NewSymptomScreen
 *  - A screen for the user to add another symptom/Event to the list
 */
export const NewSymptomScreen = ({ navigation, route }) => {
  // Prop Destructuring
  const { dispatchSymptom } = route.params;

  // Prop Validation
  React.useEffect(() => {
    if (dispatchSymptom === null) {
      console.error('DispatchSymptom is NULL');
    }
  }, [dispatchSymptom]);

  // State Declarations
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  // Event Handlers
  const handleSetDatePress = () => {
    setMode('date');
    setShow(true);
  };
  const handleSetTimePress = () => {
    setMode('time');
    setShow(true);
  };
  const handleDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // JSX VIEW
  return (
    <View>
      <Text>Notes:</Text>
      <TextInput multiline autoFocus />
      <Button
        onPress={handleSetDatePress}
        title="Set Date"
        style={styles.dateButton}
      />
      <Button onPress={handleSetTimePress} title="Set Time" />
      {show && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0} // IOS Only
          value={date}
          mode={mode}
          is24Hour={true} // Android Only
          display="default" // Android Only
          onChange={handleDateTimeChange}
        />
      )}
    </View>
  );
};

// StyleSheet for NewSymptomScreen
const styles = StyleSheet.create({
  container: {},
  dateButton: {
    marginBottom: 100,
  },
});
