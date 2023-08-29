import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function WorkCard({ row }) {
  return (
    <Card centered>
      <Card.Content>
        <Card.Header>
          {' '}
          {row.custName}{' '}
          <Link to={`/work/${row.workID}`}>
            {' '}
            <Label color="blue" attached="top right">
              {row.workID}
            </Label>
          </Link>{' '}
        </Card.Header>
        <Card.Meta></Card.Meta>
        <Card.Description></Card.Description>
        <Card.Description>{row.workName}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Label circular>{row.size1}</Label>X
          <Label circular>{row.size2}</Label>
          {row.size3 != '' && 'X'}
          {row.size3 != '' && <Label circular>{row.size3}</Label>}
        </a>
        <Icon name="ellipsis horizontal" />
        <Label color="teal">{row.inQty}支</Label>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>{row.workNote}</Card.Description>
      </Card.Content>
    </Card>
  );
}
