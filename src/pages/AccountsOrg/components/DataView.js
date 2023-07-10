import React from 'react';
import DataRow from './DataRow';

export default function DataView({ rows, rowDispatch,rowsDispatch }) {
  return (
    <div>
      {rows.map((row,index) => {
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
    </div>
  );
}
