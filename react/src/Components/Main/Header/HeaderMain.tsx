import { Link } from "react-router-dom";
import "./HeaderMain.scss";
import { useProject } from "../../Context/Project/ProjectContext";
import CustomLink from "../../../shared/ui/Link";

type Props = {
  showProjectBtn?: boolean;
};

const HeaderMain = ({ showProjectBtn }: Props) => {
  const { projects } = useProject();

  const project = projects.length === 0;

  return (
    <header className="header">
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
          {showProjectBtn ? (
            <>
              {!project && (
                <CustomLink
                  to={"/myProject"}
                  className="header-project"
                  size="mini"
                >
                  Мои проекты
                </CustomLink>
              )}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
