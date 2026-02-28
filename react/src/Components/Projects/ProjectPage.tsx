import { useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";
import NotFound from "../NotFound/NotFound";

const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) return <NotFound/>;

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project-top bg-primary rounded-3 p-2">
          <h1 className="project-title">{project.title}</h1>
        </div>
        <div style={{ padding: "20px" }}>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;