// src/components/Vannes.jsx
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import AddVannes from "./AddVannes";
import DisplayVannes from "./DisplayVannes";
import styles from "./styles";

const Vannes = ({ navigation }) => {
  const [showData, setShowData] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vannes Actions</Text>
      <AddVannes />
      <Button title={showData ? "Hide Data" : "Show Data"} onPress={() => setShowData(!showData)} />
      {showData && <DisplayVannes />}
      <Button title="View Charts" onPress={() => navigation.navigate('V')} />
    </View>
  );
};

export default Vannes;
