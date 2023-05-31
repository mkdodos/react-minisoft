import React, { useState, useEffect } from 'react';
// import {  } from 'react-router-dom'
import { Container, Form, Grid, Segment, Button } from 'semantic-ui-react';
// import { auth } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const email = React.useRef();
  const password = React.useRef();

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // async function handleLogin(e) {
  //   try {
  //     await login(email.current.value, password.current.value);
  //     history('/spending');
  //   } catch {
  //     setError('login fail');
  //   }
  // }

  const handleLogin = () => {
       localStorage.setItem('login',true)
       navigate('/notebook')
  };
  useEffect(()=>{
    let login = localStorage.getItem('login')
    if(login){
      navigate('/notebook')
    }
  },[])
  return (
    <Container>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input ref={email} defaultValue="mkdodos@gmail.com"></input>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input ref={password} defaultValue="123456"></input>
                </Form.Field>
                <Button onClick={handleLogin}>登入</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
