// ChartsPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import BassinChartsComp from './BassinChartsComp';
import { getAuth } from 'firebase/auth';

const BassinChartsPage = ({ navigation }) => {
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
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, []);

  // Prepare data for chart
  const chartData = bassinData.map(item => ({
    id: item.id,
    distance: item.distance,
    date: item.date
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bassin Data Chart</Text>
      <BassinChartsComp data={chartData} />
      <View style={styles.buttonContainer}>
        <Button title="Back to Bassin" onPress={() => navigation.navigate('bassin')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default BassinChartsPage;
