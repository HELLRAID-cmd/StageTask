import { DeleteOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import type { DeleteProps } from "../Utils/type";
import ModalDelete from "./ModalDelete";
import { useState } from "react";

const DeleteProject: React.FC<DeleteProps> = ({ id }) => {
  const { setProjects } = useProjects();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setProjects((prev) => {
      const updated = prev.filter((project) => project.id !== id);
      localStorage.setItem("projects", JSON.stringify(updated));
      return updated;
    });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="card-title__btn"
        onClick={(e) => {
          setOpen(true);
          e.stopPropagation();
          e.preventDefault();
          console.log("asd");
        }}
      >
        <DeleteOutlined style={{ fontSize: "24px" }} />
      </button>
      <ModalDelete
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteProject;
