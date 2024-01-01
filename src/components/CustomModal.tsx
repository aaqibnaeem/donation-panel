import React from "react";
import { Modal } from "antd";
import { CustomModalInterface } from "../interfaces/interfaces";

const CustomModal: React.FC<CustomModalInterface> = ({
  isVisible,
  handleOk,
  handleCancel,
  children,
  title,
  isLoading,
  width,
}) => {
  return (
    <Modal
      width={width && width}
      title={title}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
