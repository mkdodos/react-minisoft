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
  async ({ limit, lastDoc, cate }) => {
    let snapshot;
    // 判斷有無類別
    if (cate) {
      snapshot = await db
        .collection('balances')
        .where('user', '==', user)
        .where('cate', '==', cate)
        .limit(limit)
        .orderBy('date', 'desc')
        .startAfter(lastDoc)
        .get();
      console.log(cate);
    } else {
      // startAfter 要在 orderBy 後面
      snapshot = await db
        .collection('balances')
        .where('user', '==', user)
        .limit(limit)
        .orderBy('date', 'desc')
        .startAfter(lastDoc)
        .get();
      // console.log(cate)
    }

    // console.log(snapshot.size);

    // 已經沒有資料的時候
    if (snapshot.size == 0) {
      return { data: [], lastDoc: null, isEnd: true };
    }
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // console.log(data);

    // 最後一筆
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    return { data, lastDoc: lastVisible, isEnd: false };
  }
);

// 依類別取得資料
export const fetchDataByCate = createAsyncThunk(
  'balances/fetchDataByCate',

  async ({ cate, limit }) => {
    const snapshot = await db
      .collection('balances')
      .where('user', '==', user)
      .where('cate', '==', cate)
      .limit(limit)
      .orderBy('date', 'desc')

      .get();

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // console.log(cate)

    // 最後一筆
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { data, lastDoc };
  }
);

const initialState = {
  rows: [],
  lastDoc: null,
  status: 'idle',
  // 當 moredata 資料為0時,將 isEnd 設為 true,讓按鈕關閉
  isEnd: false,
};

const slice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    setIsEnd(state, action) {
      state.isEnd = false;
    },
  },
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
      // action.payload 從 createAsyncThunk 回傳
      console.log(action.payload);
      state.rows = state.rows.concat(action.payload.data);
      state.lastDoc = action.payload.lastDoc;
      state.status = 'succeeded';
      state.isEnd = action.payload.isEnd;
    });

    builder.addCase(fetchMoreData.rejected, (state, action) => {
      state.rows = [];
      console.log(action.error.message);
      // state.lastDoc = action.payload.lastDoc;
    });

    builder.addCase(fetchDataByCate.fulfilled, (state, action) => {
      state.rows = action.payload.data;
      state.lastDoc = action.payload.lastDoc;
    });
  },
});

// export
export default slice.reducer;

export const { setIsEnd } = slice.actions;

export const selectAllBalances = (state) => state.balances.rows;

// 最後一筆文件指標
export const getLastDoc = (state) => state.balances.lastDoc;

// 載入資料狀態
export const getStatus = (state) => state.balances.status;

// 已無資料
export const getIsEnd = (state) => state.balances.isEnd;
