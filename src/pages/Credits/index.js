import React, { useEffect, useState } from 'react';
import { Button, Input, Divider } from 'semantic-ui-react';
import { db_money2022 as db } from '../../utils/firebase';
import DataList from './components/DataList';
import SectionDropdown from './components/Section/components/SectionDropdown';

export default function Index() {
  // *************資料************
  // 選擇的期數
  const [section, setSection] = useState('');
  // 最新期數
  const [newestSection, setNewestSection] = useState('');
  // 本地資料(顯示用)
  const [localData, setLocalData] = useState([]);
  // 本地資料(篩選用)
  const [localDataCopy, setLocalDataCopy] = useState([]);

  // *************方法************
  // 查詢
  const handleFilter = (e,{value}) => {
    const section = value;
    // console.log(section)
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
      .orderBy('section', 'desc')
      .get()
      .then((snapshot) => {
        const section = snapshot.docs[0].data().section;
        // setNewestSection(section);
        db.collection('sections')
          .where('section', '==', section)
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
      });
  };
  // 設定 section
  const handleSectionChange = (e,{value}) => {
    console.log(value)
    setSection(value);
  };
  // 取得最新期數
  // const fetchNewestSection = () => {
  //   db.collection('sections')
  //     .orderBy('section', 'desc')
  //     .get()
  //     .then((snapshot) => {
  //       const section = snapshot.docs[0].data().section;
  //       setNewestSection(section);
  //     });
  // };
  useEffect(() => {
    console.clear();
    // fetchNewestSection();
    fetchRemoteData();
  }, []);
  return (
    <div>
      <SectionDropdown onChange={handleFilter} />
      {/* <Input onChange={handleSectionChange} /> */}
      {/* <Button onClick={handleFilter}>查詢</Button> */}
      <Divider />
      <DataList rows={localData} />
    </div>
  );
}
