import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { db_money2022 as db } from '../../../utils/firebase';

const user = localStorage.getItem('user');

//  第一次載入
export const fetchData = createAsyncThunk(
  'balances/fetchData',
  async ({ limit }) => {
    // const user = localStorage.getItem('user');
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)
      .limit(limit)
      .orderBy('date', 'desc')
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    // 最後一筆
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return { data, lastDoc };
  }
);

// 之後載入
export const fetchMoreData = createAsyncThunk(
  'balances/fetchMoreData',
  async ({ limit, lastDoc }) => {
    // startAfter 要在 orderBy 後面
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)
      .limit(limit)
      .orderBy('date', 'desc')
      .startAfter(lastDoc)
      .get();

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 最後一筆
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return { data, lastDoc: lastVisible };
  }
);

// 依類別取得資料
export const fetchDataByCate = createAsyncThunk(
  'balances/fetchDataByCate',

  async (cate) => {
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)
      .where('cate', '==', cate)
      .orderBy('date', 'desc')
      .get();

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    console.log(cate)

    return { data };
  }
);

const initialState = {
  rows: [],
  lastDoc: null,
  status: 'idle',
};

const slice = createSlice({
  name: 'balances',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // 載入中
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.rows = action.payload.data;
      state.lastDoc = action.payload.lastDoc;
      state.status = 'succeeded';
    });

    // 載入中
    builder.addCase(fetchMoreData.pending, (state, action) => {
      state.status = 'loading';
    });

    builder.addCase(fetchMoreData.fulfilled, (state, action) => {
      state.rows = state.rows.concat(action.payload.data);
      state.lastDoc = action.payload.lastDoc;
      state.status = 'succeeded';
    });

    builder.addCase(fetchMoreData.rejected, (state, action) => {
      state.rows = [];
      console.log(action.error.message);
      // state.lastDoc = action.payload.lastDoc;
    });

    builder.addCase(fetchDataByCate.fulfilled, (state, action) => {
      state.rows = action.payload.data;
    });
  },
});

// export
export default slice.reducer;

export const selectAllBalances = (state) => state.balances.rows;

// 最後一筆文件指標
export const getLastDoc = (state) => state.balances.lastDoc;

// 載入資料狀態
export const getStatus = (state) => state.balances.status;
