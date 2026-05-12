import { Dropdown, Input, Modal, type MenuProps } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { DATE_UTILS, MAX_TASK_TEXT } from "../../Utils/Settings";
import { useTask } from "../../Context/Task/TaskContext";
import Button from "../../../shared/ui/button";

const TaskEdit = ({ input, taskId }: { input: string; taskId: string }) => {
  const [inputTask, setInputTask] = useState(input);
  const [open, setOpen] = useState(false);
  const {
    updateTaskTitle,
    updateTaskDate,
    setEditTaskId,
    saveHistoryTask,
    getTask,
  } = useTask();
  const [errLength, setErrLength] = useState(false);
  const [activeAction, setActiveAction] = useState<"edit" | "deadline" | null>(
    null,
  );
  const [inputDate, setInputDate] = useState<string>("");

  const task = getTask(taskId);

  const openModal = () => {
    setOpen(true);
  };

  const handleSave = () => {
    if (!activeAction || activeAction === "edit") {
      if (inputTask.length >= MAX_TASK_TEXT) return;

      updateTaskTitle(taskId, inputTask);
      saveHistoryTask(taskId, {
        type: "renamed",
        date: Date.now(),
        oldTitle: task?.title,
        newTitle: inputTask,
      });

      console.log("Задача изменена");
      setEditTaskId(null);
      setErrLength(false);
      setOpen(false);
    }

    // Срок задачи
    if (activeAction === "deadline") {
      if (!inputDate) return;
      console.log("Срок задачи изменен");

      updateTaskDate(taskId, inputDate);
      saveHistoryTask(taskId, {
        type: "deadline",
        date: Date.now(),
        dueData: inputDate,
      });

      setEditTaskId(null);
      setErrLength(false);
      console.log("Срок задачи изменен");
      setOpen(false);
    }
  };

  // const onBlur = () => {
  //   setActiveAction(null);
  //   setEditTaskId(null);
  //   setErrLength(false);
  //   setOpen(false);
  // };

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

  useEffect(() => {
    if (task?.dueData) {
      setInputDate(task.dueData);
    }
  }, [task]);

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
        {/* Если есть срок задачи показывать Dropdown */}
        {task?.dueData ? (
          <>
            <Dropdown
              menu={{ items, onClick: openItemDropdown }}
              className=" text-black"
            >
              <a onClick={() => openItemDropdown}>
                <p className="task-item__dropdown-text text-black">
                  Выберите что хотите изменить
                </p>
              </a>
            </Dropdown>
            {activeAction === "deadline" ? (
              <>
                {/* {inputTask.length >= MAX_TASK_TEXT && (
                  <p className="text-danger">Слишком большой текст!</p>
                )} */}
                <Input
                  id="name"
                  type={"date"}
                  min={DATE_UTILS.todayISO()}
                  placeholder="Введите срок задачи"
                  value={inputDate}
                  onChange={(e) => {
                    setInputDate(e.target.value);
                    if (errLength) setErrLength(false);
                  }}
                  onPressEnter={handleSave}
                  // onBlur={onBlur}
                />
              </>
            ) : null}
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
                  // onBlur={onBlur}
                />
              </>
            ) : null}
          </>
        ) : (
          // Иначе просто показать input
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
              // onBlur={onBlur}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default TaskEdit;
