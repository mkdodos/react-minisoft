import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const witcherSlice = createSlice({
  name: 'witcher',
  initialState,
  reducers: {},
});

export default witcherSlice.reducer;
