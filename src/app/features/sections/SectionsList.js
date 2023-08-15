import React, { useEffect, useState } from 'react';
// import { db_money2022 as db } from '../../../utils/firebase';
import {
  fetchSections,
  getSectionsStatus,
  getAllSections,
} from './sectionsSlice';
import { useSelector, useDispatch } from 'react-redux';
export default function SectionsList() {
  // const [rows, setRows] = useState([]);

  const status = useSelector(getSectionsStatus);
  const sections = useSelector(getAllSections);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchSections());
    }
  }, []);

  return (
    <div>
      <ul>
        {sections.map((row) => {
          return <li key={row.id}>{row.section}</li>;
        })}
      </ul>
    </div>
  );
}
