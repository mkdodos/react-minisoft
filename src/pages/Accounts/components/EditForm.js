import { Form, Button } from 'semantic-ui-react';
export default function EditForm(props) {
  function handleChange(event) {
    this.setState({ value: event.target.value });
  }
  return (
    <Form>
      <Form.Group>
        <Form.Field>
          <label>名稱</label>
          <input
            placeholder="First Name"
            value={props.row.name}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>餘額</label>
          <input
            placeholder="Last Name"
            value={props.row.balance}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>類型</label>
          <input           
            value={props.row.type}
            onChange={handleChange}
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
