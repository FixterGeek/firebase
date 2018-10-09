import React from 'react'
import { Modal } from 'antd';


const EnrollModal  = ({handleOk, handleCancel, course, open}) => {
    return (
        <Modal 
          title={`Inscribirse en ${course.title}`}
          visible={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
            <h1>Pollollon?</h1>
        </Modal>
        )
}

export default EnrollModal