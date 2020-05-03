import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

import { HeaderText } from '.';

import DownArrow from '../assets/imgs/chevron-arrow-down.png';

// DropDownInputSelector
// - A Scrollable drop down selector
//   @newItemCallback - When a newItemCallback is passed in props,
//   an option will appear at the bottom of the screen
//   that, when pressed will activate the newItemCallback
//   allowing the user to add an option to the list
export const DropDownInputSelector = ({
  listItems,
  itemSelectedCallback,
  newItemCallback,
  selectedItem,
}) => {
  const [show, setShow] = React.useState(false);

  const handleItemSelect = (item) => {
    setShow(false);
    itemSelectedCallback(item);
  };
  return (
    <View>
      {!show ? (
        <TouchableOpacity onPress={() => setShow(true)}>
          <View style={styles.buttonContainer}>
            <HeaderText>{selectedItem || 'Select a Medication'}</HeaderText>
            <Image source={DownArrow} style={styles.sprite} />
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <ScrollView style={styles.scrollContainer}>
            {listItems.map((item) => (
              <ListItem
                key={item.text}
                item={item}
                onSelect={handleItemSelect}
              />
            ))}
            {newItemCallback && (
              <TouchableOpacity
                onPress={newItemCallback}
                style={[styles.listItem, styles.addItemButton]}>
                <Text>+</Text>
                <Text>Add new Item</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          <TouchableOpacity
            style={{ ...styles.buttonContainer, ...styles.closeButton }}
            onPress={() => setShow(false)}>
            <HeaderText>Close</HeaderText>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={false} />
    </View>
  );
};

// ListItem
// A component that displays an individual
// in the list
// @item: {
//   text: string
// }
const ListItem = ({ item, onSelect }) => (
  <TouchableOpacity
    style={styles.listItemContainer}
    onPress={() => onSelect(item)}
    delayPressIn={5}
    // delayPressOut={5}
    // delayLongPress={5}>
  >
    <Text style={styles.listItemText}>{item.text}</Text>
  </TouchableOpacity>
);

// DropDownInputSelector's StyleSheet
// ListItem's StyleSheet
const styles = StyleSheet.create({
  scrollContainer: {
    width: 344,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: 'white',
    paddingBottom: 16,
    margin: 8,
    borderColor: 'royalblue',
    borderWidth: 5,
    borderRadius: 15,
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
  closeButton: {
    position: 'absolute',
    top: 266,
  },
  sprite: {
    width: 50,
    height: 50,
  },
  addItemButton: {
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 28,
  },
  listItemContainer: {
    borderBottomColor: 'royalblue',
    borderBottomWidth: 3,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 8,
    zIndex: 50,
  },
});

export default DropDownInputSelector;
