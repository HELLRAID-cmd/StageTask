import React, { useState } from "react";
import { Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import type { ModalWindowProps } from "../../shared/props/type";
import { useNavigate } from "react-router-dom";
import { MAX_PROJECT_DESC, MAX_PROJECT_NAME } from "../Utils/Settings";
import { useProject } from "../Context/Project/ProjectContext";

const ModalWindow: React.FC<ModalWindowProps> = ({ open, onClose }) => {
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDesc, setInputValueDesc] = useState("");
  const [errLength, setErrLength] = useState(false);

  const { createProject } = useProject();
  const navigate = useNavigate();

  const handleCreate = () => {
    createProject({
      title: inputValueName,
      desc: inputValueDesc,
      createdAt: Date.now(),
      preview: "",
    });

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
          handleCreate();
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
      </Modal>
    </>
  );
};

export default ModalWindow;
