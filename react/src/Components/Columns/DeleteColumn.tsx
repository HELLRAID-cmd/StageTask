import { useState } from "react";
import Button from "../../shared/ui/button";
import { Modal } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useColumns } from "../Context/Columns/ColumnsContext";
import type { Columns } from "../../shared/props/type";

const DeleteColumn: React.FC<{ column: Columns }> = ({ column }) => {
  const [open, setOpen] = useState(false);
  const { deleteColumn } = useColumns();

  const openModal = () => {
    setOpen(true);
  };

  const handleDeleteColumn = () => {
    deleteColumn(column.id);
  };

  return (
    <>
      <Button
        variant="button"
        onClick={openModal}
        className="columns-item__btn"
      >
        <DeleteOutlined />
      </Button>
      <Modal
        title="Вы действительно хотите удалить колонку?"
        open={open}
        cancelButtonProps={{ style: { backgroundColor: "red" } }}
        centered
        okText="Да"
        cancelText="Нет"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
        onOk={() => {
          handleDeleteColumn();
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

export default DeleteColumn;
