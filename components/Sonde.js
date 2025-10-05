// src/components/Sonde.jsx
import React from "react";
import { View, Text, Button } from "react-native";
import DisplaySonde from "./DisplaySonde"; 
import styles from "./styles";

const Sonde = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sonde Data</Text>
      <Button title="View Charts" onPress={() => navigation.navigate('S')} />
      <DisplaySonde />

      
    </View>
  );
};

export default Sonde;
