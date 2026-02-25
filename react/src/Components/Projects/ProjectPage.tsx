import { useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) return <p>Проект не найден 😢</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{project.title}</h2>
      <p>{project.desc}</p>

    </div>
  );
};

export default ProjectPage;