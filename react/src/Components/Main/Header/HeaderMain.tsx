import { Link } from "react-router-dom";
import "./HeaderMain.scss";
import { useProject } from "../../Context/Project/ProjectContext";
import Button from "../../../shared/ui/button";

const HeaderMain = () => {
  const { projects } = useProject();

  const project = projects.length === 0;

  return (
    <header className="header-main">
      <div className="container">
        <div className="header-wrapper">
          <div className="header-logo">
            <Link
              className="header-logo-icon fw-bold"
              to="/"
              onClick={() => window.scrollTo(0, 0)}
            >
              STAGE TASK
            </Link>
          </div>
          {/* Если нет проектов убрать кнопку */}
          {!project && (
            <Button variant="link" href={"/myProject"}>
              Мои проекты
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
