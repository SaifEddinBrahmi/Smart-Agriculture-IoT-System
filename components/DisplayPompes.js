import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";
import { useTranslation } from 'react-i18next';

const DisplayPompes = () => {
  const [pompesData, setPompesData] = useState([]);
  const [userId, setUserId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserId(user.uid);
      const pompesRef = ref(database, `users/${user.uid}/pompes`);

      const unsubscribe = onValue(pompesRef, (snapshot) => {
        const data = snapshot.val();
        const formattedData = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setPompesData(formattedData);
      });

      return () => unsubscribe();
    } else {
      Alert.alert(t('Error'), t('displayPompes.errorAuth'));
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const pompesRef = ref(database, `users/${userId}/pompes/${id}`);
      await remove(pompesRef);
    } catch (error) {
      console.error('Error removing data:', error);
      Alert.alert(t('Error'), t('displayPompes.errorDelete'));
    }
  };

  return (
    <View style={styles.container}>
      <Text>{t('displayPompes.title')}</Text>
      <FlatList
        data={pompesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{t('displayPompes.name')} {item.name}</Text>
            <Text>{t('displayPompes.period')} {item.period}</Text>
            <Text>{t('displayPompes.startDate')} {new Date(item.startdate).toLocaleString()}</Text>
            <Button title={t('displayPompes.deleteButton')} onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
  },
});

export default DisplayPompes;
