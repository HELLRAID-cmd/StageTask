import { Link } from "react-router-dom";
import { useProjects } from "../../Context/Context";
import "./HeaderMain.scss";

const HeaderMain = () => {
  const { projects } = useProjects();

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
            <Link
              className="header-project btn rounded-2 text-light"
              to="myProject"
            >
              Мои проекты
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
