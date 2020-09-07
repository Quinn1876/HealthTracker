import AsyncStorage from '@react-native-community/async-storage';

const MEDICATION_LIST_KEY = '@medication_list_key';

export const ASgetMedicationList = async () => {
  try {
    const value = JSON.parse(await AsyncStorage.getItem(MEDICATION_LIST_KEY));
    if (value !== null) {
      console.log(value);
      return value.medications;
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

export const ASsetMedicationList = async (list) => {
  const store = JSON.stringify({ medications: list });
  try {
    await AsyncStorage.setItem(MEDICATION_LIST_KEY, store);
  } catch (e) {
    console.error(e);
  }
};
