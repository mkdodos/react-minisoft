import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    name: 'Mark',
  },
  {
    id: '2',
    name: 'Dada',
  },
];
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// 匯出 reducer 給 store 使用
// reducer 屬性在 createSlice 後自動產生
export default usersSlice.reducer;

// users 對應 store
export const selectAllUsers = state=>state.users
