import React, { useEffect, useState } from 'react';
import { Statistic,Segment } from 'semantic-ui-react';
export default function BalanceTotal({ rows }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    rows.map((row) => {
      total += Number(row.balance);
    });
    setTotal(total);
  }, [rows]);
  return (
    <Segment textAlign="center">
      <Statistic>
        <Statistic.Value>{total}</Statistic.Value>
      </Statistic>
    </Segment>
  );
}
