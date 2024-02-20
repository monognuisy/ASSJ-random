import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../stores/root-reducer';
import { useMemo } from 'react';

const initializeStore = () => {
  const store = configureStore({ reducer: rootReducer });
  return store;
};

export const useStore = () => {
  const store = useMemo(() => initializeStore(), []);
  return store;
};
