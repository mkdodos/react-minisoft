import React from 'react';
import { Modal,Form,Button} from 'semantic-ui-react';

export default function EditForm({ open, setOpen,row }) {
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeIcon
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Form>
           
            <Form.Field>
              <label>名稱</label>
              <input type="text" name="name" value={row.name}/>
            </Form.Field>
            <Form.Field>
              <label>現價</label>
              <input type="number" name="price"  value={row.price}/>
            </Form.Field>
            <Button primary fluid type="submit">
              儲存
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {/* <Button primary onClick={handleSave}>
            儲存
          </Button>
          <Button floated="left" color="red" onClick={handleDelete}>
            刪除
          </Button> */}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
