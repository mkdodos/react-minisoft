import React,{useState} from 'react';
import { Button } from 'semantic-ui-react';
import EditForm from './components/EditForm';


export default function Index() {
  // 編輯表單顯示隱藏
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    setOpen(true);
    // setRowIndex(-1);
  };
  return (
    <div>
      <Button primary onClick={handleAdd}>新增</Button>
      <EditForm open={open} setOpen={setOpen} />
    </div>
  );
}
