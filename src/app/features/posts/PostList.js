import React, { useEffect } from 'react';
import {
  selectAllPosts,
  postAdded,
  fetchPosts,
  getPostsStatus,
  getPostsError,
} from './postsSlice';
import { List } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import PostAuthor from './PostAuthor';
import AddPostForm from './AddPostForm';

export default function PostList() {
  // const posts = useSelector(selectAllPosts);
  // const posts = useSelector(selectAllUsers);

  // const postStatus = useSelector(getPostsStatus);s

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, []);


  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);


  const title = '111';
  const content = '222';
  console.log(posts);
  return (
    <div>
      {/* <button onClick={() => dispatch(postAdded(row))}>ADD</button> */}
      {/* <button onClick={() => dispatch(postAdded(title,content))}>ADD</button> */}
      <AddPostForm />

      <List divided>
        {posts.map((post) => {
          return (
            <List.Item key={post.id}>
              <List.Content>
                <List.Header as="a">{post.title}</List.Header>
                <List.Description as="a">
                  {post.body} {post.id}
                  <PostAuthor userId={post.userId}/>
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
