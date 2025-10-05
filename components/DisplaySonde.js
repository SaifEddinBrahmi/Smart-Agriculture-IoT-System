import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";

const DisplaySonde = () => {
  const [sondeData, setSondeData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      const sondeRef = ref(database, `users/${user.uid}/sonde`);
      const unsubscribe = onValue(sondeRef, (snapshot) => {
        const data = snapshot.val();
        const formattedData = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setSondeData(formattedData);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const sondeRef = ref(database, `users/${userId}/sonde/${id}`);
      await remove(sondeRef);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  return (
    <View>
      <Text>Sonde Data</Text>
      <FlatList
        data={sondeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Date: {new Date(item.date).toLocaleString()}</Text>
            <Text>Temp Level 1: {item.tempLevel1}</Text>
            <Text>Temp Level 2: {item.tempLevel2}</Text>
            <Text>Temp Level 3: {item.tempLevel3}</Text>
            <Text>Hum Level 1: {item.humLevel1}</Text>
            <Text>Hum Level 2: {item.humLevel2}</Text>
            <Text>Hum Level 3: {item.humLevel3}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default DisplaySonde;
