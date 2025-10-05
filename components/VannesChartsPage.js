// ChartsPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import ChartComponent from './ChartComponent';
import { getAuth } from 'firebase/auth';

const VannesChartsPage = ({ navigation }) => {
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
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, []);

  // Prepare data for chart
  const chartData = vannesData.map(item => ({
    id: item.id,
    period: item.period,
    startdate: item.startdate
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vannes Data Chart</Text>
      <ChartComponent data={chartData} />
      <View style={styles.buttonContainer}>
        <Button title="Back to Vannes" onPress={() => navigation.navigate('vannes')} />
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

export default VannesChartsPage;
