import { db_money2022 as db } from '../../utils/firebase';

const dbCol = db.collection('accountsTest');

const fetchData = () => {
  return dbCol
    .limit(5)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return data;
    });
};

const addRow = (row) => {
  return dbCol.add(row).then((doc) => {
    return doc.id;
  });
};

const deleteRow = (id) => {
  dbCol.doc(id).delete();
};

const updateRow = (row,id) => {
  dbCol.doc(id).update(row);
};

export { fetchData, addRow, deleteRow,updateRow };
