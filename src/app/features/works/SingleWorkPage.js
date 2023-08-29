import React from 'react'
import { useParams } from 'react-router-dom'


export default function SingleWorkPage() {
  const {workId}=useParams();
  return (
    <div>SingleWorkPage
      {workId}
    </div>
  )
}
