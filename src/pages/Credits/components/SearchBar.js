import React from 'react';
import { Button, Header, Form, Modal, Input } from 'semantic-ui-react';
import EditForm from './EditForm';
import SectionDropdown from './SectionDropdown';

export default function SearchBar({
  open,
  setOpen,
  rows,
  setRows,
  filter,
  handleFilter,
  handleInputChange,
  handleSectionChange
}) {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
        // trigger={<Button>搜尋</Button>}
      >
        <Modal.Header>篩選表單</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>項目</label>

              <Input
                value={filter.note}
                // placeholder="note"
                onChange={handleInputChange}
                name="note"
                size="small"
              />
            </Form.Field>
            <Form.Field>
              <label>期數</label>
              <SectionDropdown filter={filter} handleSectionChange={handleSectionChange} />  
            </Form.Field>

           
            <Button onClick={handleFilter}>篩選</Button>
          </Form>

       
          {/* <Input
            value={filter.section}
            onChange={handleInputChange}
            name="section"
            size="small"
          /> */}
         
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
