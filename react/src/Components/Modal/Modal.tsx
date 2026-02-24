import React, { useState } from "react";
import { Input, Modal, Space } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const ModalWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Space>
        <button
          className="task-button rounded-2 border border-black"
          onClick={() => setIsOpen(true)}
        >
          <PlusOutlined />
        </button>
      </Space>

      <Modal
        title="Введите название проекта"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          console.log("Введено:", inputValue);
          setInputValue("");
          setIsOpen(false);
        }}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Создать"
        className="task-modal"
      >
        <Input
          placeholder="Введите название"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalWindow;
