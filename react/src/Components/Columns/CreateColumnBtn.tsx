import { Input, Modal } from "antd";
import Button from "../../shared/ui/button";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MAX_TASK_TEXT } from "../Utils/Settings";
import { useColumns } from "../Context/Columns/ColumnsContext";

const CreateColumnBtn = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [errLength, setErrLength] = useState(false);
  const { createColumns } = useColumns();

  const openModal = () => {
    setOpen(true);
  };

  const handleCreateColumns = () => {
    createColumns({
      title: inputValueName,
      projectId: projectId,
    });

    setInputValueName("");
    setOpen(false);
  };

  return (
    <>
      <Button variant="add" onClick={openModal}>
        <PlusCircleOutlined style={{ fontSize: "40px" }} />
      </Button>
      <Modal
        title="Создание колонки"
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Изменить"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
        onOk={() => {
          handleCreateColumns();
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
      </Modal>
    </>
  );
};

export default CreateColumnBtn;
