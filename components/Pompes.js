import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import AddPompes from "./AddPompes";
import DisplayPompes from "./DisplayPompes";
import styles from "./styles";
import { useTranslation } from 'react-i18next';

const Pompes = ({ navigation }) => {
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Corrected translation usage with Text component */}
      <Text style={styles.title}>{t("Pompes Actions")}</Text> 
      <AddPompes />
      {/* Correct translation usage for Button title */}
      <Button
        title={showData ? t("Hide Data") : t("Show Data")}
        onPress={() => setShowData(!showData)}
      />
      {showData && <DisplayPompes />}
      {/* Correct translation usage for Button title */}
      <Button title={t('View Charts')} onPress={() => navigation.navigate('P')} />
    </View>
  );
};

export default Pompes;
