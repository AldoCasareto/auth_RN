import axios from 'axios';
import { FIREBASE_KEY } from '@env';
import { Alert } from 'react-native';

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_KEY}`;

  const response = await axios.post(url, { email, password, returnedSecureToken: true });
  console.log(response.data);
  const token = response.data.idToken;
  console.log(`tokenauthenticate = `, token);
  return token;
};

export const createUser = (email, password) => {
  try {
    return authenticate('signUp', email, password);
  } catch (error) {
    Alert.alert('Creating user failed!, Please try again later');
  }
};

export const login = (email, password) => {
  try {
    const token = authenticate('signInWithPassword', email, password);
    console.log(`tokenutils = `, token);
    return token;
  } catch (error) {
    Alert.alert('Authentication failed!, Please check your login details');
  }
};
