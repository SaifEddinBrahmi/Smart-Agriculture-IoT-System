import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../config/firebase";
import { getAuth } from "firebase/auth";

const DisplayBassin = () => {
  const [bassinData, setBassinData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      const bassinRef = ref(database, `users/${user.uid}/bassin`);
      const unsubscribe = onValue(bassinRef, (snapshot) => {
        const data = snapshot.val();
        const formattedData = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setBassinData(formattedData);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const bassinRef = ref(database, `users/${userId}/bassin/${id}`);
      await remove(bassinRef);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  return (
    <View>
      <Text>Bassin Data</Text>
      <FlatList
        data={bassinData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Distance: {item.distance}</Text>
            <Text>Date: {new Date(item.date).toLocaleString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default DisplayBassin;
