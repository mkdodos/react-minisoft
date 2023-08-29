import React from 'react';
import { useParams } from 'react-router-dom';

export default function SinglePostPage() {
  const { postId } = useParams();
  return <div>SinglePostPage{postId}</div>;
}
