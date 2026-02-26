import React, { useState } from "react";
import { Input, Modal, Space } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import Colors from "./Colors";

const ModalWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [color, setColor] = useState("");

  const { createProject, projects } = useProjects();

  const handleOk = () => {
    createProject(inputValueName, inputValueDesc, color);
    setInputValueName("");
    setInputValueDesc("");
    setIsOpen(false);
    console.log(projects);
  };

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
          handleOk();
          setIsOpen(false);
          console.log("Введено:", inputValueName, inputValueDesc, color);
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
                backgroundColor: color === c.colorCode ? c.colorCode : "transparent",
              }}
            ></span>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
