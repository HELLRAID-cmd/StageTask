import { Link } from "react-router-dom";
import { useProjects } from "../../Context/Context";

const HeaderMain = () => {
  const { projects } = useProjects();

  if (projects.length === 0) return null;

  return <Link to="myProject">Мои проекты</Link>;
};

export default HeaderMain;
