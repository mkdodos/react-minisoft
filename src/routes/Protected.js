import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate()
  useEffect(()=>{
    let user = localStorage.getItem('user')
    // console.log(login)
    if(!user){
      navigate('/login')
    }

  })
  return (
    <div>
      <Component />
    </div>
  );
}
