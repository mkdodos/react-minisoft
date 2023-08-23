import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = [];

export const fetchData = createAsyncThunk('works/fetchData', async () => {
  // const url = 'http://server2000:8888/pdo-salary/works/read.php';
  const url = 'http://192.168.0.12:8888/pdo-salary/works/read.php';
  const response = await axios.get(url, {
    params: { from: '2022-01-01', to: '2022-02-02' },
  });
  return response.data;
});

const slice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default slice.reducer;
export const selectData = (state) => state.works;
