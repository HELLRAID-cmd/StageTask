import { useState } from "react";
import { useTasks } from "../Context/ContextTask";
import { Input, Modal } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ButtonCreateTask = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [errLength, setErrLength] = useState(false);

  const { createTask } = useTasks();

  const handleCreate = () => {
    if (!inputValueName.trim()) return;

    if (inputValueName.length >= 50) {
      setErrLength(true);
      return;
    }

    // Создание задачи
    createTask(inputValueName.trim(), projectId);

    setInputValueName("");
    setErrLength(false);
    setOpen(false);
  };

  return (
    <>
      <button
        className="project-item__button"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
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
        {errLength && <p className=" text-danger">Слишком большой текст!</p>}
        <Input
          id="name"
          placeholder="Введите название"
          value={inputValueName}
          className="mb-3"
          onChange={(e) => setInputValueName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ButtonCreateTask;
