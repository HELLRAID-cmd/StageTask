import { Modal } from "antd";
import Button from "../../../shared/ui/button";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const CreateColumnBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="add">
        <PlusCircleOutlined style={{ fontSize: "40px" }} />
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
          // handleSave();
        }}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
      ></Modal>
    </>
  );
};

export default CreateColumnBtn;
