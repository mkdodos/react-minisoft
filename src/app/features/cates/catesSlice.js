import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../../utils/firebase';

// 取得資料




export const fetchCates = createAsyncThunk(
  'cates/fetchRows',
  async () => {
    const user = localStorage.getItem('user');
    const snapshot = await db.collection('cates').where('user','==',user)
    .orderBy('prior')
    .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return data;
  }
);

const initialState = {
  rows: [],
  status: 'idle',
};

// 資料操作
const slice = createSlice({
  name: 'cates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCates.pending, (state, action) => {
      state.status = 'loading';      
    });
    builder.addCase(fetchCates.fulfilled, (state, action) => {
      state.status='succeeded'
      state.rows = action.payload;     
    });
  },
});

//
export default slice.reducer;
export const getStatus = (state) => state.cates.status;
export const getAllCates = (state) => state.cates.rows;
