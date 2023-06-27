import React, { useEffect, useState } from 'react';
import { Button, Input, Divider } from 'semantic-ui-react';
import { db_money2022 as db } from '../../utils/firebase';
import DataList from './components/DataList';

export default function Index() {
  // *************資料************
  // 期數
  const [section, setSection] = useState('');
  // 本地資料
  const [localData, setLocalData] = useState([]);
  const [localDataCopy, setLocalDataCopy] = useState([]);
  // *************方法************
  // 查詢
  const handleFilter = () => {
    // return;
    // 本地篩選
    let rows = localDataCopy.filter((item) => item.section.includes(section));

    // 有查到
    if (rows.length > 0) {
      setLocalData(rows);
      console.log('local');
    } else {
      // 沒查到
      db.collection('sections')
        .where('section', '==', section)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            console.log(doc.data());
            return { ...doc.data(), id: doc.id };
          });
          // 將資料存入本地

          // setLocalData([...localData, ...data]);
          setLocalDataCopy([...localDataCopy, ...data]);

          // 做篩選
          // let rows = localDataCopy.filter((item) =>
          //   item.section.includes(section)
          // );

          setLocalData(data);

          console.log('加入');
        });
      // console.log('no');
    }
    // console.log(localData)
  };

  // 取得遠端資料
  const fetchRemoteData = () => {
    db.collection('sections')
      .where('section', '==', '11206')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        // 將資料存入本地
        setLocalData(data);
        setLocalDataCopy(data);
        console.log(data);
      });
  };
  // 設定 section
  const handleSectionChange = (e) => {
    // console.log(e.target.value)
    setSection(e.target.value);
  };
  useEffect(() => {
    // console.clear();

    fetchRemoteData();
  }, []);
  return (
    <div>
      <Input onChange={handleSectionChange} />
      <Button onClick={handleFilter}>查詢</Button>
      <Divider />
      <DataList rows={localData} />
    </div>
  );
}
