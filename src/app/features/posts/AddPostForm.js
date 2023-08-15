import React, { useState } from 'react';
import { Form,Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

export default function AddPostForm() {
  const dispatch=useDispatch()
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')

  const addPost = ()=>{
    dispatch(postAdded(title,content))
    setTitle('')
    setContent('')
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input value={content} placeholder="Last Name" onChange={(e)=>setContent(e.target.value)} />
        </Form.Field>
       
        <Button type="submit" onClick={addPost}>Submit</Button>
      </Form>
    </div>
  );
}
