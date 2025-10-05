// src/utils/firebaseUtils.js
import { ref, set, get, child } from 'firebase/database';
import { database } from '../config/firebase';

export const initializeUserData = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(child(userRef, '/'));
    
    if (!snapshot.exists()) {
      // Initialize default data if it doesn't exist
      await set(userRef, {
        pompes: {},
        vannes: {},
        sondes: {},
        bassin: {}
      });
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
};
