import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeUserData } from '../utils/firebaseUtils';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'

const HomePage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const { t} = useTranslation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', t('Account created successfully'));
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', t('Logged in successfully'));
      }

      const userId = userCredential.user.uid;
      await initializeUserData(userId);

      navigation.navigate('Pompes');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = t('Invalid email address.');
          break;
        case 'auth/user-not-found':
          errorMessage = t('No user found with this email.');
          break;
        case 'auth/wrong-password':
          errorMessage = t('Incorrect password.');
          break;
        case 'auth/email-already-in-use':
          errorMessage = t('Email already in use.');
          break;
        default:
          errorMessage = t('Authentication failed. Please try again.');
          break;
      }
      Alert.alert(t('Authentication Failed'), errorMessage);
    }
  };

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? t('Sign Up') : t('Login')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('Email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t('Password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>{isSignUp ? t('Sign Up') : t('Login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.link}>
        <Text>{isSignUp ? t('Already have an account? Login') : t('Need an account? Sign Up')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeLanguage} style={styles.changeLanguageButton}>
        <Text>{t('Change Language')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginBottom: 10,
  },
  changeLanguageButton: {
    marginTop: 20,
  },
});

export default HomePage;
