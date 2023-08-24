import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions } from '../../../pages/Salary/actions';
import { db_money2022 as db } from '../../../utils/firebase';

export const fetchData = createAsyncThunk('mortgages/fetchData', async () => {
  const snapshot = await db.collection('mortgages').get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
});

export const addNewRow = createAsyncThunk(
  'mortgages/addNewRow',
  async (row) => {
    const doc = await db.collection('mortgages').add(row);
    return { ...row, id: doc.id };
  }
);

const initialState = [
  {
    id: 1,
    account: '房貸A',
    date: '2023-08-24',
    basic: 0, //本金
    interest: 0, //利息
  },
];
const slice = createSlice({
  name: 'mortgages',
  initialState,
  reducers: {
    rowAdded(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addNewRow.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.push(action.payload)
      });
  },
});

export default slice.reducer;

export const selectData = (state) => state.mortgages;

export const { rowAdded } = slice.actions;
