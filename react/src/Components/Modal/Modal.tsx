import React, { useState } from "react";
import { Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import Colors from "./Colors";
import TextArea from "antd/es/input/TextArea";
import type { ModalWindowProps } from "../Utils/type";
import { useNavigate } from "react-router-dom";
import { MAX_PROJECT_DESC, MAX_PROJECT_NAME } from "../Utils/Settings";

const ModalWindow: React.FC<ModalWindowProps> = ({ open, onClose }) => {
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [errLength, setErrLength] = useState(false);
  const [color, setColor] = useState("");

  const { createProject } = useProjects();
  const navigate = useNavigate();

  const handleOk = () => {
    if (!inputValueName.trim() || !color) return;

    if (
      inputValueName.length >= MAX_PROJECT_NAME ||
      inputValueDesc.length >= MAX_PROJECT_DESC
    )
      return;

    createProject(inputValueName, inputValueDesc, color);
    setInputValueName("");
    setInputValueDesc("");
    navigate("/myProject");
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
        {inputValueName.length >= MAX_PROJECT_NAME && (
          <p className="text-danger">Слишком большой текст!</p>
        )}
        <Input
          id="name"
          placeholder="Введите название"
          value={inputValueName}
          className="mb-3"
          onChange={(e) => {
            setInputValueName(e.target.value);
            if (errLength) setErrLength(false);
          }}
        />
        <label htmlFor="desc" className="mb-2">
          Описание
        </label>
        {inputValueDesc.length >= MAX_PROJECT_DESC && (
          <p className="text-danger">Слишком большой текст!</p>
        )}
        <TextArea
          id="desc"
          placeholder="Введите описание"
          value={inputValueDesc}
          className="mb-3"
          onChange={(e) => {
            setInputValueDesc(e.target.value);
            if (errLength) setErrLength(false);
          }}
          maxLength={100}
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
