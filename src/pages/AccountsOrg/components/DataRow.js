import React from 'react';

export default function DataRow({ row, index, rowDispatch, rowsDispatch }) {
  return (
    <div>
      [{row.id}]{row.name}--- ({row.prior})
      <button
        onClick={() => {
          rowDispatch({ type: 'EDIT_ROW', payload: { row, index } });
        }}
      >
        edit
      </button>
      <button
        onClick={() => {
          rowsDispatch({ type: 'DELETE_ROW', payload: row.id });
        }}
      >
        del
      </button>
    </div>
  );
}
