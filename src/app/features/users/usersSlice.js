import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';


const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
  const response = await axios.get(USERS_URL);
  return response.data
})

// const initialState = {
//   users:[],
//   status:'idle'
// }

const initialState = []

// const initialState = [
//   {
//     id: '1',
//     name: 'Mark',
//   },
//   {
//     id: '2',
//     name: 'Dada',
//   },
// ];


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(fetchUsers.fulfilled,(state,action)=>{
      // 不寫 state.push ,代表直接用此 payload 覆蓋 state
      return action.payload
    })
  }
});

// 匯出 reducer 給 store 使用
// reducer 屬性在 createSlice 後自動產生
export default usersSlice.reducer;

// users 對應 store
export const selectAllUsers = state=>state.users
