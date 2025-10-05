import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";


const DisplayVannes = () => {
  const [vannesData, setVannesData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      const vannesRef = ref(database, `users/${user.uid}/vannes`);
      const unsubscribe = onValue(vannesRef, (snapshot) => {
        const data = snapshot.val();
        const formattedData = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setVannesData(formattedData);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const vannesRef = ref(database, `users/${userId}/vannes/${id}`);
      await remove(vannesRef);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  return (
    <View>
      <Text>Vannes Data</Text>
      <FlatList
        data={vannesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Period: {item.period}</Text>
            <Text>Start Date: {new Date(item.startdate).toLocaleString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default DisplayVannes;
