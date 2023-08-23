import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectData } from './worksSlice';
import WorkCard from './WorkCard';

export default function WorksList() {
  const dispatch = useDispatch();
  const rows = useSelector(selectData);
  // const url = 'http://server2000:8888/pdo-salary/works/read.php';
  // const fetchData = async () => {
  //   const response = await axios.get(url, {
  //     params: { from: '2022-01-01', to: '2022-02-02' },
  //   });
  //   console.log(response.data)
  // };

  //

  useEffect(() => {
    dispatch(fetchData());
    // console.log(rows);
  }, []);

  // fetchData()

  return (
    <>
      {rows.map((row) => {
        return <WorkCard row={row} key={row.workID} />;
        // return <li key={row.workID}>{row.workID}-{row.custName}-{row.workNote}</li>;
      })}
    </>
  );
}
