import React, { useState } from "react";
import { Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import Colors from "./Colors";
import TextArea from "antd/es/input/TextArea";

type ModalWindowProps = {
  open: boolean;
  onClose: () => void;
};

const ModalWindow: React.FC<ModalWindowProps> = ({open, onClose}) => {
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [color, setColor] = useState("");

  const { createProject } = useProjects();

  const handleOk = () => {
    if (!inputValueName.trim() || !color) return;
    createProject(inputValueName, inputValueDesc, color);
    setInputValueName("");
    setInputValueDesc("");
    onClose();
  };

  return (
    <>
      <Modal
        title="Создание проекта"
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Создать"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={onClose}
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
          Название*
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
        <TextArea
          id="desc"
          placeholder="Введите описание"
          value={inputValueDesc}
          className="mb-3"
          onChange={(e) => setInputValueDesc(e.target.value)}
          maxLength={200}
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
