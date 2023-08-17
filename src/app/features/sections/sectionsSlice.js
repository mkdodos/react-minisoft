import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db_money2022 as db } from '../../../utils/firebase';

// 取得資料
// export const fetchSections = async () => {
//   const snapshot = await db.collection('sections').get();
//   const data = snapshot.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
//   });
//   return data;

// };

export const fetchSections = createAsyncThunk(
  'sections/fetchSections',
  async () => {
    const snapshot = await db.collection('sections').get();
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return data;
  }
);

const initialState = {
  sections: [],
  status: 'idle',
};

// 資料操作
const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSections.pending, (state, action) => {
      state.status = 'loading';
      //  state.status='succeeded'
    });
    builder.addCase(fetchSections.fulfilled, (state, action) => {
      state.status='succeeded'
      state.sections = action.payload;
      // return action.payload;
    });
  },
});

//
export default sectionsSlice.reducer;
export const getSectionsStatus = (state) => state.sections.status;
export const getAllSections = (state) => state.sections.sections;
