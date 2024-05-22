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

// 更新 row: 更新的資料, index:資料列所在的索引
export const updateRow = createAsyncThunk(
  'mortgages/updateRow',
  async ({ row, index }) => {
    await db
      .collection('mortgages')
      .doc(row.id)
      .update({ date: row.date, basic: row.basic, interest: row.interest });
    return { row, index };
  }
);

export const deleteRow = createAsyncThunk('mortgages/deleteRow', async (id) => {
  const doc = await db.collection('mortgages').doc(id).delete();
  return id;
});

// const initialState = [
// {
//   id: 1,
//   account: '房貸A',
//   date: '2023-08-24',
//   basic: 0, //本金
//   interest: 0, //利息
// },
// ];

const initialState = {
  data: [],
};
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
        state.data = action.payload;
        // state.data = state.data.concat(action.payload)
        // return action.payload;
      })
      // 新增
      .addCase(addNewRow.fulfilled, (state, action) => {
        // console.log(state);
        // state = state.concat(action.payload);
        state.data.push(action.payload);
      })
      // 更新
      .addCase(updateRow.fulfilled, (state, action) => {
        // 表格資料列更新 
        let newItemList = state.data.slice();
        Object.assign(newItemList[action.payload.index], action.payload.row);
        state.data = newItemList;
      })
      .addCase(deleteRow.fulfilled, (state, action) => {
        // const { id } = action.payload;
        // const posts = state.filter(post => post.id !== id);
        // state = posts;
        state.data = state.data.filter((row) => row.id != action.payload);
        // state.push({
        //   id: 1,
        //   account: '房貸A',
        //   date: '2023-08-24',
        //   basic: 0, //本金
        //   interest: 0, //利息
        // });
        console.log(state);
      });
  },
});

export default slice.reducer;

export const selectData = (state) => state.mortgages.data;

export const { rowAdded } = slice.actions;
