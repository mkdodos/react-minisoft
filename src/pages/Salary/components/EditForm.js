import React from 'react'
import { Modal,Form,Button } from 'semantic-ui-react';

export default function EditForm({setOpen,row,setRow,loading,open}) {
  // 修改本薪同時更新大小月金額
  const handleChangeBasic = (e) => {
    setRow({
      ...row,
      basic: e.target.value,
      bigM: Math.round(e.target.value / 30),
    });

    console.log(row);
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

 


  return (
    <div>
      <Modal
        open={open}
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
                  onChange={handleChangeBasic}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>大小月</label>
                <input
                  type="number"
                  value={row.bigM}
                  onChange={(e) => {
                    setRow({ ...row, bigM: e.target.value });
                  }}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>職務加給</label>
                <input
                  type="number"
                  value={row.job}
                  onChange={(e) => {
                    setRow({ ...row, job: e.target.value });
                  }}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>技術加給</label>
                <input
                  type="text"
                  value={row.tech}
                  onChange={(e) => {
                    setRow({ ...row, tech: e.target.value });
                  }}
                ></input>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>伙食津貼</label>
                <input
                  type="number"
                  value={row.food}
                  onChange={(e) => {
                    setRow({ ...row, food: e.target.value });
                  }}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>全勤</label>
                <input
                  type="number"
                  value={row.full}
                  onChange={(e) => {
                    setRow({ ...row, full: e.target.value });
                  }}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>無過失</label>
                <input
                  type="number"
                  value={row.error}
                  onChange={(e) => {
                    setRow({ ...row, error: e.target.value });
                  }}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>績效</label>
                <input
                  type="number"
                  value={row.effect}
                  onChange={(e) => {
                    setRow({ ...row, effect: e.target.value });
                  }}
                ></input>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>加班分鐘</label>
                <input
                  type="number"
                  value={row.mins}
                  onChange={(e) => {
                    setRow({ ...row, mins: e.target.value });
                  }}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>請假時數</label>
                <input
                  type="number"
                  value={row.offHours}
                  onChange={(e) => {
                    setRow({ ...row, offHours: e.target.value });
                  }}
                ></input>
              </Form.Field>
              <Form.Field>
                <label>其他扣款</label>
                <input
                  type="number"
                  value={row.minus}
                  onChange={(e) => {
                    setRow({ ...row, minus: e.target.value });
                  }}
                ></input>
              </Form.Field>

              <Form.Field>
                <label>育嬰津貼</label>
                <input
                  type="number"
                  value={row.others}
                  onChange={(e) => {
                    setRow({ ...row, others: e.target.value });
                  }}
                ></input>
              </Form.Field>
            </Form.Group>
            {/* 特休 */}
            <Form.Group>
              <Form.Field>
                <label>特休</label>
                <input
                  type="number"
                  value={row.spHours}
                  onChange={(e) => {
                    setRow({ ...row, spHours: e.target.value });
                  }}
                ></input>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            loading={loading}
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
  )
}
