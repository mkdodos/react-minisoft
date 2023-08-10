import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import witcherReducer from './features/witcher/witcherSlice';

const store = configureStore({
  reducer: {
  
    witcher:witcherReducer
  },
});

export { store };
