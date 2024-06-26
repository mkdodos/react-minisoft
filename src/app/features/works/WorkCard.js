import React, { useState } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import WorkModal from './WorkModal';

export default function WorkCard({ row, dateFrom, dateTo }) {
  const navigate = useNavigate();
  // console.log(dateFrom)
  const handleWorkIdClick = () => {
   
    setOpen(true)
  };

  const [open,setOpen]=useState(false)
  return (
    <Card centered>
      <Card.Content>
        <Card.Header>
          {' '}
          {/* <Link to="/works" state={{ dateFrom, dateTo }}>Works</Link> */}
          {/* <button onClick={() => navigate(-1)}>Back</button> */}
          {row.custName} <WorkModal row={row} open={open} setOpen={setOpen} />
          <Label onClick={handleWorkIdClick} color="blue" attached="top right">
            {row.workId}
          </Label>
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
