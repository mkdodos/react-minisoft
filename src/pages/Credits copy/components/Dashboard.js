import React, { useEffect, useState } from 'react';
import { Button, Header, Statistic, Segment } from 'semantic-ui-react';
import numberFormat from '../../../utils/numberFormat';

export default function Dashboard({ rows }) {
  const [total, setTotal] = useState(0);
  // 計算加總
  const calTotal = () => {
    let sum = 0;
    rows.map((row) => {
      // sum += Number(row.amt);
      sum += Number(row.expense);
    });
    setTotal(sum);
  };

  // 資料有變動就重新計算
  useEffect(() => {
    calTotal();
  }, [rows]);

  return (
    <>
      <Segment textAlign="center">
        <Statistic color="blue">
          <Statistic.Value>{numberFormat(total)}</Statistic.Value>
        </Statistic>
      </Segment>
     
    </>
  );
}
