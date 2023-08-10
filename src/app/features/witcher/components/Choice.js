import React, { useState } from 'react';
import { List, Button, Grid, Divider, Segment } from 'semantic-ui-react';
import Result from './Result';

export default function Choice({ choice, result,setAnswer,answer }) {
  // const [flag, setFlag] = useState(0);
  console.log(result);
  return (
    <>
      <Segment basic textAlign="center">
        <Button fluid color="teal" onClick={() => setAnswer('a')}>
          {choice.a}
        </Button>
        <Divider horizontal>Or</Divider>
        <Button fluid color="pink" onClick={() => setAnswer('b')}>
          {choice.b}
        </Button>
      </Segment>
      {answer !== '' && <Result result={answer == 'a' ? result.a : result.b} />}
    </>
  );
}
