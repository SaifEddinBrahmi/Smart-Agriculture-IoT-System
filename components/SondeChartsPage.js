// ChartsPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import SondeChartH from './SondeChartH';
import SondeChartT from './SondeChartT';
import { getAuth } from 'firebase/auth';

const SondeChartsPage = ({ navigation }) => {
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
    } else {
      Alert.alert('Error', 'User is not authenticated');
    }
  }, []);

  // Prepare data for chart
  const chartData1 =sondeData.map(item => ({
    id: item.id,
    tempLevel1: item.tempLevel1,
    tempLevel2: item.tempLevel2,
    tempLevel3: item.tempLevel3,
    date: item.date
  }));
  const chartData2 =sondeData.map(item => ({
    id: item.id,
    humLevel1: item.humLevel1,
    humLevel2: item.humLevel2,
    humLevel3: item.humLevel3,
    date: item.date
  }));


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sonde Data Chart</Text>
      <Text>Temperature:</Text>
      <SondeChartT data={chartData1} />

      <Text></Text>
      <Text>Humidity:</Text>
      <SondeChartH data={chartData2} />
      <View style={styles.buttonContainer}>
        <Button title="Back to Sonde" onPress={() => navigation.navigate('sonde')} />
      </View>
    </ScrollView>
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

export default SondeChartsPage;
