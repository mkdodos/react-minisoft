import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List } from 'semantic-ui-react';
import PostAuthor from './PostAuthor';

export default function PostsExcerpt({ post }) {
  return (
    <div>
      <List.Item key={post.id}>
        <List.Content>
          <List.Header>{post.title}</List.Header>
          <List.Description>
            {post.body.substring(0,20)} 
            <PostAuthor userId={post.userId} />
          </List.Description>
        </List.Content>
      </List.Item>
     

      <Link to={`post/${post.id}`}>View Post</Link>
      <Divider/>
    </div>
  );
}
