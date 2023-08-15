import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 將 payload (資料) 加到 state (資料表)
    // postAdded(state, action) {
    //   state.push(action.payload);
    // },
    // 改寫,拆成 reducer , prepare
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
  extraReducers(builder) {
   

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    });
  },
});

// 匯出資料(posts名稱是配合store的reducer)
export const selectAllPosts = (state) => state.posts.posts;

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.error;

export { fetchPosts };

// state 代表 store 中所有的 reducer
// 所有的 reducer 都集中在 store
// export const selectAllUsers = (state) => state.users;

// acitons 為自動產生
export const { postAdded } = postsSlice.actions;

// 匯出 reducer 供 store 使用
export default postsSlice.reducer;
