import React, { useState } from 'react';
import { Button, Modal } from 'antd';



const AddressModal: React.FC = ({open,children,setOpen}:any) => {
  
  const [confirmLoading, setConfirmLoading] = useState(false);




  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <div>{children}</div>
      </Modal>
    </>
  );
};

export default AddressModal;