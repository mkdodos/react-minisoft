import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import witcherReducer from './features/witcher/witcherSlice';
import postsReducer from './features/posts/postsSlice'
import usersReducer from './features/users/usersSlice'
import sectionsReducer from './features/sections/sectionsSlice'
import catesReducer from './features/cates/catesSlice'

import balancesReducer from './features/balances/balancesSlice'
import worksReducer from './features/works/worksSlice'

const store = configureStore({
  reducer: {  
    posts:postsReducer,
    witcher:witcherReducer,
    users:usersReducer,
    sections:sectionsReducer,
    cates:catesReducer,
    balances:balancesReducer,
    works:worksReducer
    
  },
  
  // 在 取得 cates 資料時,出現錯誤
  // A non-serializable value was detected in an action, in the path: `payload.0.createdAt`. Value: t {seconds: 1659709666, nanoseconds: 482000000} 
  // 參考此篇加入下列這行
  // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export { store };
