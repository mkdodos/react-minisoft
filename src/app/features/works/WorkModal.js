import React from 'react'
import { Modal } from 'semantic-ui-react'
import ArrdonesByWorkId from './ArrdonesByWorkId'

export default function WorkModal({open,setOpen,row}) {
  return (
    <div>
      <Modal open={open} closeIcon onClose={()=>setOpen(false)}>
        <Modal.Header>{row.workId}</Modal.Header>
        <Modal.Content>
          <ArrdonesByWorkId workId={row.workId}/>
        </Modal.Content>
      </Modal>
    </div>
  )
}
