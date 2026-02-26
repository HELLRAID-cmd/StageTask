import { useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) return <p>Проект не найден</p>;

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project-top">
          <h1 className="project-title">{project.title}</h1>
        </div>
        <div style={{ padding: "20px" }}>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;