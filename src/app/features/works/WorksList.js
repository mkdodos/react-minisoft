import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, getStatus } from './worksSlice';
import WorkCard from './WorkCard';
import { Loader, Dimmer } from 'semantic-ui-react';

import DateSwitch from './DateSwitch';
import { test } from './functions';

export default function WorksList() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);
  const status = useSelector(getStatus);


  test();

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  var date = new Date();

  useEffect(() => {
    const from = date.addDays(-600).toISOString().substring(0, 10);
    const to = date.addDays(0).toISOString().substring(0, 10);
    const dateRange = { from, to };
    dispatch(fetchData(dateRange));
  }, []);

  return (
    <>
      <DateSwitch />
      {status !== 'succeeded' && <Loader active inline="centered" />}
      {rows.map((row) => {
        return <WorkCard row={row} key={row.workID} />;
        // return <li key={row.workID}>{row.workID}-{row.custName}-{row.workNote}</li>;
      })}
    </>
  );
}
