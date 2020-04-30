import React from 'react';

import {Text, View, Button} from 'react-native';

export const Profile = ({route, navigation}) => (
  <View>
    <Text>This is the Profile Page for {route.params.name}</Text>
    <Button
      title="Go to Home Page"
      onPress={() => navigation.navigate('Home')}
    />
  </View>
);
