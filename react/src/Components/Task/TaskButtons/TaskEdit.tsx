import { Input, Modal } from "antd";
import { useState } from "react";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { MAX_TASK_TEXT } from "../../Utils/Settings";
import { useTask } from "../../Context/Task/TaskContext";
import Button from "../../../shared/ui/button";

const TaskEdit = ({ input, taskId }: { input: string; taskId: string }) => {
  const [inputTask, setInputTask] = useState(input);
  const [open, setOpen] = useState(false);
  const { updateTaskTitle, setEditTaskId, saveHistoryTask } = useTask();
  const [errLength, setErrLength] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const handleSave = () => {
    if (inputTask.length >= MAX_TASK_TEXT) return;

    updateTaskTitle(taskId, inputTask);
    saveHistoryTask(taskId, {
      type: "renamed",
      date: Date.now(),
      oldTitle: input,
      newTitle: inputTask,
    });
    setEditTaskId(null);
    setErrLength(false);
    setOpen(false);
  };

  return (
    <>
      <Button
        className="task-item__btns-infotask-item__icon task-item__icon-edit p-0"
        onClick={openModal}
        variant="button"
        aria-label="Изменить задачу"
      >
        <EditOutlined className="task-item__icon task-item__icon--edit" />
      </Button>
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
