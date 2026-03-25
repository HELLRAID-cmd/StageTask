import { Input, Modal } from "antd";
import { useState } from "react";
import { useTasks } from "../../Context/ContextTask";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { MAX_TASK_TEXT } from "../../Utils/Settings";

const TaskEdit = ({ input, taskId }: { input: string; taskId: string }) => {
  const [inputTask, setInputTask] = useState(input);
  const [open, setOpen] = useState(false);
  const { updateTaskTitle, setEditTaskId } = useTasks();
  const [errLength, setErrLength] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleSave = () => {
    if (inputTask.length >= MAX_TASK_TEXT) return;

    updateTaskTitle(taskId, inputTask);
    setEditTaskId(null);
    setErrLength(false);
    setOpen(false);
  };

  return (
    <>
      <button
        className="task-item__btns-infotask-item__icon task-item__icon-edit"
        onClick={openModal}
      >
        <EditOutlined className="task-item__icon task-item__icon--edit" />
      </button>
      <Modal
        title="Изменение задачи"
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Изменить"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
        onOk={() => {
          handleSave();
        }}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
      >
        {inputTask.length >= MAX_TASK_TEXT && (
          <p className="text-danger">Слишком большой текст!</p>
        )}
        <Input
          id="name"
          placeholder="Введите название"
          value={inputTask}
          onChange={(e) => {
            setInputTask(e.target.value);
            if (errLength) setErrLength(false);
          }}
          onPressEnter={handleSave}
          onBlur={handleSave}
        />
      </Modal>
    </>
  );
};

export default TaskEdit;
