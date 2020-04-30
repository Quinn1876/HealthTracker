/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Home} from './components/home';
import {Profile} from './components/profile';
import {SymptomTrackerScreen} from './components/symptom-tracker/symptom-tracker.screen';
import {NewSymptomScreen} from './components/symptom-tracker/new-symptom.screen';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 1000,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SymptomTracker" mode="modal">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'My Home'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          initialParams={{name: 'Quinn'}}
          options={({route}) => ({
            title: `${route.params.name}'s Profile`,
          })}
        />
        <Stack.Screen
          name="SymptomTracker"
          component={SymptomTrackerScreen}
          options={{
            title: 'Symptom Tracker',
            headerBackTitleVisible: false,
            headerLeft: () => {},
          }}
        />
        <Stack.Screen
          name="NewSymptomPage"
          component={NewSymptomScreen}
          options={{
            title: 'Add new Event',
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
