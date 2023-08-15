import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { FeedContent } from 'semantic-ui-react';

// let initialState = [];
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts123', async () => {
  const response = await axios.get(POSTS_URL);
  // console.log(response.data)
  return response.data;
});

// fetchPosts();

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then((json) => (initialState = json));

// const initialState = [
//   {
//     id: 1,
//     title: 'title1',
//     content: 'content1',
//   },
//   {
//     id: 2,
//     title: 'title2',
//     content: 'content2',
//   },
// ];

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

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
      // Adding date and reactions
      // let min = 1;
      // const loadedPosts = action.payload.map((post) => {
      //   return post;
      // });

      // console.log(loadedPosts)
      // Add any fetched posts to the array
      // state.posts = state.posts.concat(loadedPosts);
      state.posts = action.payload;
    });
  },
});

// 匯出資料(posts名稱是配合store的reducer)
export const selectAllPosts = (state) => state.posts.posts;


// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;


// state 代表 store 中所有的 reducer
// 所有的 reducer 都集中在 store
// export const selectAllUsers = (state) => state.users;

// acitons 為自動產生
export const { postAdded } = postsSlice.actions;

// 匯出 reducer 供 store 使用
export default postsSlice.reducer;
