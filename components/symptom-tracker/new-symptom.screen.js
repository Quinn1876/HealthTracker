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

  // DateTimeControl Actions
  const SHOW_DATE = 'show_date';
  const SHOW_TIME = 'show_time';
  const HIDE_DT = 'hide_dt';
  const SET_DATE = 'set_date';
  // DateTime Initial State
  const dateTimeInitialState = {
    mode: 'date',
    date: new Date(),
    show: false,
  };
  // DateTime Reducer
  const dateTimeReducer = (state, action) => {
    switch (action.type) {
      case SHOW_DATE:
        return {
          ...state,
          mode: 'date',
          show: true,
        };

      case SHOW_TIME:
        return {
          ...state,
          mode: 'time',
          show: true,
        };
      case HIDE_DT:
        return {
          ...state,
          show: false,
        };
      case SET_DATE:
        return {
          ...state,
          show: Platform.OS === 'ios',
          date: action.newDate || state.date,
        };
      default:
        break;
    }
  };
  // DateTimeControl
  const [dateTimeControl, dispatchDateTimeControl] = React.useReducer(
    dateTimeReducer,
    dateTimeInitialState,
  );

  // JSX VIEW
  return (
    <View>
      <Text>Notes:</Text>
      <TextInput multiline autoFocus />
      <Button
        onPress={() => dispatchDateTimeControl({ type: SHOW_DATE })}
        title="Set Date"
        style={styles.dateButton}
      />
      <Button
        onPress={() => dispatchDateTimeControl({ type: SHOW_TIME })}
        title="Set Time"
      />
      {dateTimeControl.show && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0} // IOS Only
          value={dateTimeControl.date}
          mode={dateTimeControl.mode}
          is24Hour={true} // Android Only
          display="default" // Android Only
          onChange={(event, selectedDate) =>
            dispatchDateTimeControl({ type: SET_DATE, newDate: selectedDate })
          }
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
