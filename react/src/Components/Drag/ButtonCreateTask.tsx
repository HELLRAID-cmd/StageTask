import { useState } from "react";
import { Input, Modal } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { DATE_UTILS, MAX_TASK_TEXT } from "../Utils/Settings";
import { useTask } from "../Context/Task/TaskContext";
import Button from "../../shared/ui/button/Button";
import { newDate, newDateWithTime } from "../Utils/Date";

const ButtonCreateTask = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [inputDate, setInputDate] = useState<string>("");
  const [errLength, setErrLength] = useState(false);
  const [createdData, setCreatedData] = useState<number | null>(null);

  const { createTask, now } = useTask();

  const selectedDate = new Date(inputDate).getTime();

  const openModal = () => {
    setCreatedData(Date.now());
    setOpen(true);
  };

  const handleCreate = () => {
    if (!inputValueName.trim()) return;
    if (inputValueName.length >= 40) return;

    const createdAt = Date.now();

    // Создание задачи
    createTask({
      title: inputValueName,
      status: "planned",
      dueData: inputDate,
      projectId: projectId,
      createdAt: createdAt,
      history: [
        {
          id: crypto.randomUUID(),
          type: "created",
          date: createdAt,
        },
      ],
    });
    setInputValueName("");
    setInputDate("");
    setErrLength(false);
    setOpen(false);
  };

  return (
    <>
      <Button className="project-item__task" onClick={openModal} variant="add">
        <PlusCircleOutlined style={{ fontSize: "24px" }} />
      </Button>
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
        <label htmlFor="date" className="mb-2">
          Срок задачи
        </label>
        {selectedDate < now && (
          <p className="text-danger">Неккоректная дата</p>
        )}
        <Input
          id="date"
          type={"date"}
          min={DATE_UTILS.todayISO()}
          placeholder="Введите срок задачи"
          className="mb-3"
          value={inputDate}
          onChange={(e) => {
            setInputDate(e.target.value);
            if (errLength) setErrLength(false);
          }}
        />
        <p className="task-modal__data text-dark fw-light">
          Дата создания будет:{" "}
          {createdData ? newDateWithTime(createdData) : "-"}
        </p>
        <p className="task-modal__data text-dark fw-light">
          Срок задачи до: {inputDate ? newDate(inputDate) : "-"}
        </p>
      </Modal>
    </>
  );
};

export default ButtonCreateTask;
