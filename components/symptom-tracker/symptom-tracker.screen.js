import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import { HeaderText } from '../header-text';
import { SymptomListItem } from './symptom-list-item';
import { FloatingCircleButton } from '../floating-circle-button';

/**
 * State Controler
 */
const initialState = {
  symptoms: [],
};

/**
 * Actions
 */
const ADD_SYMPTOM = 'add_symptom';
export const SymptomActions = { ADD_SYMPTOM };

const symptomReducer = (state, action) => {
  switch (action.type) {
    case ADD_SYMPTOM:
      action.symptom.id = state.symptoms.length;
      action.symptom.dateCreated = new Date();
      return { ...state, symptoms: [...state.symptoms, action.symptom] };

    default:
      break;
  }
};

/**
 * SymptomTrackerScreen
 *  - Displays the Current Symptoms as Recorded By the User
 */
export const SymptomTrackerScreen = ({ navigation, route }) => {
  const [symptomList, dispatchSymptomList] = React.useReducer(
    symptomReducer,
    initialState,
  );
  const handlePress = () => {
    // dispatchSymptomList({
    //   type: ADD_SYMPTOM,
    //   symptom: {
    //     notes:
    //       'These are some very Long Notes to show what will happen with a lot of text',
    //     dateTime: new Date(),
    //   },
    // });
    navigation.navigate('NewSymptomPage', {
      dispatchSymptom: dispatchSymptomList,
    });
  };
  return (
    <View style={styles.container}>
      <FloatingCircleButton onPress={handlePress}>+</FloatingCircleButton>
      <HeaderText>Patient History</HeaderText>
      <FlatList
        style={styles.list}
        data={symptomList.symptoms}
        renderItem={({ item: { notes, dateTime } }) => (
          <SymptomListItem notes={notes} dateTime={dateTime} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

/**
 * StyleSheet for the SymptomTrackerScreen
 */
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  list: {
    paddingBottom: 100,
  },
});
