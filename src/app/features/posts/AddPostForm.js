import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

export default function AddPostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const users = useSelector(selectAllUsers);
  console.log(users);

  const userOptions = users.map((user) => (
    <option key={user.id}>{user.name}</option>
  ));

  const addPost = () => {
    dispatch(postAdded(title, content));
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <select>{userOptions}</select>
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="First Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            value={content}
            placeholder="Last Name"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Field>

        <Button type="submit" onClick={addPost}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
