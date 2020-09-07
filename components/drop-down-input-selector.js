import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
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
  const [showSelectModal, setShowSelectModal] = React.useState(false);
  const [showNewItemModal, setShowNewItemModal] = React.useState(false);
  const [newMedicineText, setNewMedicineText] = React.useState('');

  const handleItemSelect = (item) => {
    setShowSelectModal(false);
    itemSelectedCallback(item);
  };

  const handleNewItemPressed = () => {
    setShowNewItemModal(true);
  };

  const handleNewItemCreated = () => {
    newItemCallback(newMedicineText);
    setShowNewItemModal(false);
    setNewMedicineText('');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowSelectModal(true)}>
        <View style={styles.buttonContainer}>
          <HeaderText>{selectedItem || 'Select a Medication'}</HeaderText>
          <Image source={DownArrow} style={styles.sprite} />
        </View>
      </TouchableOpacity>

      {/* Select Item Modal */}
      <Modal visible={showSelectModal} transparent>
        <ScrollView style={styles.scrollContainer}>
          {listItems.map((item) => (
            <ListItem key={item.text} item={item} onSelect={handleItemSelect} />
          ))}
          {newItemCallback && (
            <TouchableOpacity
              onPress={handleNewItemPressed}
              style={[styles.listItem, styles.addItemButton]}>
              <Text style={styles.addItemPlusText}>+</Text>
              <Text style={styles.listItemText}>Add new Item</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setShowSelectModal(false)}>
          <HeaderText>Close</HeaderText>
        </TouchableOpacity>
      </Modal>

      {/* New Item Modal */}
      <Modal visible={showNewItemModal}>
        <View style={styles.newMedicineContainer}>
          <HeaderText>New Medicine:</HeaderText>
          <TextInput
            value={newMedicineText}
            onChangeText={(text) => setNewMedicineText(text)}
            autoFocus
            style={styles.notesInput}
          />
          <TouchableOpacity
            onPress={handleNewItemCreated}
            style={[
              styles.listItem,
              styles.addItemButton,
              styles.newMedicineButton,
            ]}>
            <Text style={styles.addItemPlusText}>+</Text>
            <Text style={styles.listItemText}>Add new Item</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowNewItemModal(false)}>
            <View style={styles.newItemClose}>
              <HeaderText>Close</HeaderText>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
    delayPressIn={5}>
    <Text style={styles.listItemText}>{item.text}</Text>
  </TouchableOpacity>
);

// DropDownInputSelector's StyleSheet
// ListItem's StyleSheet
const styles = StyleSheet.create({
  scrollContainer: {
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
  sprite: {
    width: 50,
    height: 50,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addItemPlusText: {
    fontWeight: 'bold',
    fontSize: 64,
    paddingLeft: 16,
    paddingRight: 32,
  },
  newMedicineContainer: {
    margin: 8,
  },
  notesInput: {
    borderWidth: 3,
    borderColor: 'black',
    fontSize: 24,
  },
  newMedicineButton: {
    borderWidth: 3,
    marginTop: 8,
    height: 75,
    backgroundColor: 'chartreuse',
  },
  newItemClose: {
    borderWidth: 3,
    marginTop: 8,
    borderRadius: 9,
    alignItems: 'center',
    backgroundColor: 'red',
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
