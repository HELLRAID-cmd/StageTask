import { useState } from "react";
import { useTasks } from "../Context/ContextTask";
import { Input, Modal } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { MAX_TASK_TEXT } from "../Utils/Settings";

const ButtonCreateTask = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [errLength, setErrLength] = useState(false);
  const [createdData, setCreatedData] = useState<number | null>(null);

  const { createTask } = useTasks();

  const openModal = () => {
    setCreatedData(Date.now());
    setOpen(true);
  };

  const handleCreate = () => {
    if (!inputValueName.trim()) return;

    if (inputValueName.length >= 40) return;

    const createdAt = Date.now();

    // Создание задачи
    createTask(inputValueName.trim(), projectId, createdAt);

    setInputValueName("");
    setErrLength(false);
    setOpen(false);
  };

  return (
    <>
      <button
        className="project-item__button"
        type="button"
        onClick={openModal}
      >
        <PlusCircleOutlined style={{ fontSize: "24px" }} />
      </button>
      <Modal
        title="Введите название задачи"
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Создать"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
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
        {inputValueName.length >= MAX_TASK_TEXT && (
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
        <p className="task-modal__data text-dark fw-light">
          Дата создания будет:{" "}
          {createdData ? new Date(createdData).toLocaleString("ru-RU") : "-"}
        </p>
      </Modal>
    </>
  );
};

export default ButtonCreateTask;
