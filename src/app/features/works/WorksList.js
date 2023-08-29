import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData, getStatus } from './worksSlice';
import WorkCard from './WorkCard';
import { Loader,Dimmer } from 'semantic-ui-react';

export default function WorksList() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  // console.log(status);
  // fetchData()

  return (
    <>
      {status !== 'succeeded' && (
        <Loader active inline='centered' />
        // <Dimmer active>
        //   <Loader content="Loading" />
        // </Dimmer>
      )}
      {rows.map((row) => {
        return <WorkCard row={row} key={row.workID} />;
        // return <li key={row.workID}>{row.workID}-{row.custName}-{row.workNote}</li>;
      })}
    </>
  );
}
