import React from 'react';
import { Label, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { fetchMoreData } from './balancesSlice';

export default function RowsCountBanner({
  rows,
  rowsCopy,
  limit,
  lastDoc,
  status,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <Label circular color="pink" basic>
        {rowsCopy.length}
      </Label>{' '}
      /{' '}
      <Label circular color="pink">
        {rows.length}
      </Label>
      <span
        style={{ fontWeight: 'bold', marginLeft: '10px', fontSize: '1.1em' }}
      >
        筆
      </span>
      <Button
        loading={status == 'loading'}
        disabled={status == 'loading'}
        color="pink"
        floated="right"
        onClick={() => dispatch(fetchMoreData({ limit, lastDoc }))}
      >
        More
      </Button>
    </div>
  );
}
