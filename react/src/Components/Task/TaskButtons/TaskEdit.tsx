import { Dropdown, Input, Modal, type MenuProps } from "antd";
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
  const [activeAction, setActiveAction] = useState<"edit" | "deadline" | null>(
    null,
  );

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

  const onBlur = () => {
    setActiveAction(null);
    setEditTaskId(null);
    setErrLength(false);
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Изменить задачу",
    },
    {
      type: "divider",
    },
    {
      key: "deadline",
      label: "Изменить срок задачи",
    },
  ];

  const openItemDropdown: MenuProps["onClick"] = (e) => {
    const key = e.key as "edit" | "deadline";

    setActiveAction((prev) => (prev === key ? null : key));
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
        <Dropdown
          menu={{ items, onClick: openItemDropdown }}
          className=" text-black"
        >
          <a onClick={() => openItemDropdown}>
            <p className="task-item__dropdown-text text-black">Выберите что хотите изменить</p>
          </a>
        </Dropdown>
        {activeAction === "edit" ? (
          <>
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
              onBlur={onBlur}
            />
          </>
        ) : null}
        {activeAction === "deadline" ? <p>NULL</p> : null}
      </Modal>
    </>
  );
};

export default TaskEdit;
