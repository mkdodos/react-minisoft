import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions } from '../../../pages/Salary/actions';
import { db_money2022 as db } from '../../../utils/firebase';

// 帳戶資料
export const fetchAccounts = createAsyncThunk(
  'mortgages/fetchAccounts',
  async () => {
    const snapshot = await db
      .collection('mortgageAccounts')
      .orderBy('name')
      .get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return data;
  }
);

export const fetchData = createAsyncThunk('mortgages/fetchData', async () => {
  const snapshot = await db.collection('mortgages').get();
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
});

export const searchData = createAsyncThunk(
  'mortgages/searchData',
  async (search) => {
    let snapshot = db.collection('mortgages');

    // 有參數值才加入條件
    if (search.date != '') {
      snapshot = snapshot.where('date', '==', search.date);
    }

    if (search.basic != '') {
      snapshot = snapshot.where('basic', '==', search.basic);
    }

    if (search.account != '') {
      // console.log(search.account)
      snapshot = snapshot.where('account.id', '==', search.account);
    }

    snapshot = await snapshot.get();

    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    return data;
  }
);

// 新增
export const addNewRow = createAsyncThunk(
  'mortgages/addNewRow',
  async (row) => {
    const doc = await db.collection('mortgages').add(row);
    // 更新帳戶餘額
    const account = await db
      .collection('mortgageAccounts')
      .doc(row.account.id)
      .get();
    const amt = account.data().amt - row.basic * 1;
    await db.collection('mortgageAccounts').doc(row.account.id).update({ amt });
    return { ...row, id: doc.id };
  }
);

// 更新 row: 更新的資料, index:資料列所在的索引
export const updateRow = createAsyncThunk(
  'mortgages/updateRow',
  async ({ row, index }) => {
    await db.collection('mortgages').doc(row.id).update({
      account: row.account,
      date: row.date,
      basic: row.basic,
      interest: row.interest,
    });
    return { row, index };
  }
);

// 刪除
export const deleteRow = createAsyncThunk(
  'mortgages/deleteRow',
  async (row) => {
    const doc = await db.collection('mortgages').doc(row.id).delete();

    // 更新帳戶餘額
    const account = await db
      .collection('mortgageAccounts')
      .doc(row.account.id)
      .get();
    const amt = account.data().amt + row.basic * 1;
    await db.collection('mortgageAccounts').doc(row.account.id).update({ amt });

    return row;
  }
);

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
  accounts: [
    { name: 'A', amt: 0 },
    { name: 'B', amt: 0 },
  ],
};
const slice = createSlice({
  name: 'mortgages',
  initialState,
  reducers: {
    rowAdded(state, action) {
      state.push(action.payload);
    },
    // updateBalance(state, action) {
    //   state.accounts[0].amt = 100;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      
      })

      // 搜尋
      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // 新增
      .addCase(addNewRow.fulfilled, (state, action) => {
        state.data.push(action.payload);
        // 更新帳戶餘額
        const id = action.payload.account.id;
        const account = state.accounts.find((row) => row.id == id);
        account.amt -= action.payload.basic * 1;
      })
      // 更新
      .addCase(updateRow.fulfilled, (state, action) => {
        // 表格資料列更新
        let newItemList = state.data.slice();
        Object.assign(newItemList[action.payload.index], action.payload.row);
        state.data = newItemList;
      })
      // 刪除
      .addCase(deleteRow.fulfilled, (state, action) => {
        state.data = state.data.filter((row) => row.id != action.payload.id);
        // 更新帳戶餘額
        const id = action.payload.account.id;
        const account = state.accounts.find((row) => row.id == id);
        account.amt += action.payload.basic * 1;
      });
  },
});

export default slice.reducer;

// mortgages 對應 store reducer
export const selectData = (state) => state.mortgages.data;
export const selectAccounts = (state) => state.mortgages.accounts;

export const { rowAdded } = slice.actions;
