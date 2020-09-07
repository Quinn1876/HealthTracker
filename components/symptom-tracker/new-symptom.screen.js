import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  YellowBox,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ASgetMedicationList,
  ASsetMedicationList,
} from '../../utilities/async-store';

import { DateTimeSelector, HeaderText, DropDownInputSelector } from '../';

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

  // DropDown States
  const [medicationDropdownList, setMedicationDropDownList] = React.useState(
    [],
  );

  // Load from AS on mount
  React.useEffect(() => {
    ASgetMedicationList().then((list) =>
      setMedicationDropDownList((old) => list || old),
    );
  }, []);

  const [selectedMedication, setSelectedMedication] = React.useState(null);

  // Notes States
  const [notes, updateNotes] = React.useState('');

  // handleSubmit
  // - Sends the new note back to the list
  // - stores the list of medications
  // - returns to the prevous screen
  const handleSubmitPress = () => {
    dispatchSymptom({
      type: SymptomActions.ADD_SYMPTOM,
      symptom: {
        notes,
        dateTime: dateTimeControl.date,
        medication: selectedMedication,
      },
    });
    ASsetMedicationList(medicationDropdownList);
    navigation.goBack();
  };

  // JSX VIEW
  return (
    <View>
      <HeaderText>Notes:</HeaderText>
      <TextInput
        multiline
        style={styles.notesInput}
        value={notes}
        onChangeText={(text) => updateNotes(text)}
      />
      <DateTimeSelector
        date={dateTimeControl.date}
        onDatePress={() => dispatchDateTimeControl({ type: SHOW_DATE })}
        onTimePress={() => dispatchDateTimeControl({ type: SHOW_TIME })}
      />
      <DropDownInputSelector
        selectedItem={selectedMedication}
        listItems={medicationDropdownList}
        itemSelectedCallback={(item) => setSelectedMedication(item.text)}
        newItemCallback={(item) => {
          if (
            medicationDropdownList.filter((value) => value.text === item)
              .length === 0
          ) {
            setMedicationDropDownList(
              medicationDropdownList.concat([{ text: item }]),
            );
          }
        }}
      />
      {/* Submit button -- Adds a New Item to patient history */}
      <TouchableOpacity onPress={handleSubmitPress}>
        <View style={styles.buttonContainer}>
          <HeaderText>Submit</HeaderText>
        </View>
      </TouchableOpacity>
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
  notesInput: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    borderRadius: 3,
    backgroundColor: 'white',
    fontSize: 20,
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
});
