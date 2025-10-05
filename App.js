import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import Pompes from './components/Pompes';
import Vannes from './components/Vannes';
import Bassin from './components/Bassin';
import Sonde from './components/Sonde';
import PompesChartsPage from './components/PompesChartsPage'; 
import VannesChartsPage from './components/VannesChartsPage'; 
import BassinChartsPage from './components/BassinChartsPage'; 
import SondeChartsPage from './components/SondeChartsPage';
import { auth } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: '#6c757d',
            tabBarLabelStyle: styles.tabLabel,
            headerRight: () => (
              <View style={styles.logoutButton}>
                <Button title={t('logout')} onPress={handleLogout} color="#ff5c5c" />
              </View>
            ),
          }}
        >
          <Tab.Screen name={'pompes'} component={Pompes} />
          <Tab.Screen name={'vannes'} component={Vannes} />
          <Tab.Screen name={'bassin'} component={Bassin} />
          <Tab.Screen name={'sonde'} component={Sonde} />
          <Tab.Screen name={'P'} component={PompesChartsPage} />
          <Tab.Screen name={'V'} component={VannesChartsPage} />
          <Tab.Screen name={'B'} component={BassinChartsPage} />
          <Tab.Screen name={'S'} component={SondeChartsPage} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    bottom: 13,
  },
  logoutButton: {
    marginRight: 10,
  },
});

export default App;
