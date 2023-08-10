import React from 'react';
import { Segment, Divider, Header } from 'semantic-ui-react';

export default function Result({ result }) {
  const { describe, action } = result;
  return (
    <>
      <Segment color="blue">
        {describe}
        <Divider />
        <Header as="h5">{action}</Header>
      </Segment>
    </>
  );
}
