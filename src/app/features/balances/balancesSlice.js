import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../../utils/firebase';

export const fetchData = createAsyncThunk(
  'balances/fetchData',
  async ({ limit }) => {
    const user = localStorage.getItem('user');
    // 第一次載入
    // 之後載入
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)
      // .where('user', '==', user)
      .limit(limit)
      .orderBy('date', 'desc')
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    console.log(snapshot.size);

    // 最後一筆
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    console.log(lastDoc);

    return { data, lastDoc };
  }
);

export const fetchMoreData = createAsyncThunk(
  'balances/fetchMoreData',
  async ({ limit, lastDoc }) => {
    const user = localStorage.getItem('user');

   

    // startAfter 要在 orderBy 後面
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)

      .limit(limit)
      .orderBy('date', 'desc')
      .startAfter(lastDoc)
      .get();

    console.log(snapshot.size);

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // 最後一筆
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    console.log(lastVisible);

    return { data, lastDoc: lastVisible };
  }
);

const initialState = {
  rows: [],
  lastDoc: null,
};

const slice = createSlice({
  name: 'balances',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // state.rows.concat(action.payload)
      // state.rows = state.rows.concat(action.payload.data);
      state.rows = action.payload.data;
      state.lastDoc = action.payload.lastDoc;
      // console.log(action.payload.lastDoc);
      // state.rows.push(action.payload)
      // return action.payload;
    });

    builder.addCase(fetchMoreData.fulfilled, (state, action) => {
      state.rows = state.rows.concat(action.payload.data);
      state.lastDoc = action.payload.lastDoc;
    });

    builder.addCase(fetchMoreData.rejected, (state, action) => {
      state.rows = [];
      console.log(action.error.message);
      // state.lastDoc = action.payload.lastDoc;
    });
  },
});

// export
export default slice.reducer;

export const selectAllBalances = (state) => state.balances.rows;

// 最後一筆文件指標
export const getLastDoc = (state) => state.balances.lastDoc;
