import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { actions } from '../actions';

export default function EditForm({ state, dispatch }) {
  // 修改本薪同時更新大小月金額
  const handleChangeBasic = (e) => {
    // setRow({
    //   ...row,
    //   basic: e.target.value,
    //   bigM: Math.round(e.target.value / 30),
    // });
    // console.log(row);
  };

  const handleDelete = () => {
    // if (!confirm('確定刪除嗎?')) return;
    // setLoading(true);
    // axios.post(url.salary.delete, { id: row.id }, { headers }).then((res) => {
    // setRows(rows.filter((obj) => obj.id !== row.id));
    // handleQuery();
    // setOpen(false);
    // setLoading(false);
    // });
  };

  const handleInputChange = (e) => {
    dispatch({
      type: actions.INPUT_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const { row, isModalOpen,isLoading } = state;

  return (
    <div>
      <Modal
        open={isModalOpen}
        closeIcon
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>{row.name}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field>
                <label>本薪</label>
                <input
                  type="number"
                  value={row.basic}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>大小月</label>
                <input
                  type="number"
                  name="bigM"
                  value={row.bigM}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>職務加給</label>
                <input
                  type="number"
                  name="job"
                  value={row.job}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>技術加給</label>
                <input
                  type="text"
                  name="tech"
                  value={row.tech}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>伙食津貼</label>
                <input
                  type="number"
                  name="food"
                  value={row.food}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>全勤</label>
                <input
                  type="number"
                  name="full"
                  value={row.full}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>無過失</label>
                <input
                  type="number"
                  name="error"
                  value={row.error}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>績效</label>
                <input
                  type="number"
                  name="effect"
                  value={row.effect}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>加班分鐘</label>
                <input
                  type="number"
                  name="mins"
                  value={row.mins}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>請假時數</label>
                <input
                  type="number"
                  name="offHours"
                  value={row.offHours}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>其他扣款</label>
                <input
                  type="number"
                  name="minus"
                  value={row.minus}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>育嬰津貼</label>
                <input
                  type="number"
                  name="others"
                  value={row.others}
                  onChange={handleInputChange}
                  
                ></input>
              </Form.Field>
            </Form.Group>
            {/* 特休 */}
            <Form.Group>
              <Form.Field>
                <label>特休</label>
                <input
                  type="number"
                  name="spHours"
                  value={row.spHours}
                  onChange={handleInputChange}
                ></input>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            loading={isLoading}
            color="red"
            floated="left"
            onClick={handleDelete}
          >
            刪除
          </Button>
          {/* <Button primary onClick={handleSave} loading={loading}>
            儲存
          </Button> */}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
