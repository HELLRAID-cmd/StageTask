import { DeleteOutlined } from "@ant-design/icons";
import { useProjects } from "../Context/Context";
import type { Project } from "../Utils/type";
import ModalDelete from "./ModalDelete";
import { useState } from "react";

const DeleteProject: React.FC<{ project: Project }> = ({ project }) => {
  const { setProjects } = useProjects();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== project.id);
      localStorage.setItem("projects", JSON.stringify(updated));
      return updated;
    });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="card-title__btn p-1"
        onClick={(e) => {
          setOpen(true);
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DeleteOutlined style={{ fontSize: "24px" }} />
      </button>
      <ModalDelete
        open={open}
        project={project}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteProject;
