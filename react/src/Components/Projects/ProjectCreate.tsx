import ModalWindow from "../Modal/Modal";

const ProjectCreate = () => {
  return (
    <>
      <button
        className="project-top__create"
        aria-label="Создать проект"
        type="button"
      >
        <ModalWindow />
      </button>
    </>
  );
};

export default ProjectCreate;
