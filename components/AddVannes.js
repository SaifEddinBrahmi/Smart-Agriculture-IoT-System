import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Picker } from '@react-native-picker/picker'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ref, set } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";

const AddVannes = () => {
  const [data, setData] = useState({ name: "", period: "", startDate: new Date() });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleChange = (name, value) => {
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const startDateTime = data.startDate.toISOString(); // Format the date
    const userId = getAuth().currentUser.uid;
    const newDataRef = ref(database, `users/${userId}/vannes/${Date.now()}`);
    await set(newDataRef, {
      name: data.name,
      period: Number(data.period),
      startdate: startDateTime,
    });
    setData({ name: "", period: "", startDate: new Date() }); // Reset the form
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
      <Text>Add Vannes</Text>
      <Picker selectedValue={data.name} onValueChange={(value) => handleChange('name', value)}>
        <Picker.Item label="Vanne 1" value="Vanne 1" />
        <Picker.Item label="Vanne 2" value="Vanne 2" />
      </Picker>
      <TextInput 
        placeholder="Period (min)" 
        keyboardType="numeric" 
        value={data.period} 
        onChangeText={(value) => handleChange('period', value)} 
      />
      <Button title="Select Start Date" onPress={showDatePicker} />
      <Text>{`Selected Date: ${data.startDate.toLocaleDateString()}`}</Text>
      <Button title="Select Start Time" onPress={showTimePicker} />
      <Text>{`Selected Time: ${data.startDate.toLocaleTimeString()}`}</Text>
      <Button title="Add Vanne" onPress={handleSubmit} />

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      
      {/* Time Picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default AddVannes;
