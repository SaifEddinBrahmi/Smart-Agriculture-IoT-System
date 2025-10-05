import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from '@react-native-picker/picker'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ref, set, push } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useTranslation } from 'react-i18next';

const AddPompes = () => {
  const [data, setData] = useState({ name: "", period: "", startDate: new Date() });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const { t } = useTranslation();

  const handleChange = (name, value) => {
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const startDateTime = data.startDate.toISOString();
    const userId = getAuth().currentUser.uid;
    const newPompeRef = ref(database, `users/${userId}/pompes`);
    const newPompeKey = push(newPompeRef).key;
    await set(ref(database, `users/${userId}/pompes/${newPompeKey}`), {
      name: data.name,
      period: Number(data.period),
      startdate: startDateTime,
    });
    setData({ name: "", period: "", startDate: new Date() });
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setData(prevData => ({ ...prevData, startDate: date }));
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleTimeConfirm = (time) => {
    setData(prevData => {
      const updatedDate = new Date(prevData.startDate);
      updatedDate.setHours(time.getHours());
      updatedDate.setMinutes(time.getMinutes());
      return { ...prevData, startDate: updatedDate };
    });
    hideTimePicker();
  };

  return (
    <View>
      <Text>{t('addPompes.title')}</Text>
      <Picker selectedValue={data.name} onValueChange={(value) => handleChange('name', value)}>
        <Picker.Item label={t('addPompes.pompes1')} value="Pompes 1" />
        <Picker.Item label={t('addPompes.pompes2')} value="Pompes 2" />
      </Picker>
      <TextInput 
        placeholder={t('addPompes.periodPlaceholder')} 
        keyboardType="numeric" 
        value={data.period} 
        onChangeText={(value) => handleChange('period', value)} 
      />
      <Button title={t('addPompes.selectDate')} onPress={showDatePicker} />
      <Text>{`${t('addPompes.selectedDate')} ${data.startDate.toLocaleDateString()}`}</Text>
      <Button title={t('addPompes.selectTime')} onPress={showTimePicker} />
      <Text>{`${t('addPompes.selectedTime')} ${data.startDate.toLocaleTimeString()}`}</Text>
      <Button title={t('addPompes.addButton')} onPress={handleSubmit} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default AddPompes;
