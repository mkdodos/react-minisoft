import React, { useEffect, useState } from 'react';
import { Button, Input, Divider, Statistic, Segment } from 'semantic-ui-react';
import { db_money2022 as db } from '../../utils/firebase';
import numberFormat from '../../utils/numberFormat';
import DataList from './components/DataList';
import SectionDropdown from './components/Section/components/SectionDropdown';

export default function Index() {
  // *************資料************
  // 篩選用期數
  const [section, setSection] = useState('');
  // 最新期數
  const [newestSection, setNewestSection] = useState('');
  // 本地資料(顯示用)
  const [localData, setLocalData] = useState([]);
  // 本地資料(篩選用)
  const [localDataCopy, setLocalDataCopy] = useState([]);
  // 使用者
  const user = localStorage.getItem('user');
  // 帳戶
  const [accountId, setAccountId] = useState('');
  // 當期總金額
  const [total, SetTotal] = useState(0);

  // *************方法************
  // 查詢
  const handleFilter = (e, { value }) => {
    const section = value;
    setSection(section);
    // console.log(section)
    // return;
    // 本地篩選
    let rows = localDataCopy.filter((item) => item.section.includes(section));

    // 有查到本地資料
    if (rows.length > 0) {
      let total = 0;
      rows.map((row) => {
        total += Number(row.expense);
      });
      SetTotal(total);
      setLocalData(rows);
      console.log('local');
    } else {
      // 沒查到本地資料
      // 從遠端查詢
      db.collection('balances')
        .where('section', '==', section)
        // .orderBy('expense','desc')
        .get()
        .then((snapshot) => {
          if (snapshot.size > 0) {
            // 有查到
            let total = 0;
            let data = snapshot.docs.map((doc) => {
              let d = doc.data();
              total += Number(d.expense);
              return { ...doc.data(), id: doc.id };
            });
            // 排序
            data = data.sort((a, b) => {
              return a.expense * 1 < b.expense * 1 ? 1 : -1;
            });

            SetTotal(total);
            // 將資料存入本地
            setLocalDataCopy([...localDataCopy, ...data]);
            // 顯示剛從遠端取得的資料

            setLocalData(data);
            console.log('有查到');
          }
          // 沒查到
          else {
            console.log('無');
            setLocalData([{ id: '1', title: '查無資料' }]);
          }
        });
      // console.log('no');
    }
    // console.log(localData)
  };

  // 取得遠端資料
  const fetchRemoteData = () => {
    db.collection('sections')
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const section = snapshot.docs[0].data().section;
        setSection(section);
        // setNewestSection(section);
        db.collection('balances')
          .where('section', '==', section)
          .get()
          .then((snapshot) => {
            let total = 0;
            let data = snapshot.docs.map((doc) => {
              let d = doc.data();
              total += Number(d.expense);
              return { ...d, id: doc.id };
            });

            // 排序
            data = data.sort((a, b) => {
              return a.expense * 1 < b.expense * 1 ? 1 : -1;
            });

            // 將資料存入本地
            setLocalData(data);
            setLocalDataCopy(data);
            SetTotal(total);
            // console.log(data);
          });
      });
  };
  // 設定 section
  // const handleSectionChange = (e,{value}) => {
  //   console.log(value)
  //   setSection(value);
  // };

  useEffect(() => {
    console.clear();
    // fetchNewestSection();
    fetchRemoteData();
  }, []);
  return (
    <div>
      <SectionDropdown value={section} onChange={handleFilter} />
      <Segment textAlign="center">
        <Statistic color="blue">
          <Statistic.Value>{numberFormat(total)}</Statistic.Value>
        </Statistic>
      </Segment>

      {/* <Input onChange={handleSectionChange} /> */}
      {/* <Button onClick={handleFilter}>查詢</Button> */}
      <Divider />
      <DataList rows={localData} />
    </div>
  );
}
