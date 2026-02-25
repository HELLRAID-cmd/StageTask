import { Card } from "antd";
import { useProjects } from "../Context/Context";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  const { projects } = useProjects();

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <li className="project-item" key={project.id}>
          <Link to={`/project/${project.id}`}>
            <Card
              title={project.title}
              style={{ width: 300, background: project.colorCode }}
            >
              <p>{project.desc}</p>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
