import React, { useState, useEffect } from 'react';
// import {  } from 'react-router-dom'
import { Card, Form, Grid, Segment, Button } from 'semantic-ui-react';
// import { auth } from '../utils/firebase';
// import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

export default function Login() {
  // const { login,currentUser } = useAuth();
  const email = React.useRef();
  const password = React.useRef();

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const [currentUser,setCurrentUser]=useState();
  // async function handleLogin(e) {
  //   try {
  //     await login(email.current.value, password.current.value);
  //     navigate('/notebook')
  //   } catch {
  //     setError('login fail');
  //   }
  // }

  const handleLogin = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((userCredential) => {
        // console.log(userCredential)
        localStorage.setItem('login', userCredential.user.email);
        navigate('/notebook');
      });
  };
  useEffect(() => {
    // if(currentUser){
    //   navigate('/notebook')
    // }
    let login = localStorage.getItem('login');
    if (login) {
      navigate('/notebook');
    }
  }, []);
  return (
    <Card fluid>
      <Card.Content textAlign="center" header="Money 2022" />
      <Card.Content>
        <Form size="large" onSubmit={handleLogin}>
          <Form.Field>
            <label>Email</label>
            <input ref={email} defaultValue="mkdodos@gmail.com"></input>
           
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input ref={password} defaultValue="123456"></input>
           
          </Form.Field>
          <Button fluid type="submit" size="large" color="blue">
            登入
          </Button>
        </Form>
      </Card.Content>
     
    </Card>

    // <Container>
    //   <Grid columns={3}>
    //     <Grid.Row>
    //       <Grid.Column></Grid.Column>
    //       <Grid.Column>
    //         <Segment>
    //           <Form>
    //             <Form.Field>
    //               <label>Email</label>
    //               <input ref={email} defaultValue="mkdodos@gmail.com"></input>
    //             </Form.Field>
    //             <Form.Field>
    //               <label>Password</label>
    //               <input ref={password} defaultValue="123456"></input>
    //             </Form.Field>
    //             <Button onClick={handleLogin}>登入</Button>
    //           </Form>
    //         </Segment>
    //       </Grid.Column>
    //       <Grid.Column></Grid.Column>
    //     </Grid.Row>
    //   </Grid>
    // </Container>
  );
}
