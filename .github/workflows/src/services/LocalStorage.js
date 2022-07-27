import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const saveUserInLocalStorageAsync = (user, key) =>
  AsyncStorage.setItem(key, JSON.stringify(user));

export const removeUserFromStorageAsync = async key => {
  const value = await AsyncStorage.removeItem(key);
  try {
    const user = JSON.parse(value);
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const getUserFromStorageAsync = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return;
    }
    const user = JSON.parse(value);

    return user;
  } catch (e) {
    console.warn(e);
  }
};
