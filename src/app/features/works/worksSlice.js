import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// const initialState = [];

const initialState = {
  data:[],
  arrdone:[],
  status:'idle' // idle | succeeded
};

const host = 'http://192.168.0.12:8888/pdo-salary';

export const fetchData = createAsyncThunk('works/fetchData', async () => {
  // const url = 'http://server2000:8888/pdo-salary/works/read.php';
  const url = `${host}/works/read.php`;
  const response = await axios.get(url, {
    params: { from: '2023-01-01', to: '2023-02-02' },
  });
  return response.data;
});



export const fetchArrDone = createAsyncThunk('works/fetchArrDone', async (workId) => {
  const url = `${host}/arrdones/read.php`;
  const response = await axios.get(url, {
    params: { workId },
  });
  return response.data;
});



const slice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // 載入完成
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded'
      // return action.payload;
    });
    // 排程完工載入完成
    builder.addCase(fetchArrDone.fulfilled, (state, action) => {
      state.arrdone = action.payload;
      state.status = 'succeeded'      
    });
  },
});

export default slice.reducer;
export const selectData = (state) => state.works.data;
export const selectArrDone = (state) => state.works.arrdone;
export const getStatus = (state) => state.works.status;
