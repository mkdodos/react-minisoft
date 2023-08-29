import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// const initialState = [];

const initialState = {
  data:[],
  status:'idle' // idle | succeeded
};

export const fetchData = createAsyncThunk('works/fetchData', async () => {
  // const url = 'http://server2000:8888/pdo-salary/works/read.php';
  const url = 'http://192.168.0.12:8888/pdo-salary/works/read.php';
  const response = await axios.get(url, {
    params: { from: '2023-01-01', to: '2023-02-02' },
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
  },
});

export default slice.reducer;
export const selectData = (state) => state.works.data;
export const getStatus = (state) => state.works.status;
