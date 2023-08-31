import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, getStatus } from './worksSlice';
import WorkCard from './WorkCard';
import { Loader, Dimmer } from 'semantic-ui-react';

import DateSwitch from './DateSwitch';
import '../../functions/date';

export default function WorksList() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);
  const status = useSelector(getStatus);

  var date = new Date();

  useEffect(() => {
    const dateFrom = date.addDays(-7).toISOString().substring(0, 10);
    const dateTo = date.addDays(0).toISOString().substring(0, 10);
    dispatch(fetchData({ dateFrom, dateTo }));
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
