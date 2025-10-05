// src/components/Bassin.jsx
import React from "react";
import { View, Text, Button } from "react-native";
import DisplayBassin from "./DisplayBassin";
import styles from "./styles";

const Bassin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bassin Data</Text>
      <Button title="View Charts" onPress={() => navigation.navigate('B')} />
      <DisplayBassin />
    </View>
  );
};

export default Bassin;
