import React, { useEffect, useState } from 'react';
import { Statistic, Grid } from 'semantic-ui-react';
import { db_money2022 as db } from '../../../../utils/firebase';

import numberFormat from '../../../../utils/numberFormat';

export default function BalanceView() {
  const [rows, setRows] = useState([]);

  // 取得資料
  useEffect(() => {
    // firebase 集合
    const dbCol = db.collection('mortgageAccounts');
    dbCol.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setRows(data);
    });
  }, []);

  return (
    <>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={5}>
            <Statistic color="grey" size="tiny">
              <Statistic.Value>{numberFormat(rows[0]?.amt)}</Statistic.Value>
              {/* <Statistic.Label>A</Statistic.Label> */}
            </Statistic>
          </Grid.Column>

          <Grid.Column width={5}>
            <Statistic color="grey" size="tiny">
              <Statistic.Value>{numberFormat(rows[1]?.amt)}</Statistic.Value>
              {/* <Statistic.Label>B</Statistic.Label> */}
            </Statistic>
          </Grid.Column>
          <Grid.Column width={3}>
            <Statistic size="tiny">
              <Statistic.Value>
                {numberFormat(rows[0]?.amt + rows[1]?.amt)}
              </Statistic.Value>
              {/* <Statistic.Label>B</Statistic.Label> */}
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
