import React, { useState } from "react";
import { Input, Modal, Space } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import Colors from "./Colors";

const ModalWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [color, setColor] = useState("");

  const { createProject } = useProjects();

  const handleOk = () => {
    if (!inputValueName.trim() || !color) return;
    createProject(inputValueName, inputValueDesc, color);
    setInputValueName("");
    setInputValueDesc("");
    setIsOpen(false);
  };

  return (
    <>
      <Space>
        <button
          className="task-button"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircleOutlined style={{ fontSize: "40px" }}/>
        </button>
      </Space>

      <Modal
        title="Создание проекта"
        open={isOpen}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Создать"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          handleOk();
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
          {Colors.map((c) => (
            <span
              key={c.id}
              onClick={() => setColor(c.colorCode)}
              className={`task-color icon-link-hover`}
              style={{
                border: `5px solid ${c.colorCode}`,
                backgroundColor:
                  color === c.colorCode ? c.colorCode : "transparent",
              }}
            ></span>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
