import React, { useState } from "react";
import { Input, Modal, Space } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const ModalWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [color, setColor] = useState("");

  const colors = [
    { id: "primary", colorCode: "#0d6efd" },
    { id: "primary-subtle", colorCode: "#cfe2ff" },
    { id: "secondary", colorCode: "#6c757d" },
    { id: "secondary-subtle", colorCode: "#e2e3e5" },
    { id: "success", colorCode: "#198754" },
    { id: "success-subtle", colorCode: "#d1e7dd" },
    { id: "warning", colorCode: "#ffc107" },
    { id: "warning-subtle", colorCode: "#fff3cd" },
    { id: "info", colorCode: "#0dcaf0" },
    { id: "info-subtle", colorCode: "#cff4fc" },
    { id: "body-secondary", colorCode: "#6c757d" },
    { id: "body-tertiary", colorCode: "#adb5bd" },
  ];

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
        title="Создание проекта"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Создать"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onOk={() => {
          console.log("Введено:", inputValueName, inputValueDesc, color);
          setInputValueName("");
          setIsOpen(false);
        }}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
      >
        <label htmlFor="name" className="mb-2">
          Название
        </label>
        <Input
          id="name"
          placeholder="Введите название"
          value={inputValueName}
          className="mb-3"
          onChange={(e) => setInputValueName(e.target.value)}
        />
        <label htmlFor="desc" className="mb-2">
          Описание
        </label>
        <Input
          id="desc"
          placeholder="Введите название"
          value={inputValueDesc}
          className="mb-3"
          onChange={(e) => setInputValueDesc(e.target.value)}
        />
        <label htmlFor="color" className="mb-2">
          Цвет
        </label>
        <div className="task-list-color d-flex justify-content-between gap-1">
          {colors.map((c) => (
            <span
              key={c.id}
              onClick={() => setColor(c.id)}
              className={`task-color icon-link-hover`}
              style={{
                border: `5px solid ${c.colorCode}`,
                backgroundColor: color === c.id ? c.colorCode : "transparent",
              }}
            ></span>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
