import React, { useEffect, useState } from 'react';
import { Statistic, Grid } from 'semantic-ui-react';
import { db_money2022 as db } from '../../../../utils/firebase';

import numberFormat from '../../../../utils/numberFormat';

import { useSelector,useDispatch } from 'react-redux';
import { fetchAccounts, selectAccounts } from '../mortgagesSlice';

export default function BalanceView() {
  // 
  const dispatch = useDispatch();
  // 資料
  const accounts = useSelector(selectAccounts);

  const [rows, setRows] = useState([]);

  // 取得資料
  useEffect(() => {
    // firebase 集合
    // const dbCol = db.collection('mortgageAccounts');
    // dbCol.get().then((snapshot) => {
    //   const data = snapshot.docs.map((doc) => {
    //     return { ...doc.data(), id: doc.id };
    //   });

    //   setRows(data);      
    // });

    dispatch(fetchAccounts());
    

    
    console.log(accounts[0].amt)
  }, []);

  return (
    <>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={5}>
            <Statistic color="grey" size="tiny">
              <Statistic.Value>{numberFormat(accounts[0].amt)}</Statistic.Value>
              {/* <Statistic.Label>A</Statistic.Label> */}
            </Statistic>
          </Grid.Column>

          <Grid.Column width={5}>
            <Statistic color="grey" size="tiny">
              <Statistic.Value>{numberFormat(accounts[1].amt)}</Statistic.Value>
              {/* <Statistic.Label>B</Statistic.Label> */}
            </Statistic>
          </Grid.Column>
          <Grid.Column width={3}>
            <Statistic size="tiny">
              <Statistic.Value>
                {numberFormat(accounts[0]?.amt + accounts[1]?.amt)}
              </Statistic.Value>
              {/* <Statistic.Label>B</Statistic.Label> */}
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
