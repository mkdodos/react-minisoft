import React from 'react';
import DataRow from './DataRow';
import { List } from 'semantic-ui-react';

export default function DataView({ rows, rowDispatch, rowsDispatch }) {
  return (
    <div>
      <List divided verticalAlign='middle'>
        {rows.map((row, index) => {
          return (
            <DataRow
              rowDispatch={rowDispatch}
              rowsDispatch={rowsDispatch}
              // onClick={() => {
              //   rowDispatch({ type: 'EDIT', payload: row });
              // }}
              key={row.id}
              row={row}
              index={index}
            />
          );
        })}
      </List>
    </div>
  );
}
