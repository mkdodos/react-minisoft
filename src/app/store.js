import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import witcherReducer from './features/witcher/witcherSlice';
import postsReducer from './features/posts/postsSlice'
import usersReducer from './features/users/usersSlice'
import sectionsReducer from './features/sections/sectionsSlice'
const store = configureStore({
  reducer: {  
    posts:postsReducer,
    witcher:witcherReducer,
    users:usersReducer,
    sections:sectionsReducer
    
  },
});

export { store };
