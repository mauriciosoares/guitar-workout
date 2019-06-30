import React from 'react';
import { Modal } from 'antd';

export default function HiddenMetronomeSounds(props) {
  const { visible, closeModal } = props;

  return (
    <Modal
      title="Create Track"
      visible={visible}
      onCancel={closeModal}
      onOk={closeModal}
    >
      :D
    </Modal>
  );
}
