import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import ChartComponent from './ChartComponent';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';


const PompesChartsPage = ({ navigation }) => {
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
      Alert.alert('Error', 'User not authenticated'); // Static error message
    }
  }, []);

  // Prepare data for chart
  const chartData = pompesData.map(item => ({
    id: item.id,
    period: item.period,
    startdate: item.startdate
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {t('Pompes Data Chart')}</Text>
      <ChartComponent data={chartData} />
      <View style={styles.buttonContainer}>
        <Button 
          title={t("Back to Pompes")}
          onPress={() => navigation.navigate('pompes')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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

export default PompesChartsPage;
