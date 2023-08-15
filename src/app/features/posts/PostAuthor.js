import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
export default function PostAuthor({ userId }) {
  // 用 userId 取得 username
  const users = useSelector(selectAllUsers);
  // console.log(users)
  const user = users.find(user=>user.id == userId);
  // console.log(user.name);
  return <div>{user ? user.name : 'unknown'}</div>;
}
