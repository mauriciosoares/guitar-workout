import React from 'react';
import { Modal } from 'antd';

export default function HiddenMetronomeSounds(props) {
  const { closeModal } = props;

  return (
    <Modal title="Hidden Stuff" onCancel={closeModal} onOk={closeModal}>
      Something comming here soon!
    </Modal>
  );
}
