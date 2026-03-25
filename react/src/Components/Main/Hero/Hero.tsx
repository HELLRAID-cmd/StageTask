import { useEffect, useState } from "react";
import heroImg50 from "../../../assets/Hero/hero-img-50.png";
import { useProjects } from "../../Context/Context";
import "./Hero.scss";
import { Link } from "react-router-dom";
import ProjectChecker from "../ProjectsChecker/ProjectsChecker";

const Hero = () => {
  const { projects, isProjectsEmpty } = useProjects();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showAt = localStorage.getItem("projectCheckerShown");
    const now = Date.now();
    const cooldown = 2 * 60 * 1000;

    if (!showAt || now - parseInt(showAt) > cooldown) {
      const timer = setTimeout(() => {
        if (projects.length >= 1) {
          setShowModal(true);
          localStorage.setItem("projectCheckerShown", now.toString());
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [projects]);

  return (
    <section className="sect-hero">
      <div className="container">
        <div className="hero page page-p-100">
          <div className="hero-text">
            <h1 className="hero-text__title heading-primary">
              Выполняй задачи с&nbsp;Stage Task
            </h1>
            <h2 className="hero-text__subtitle heading-secondary">
              Организуй проекты. <br /> Управляй процессом.
              Достигай результата.
            </h2>
            {isProjectsEmpty ? (
              <Link
                className="hero-text__btn btn rounded-2 text-light"
                to="/create"
              >
                Создать проект
              </Link>
            ) : (
              <Link
                className="hero-text__btn btn rounded-2 text-light"
                to="/myProject"
              >
                Мои проекты
              </Link>
            )}
          </div>
          <div className="hero-image">
            <img src={heroImg50} alt="Фото проекта" />
          </div>
        </div>
      </div>
      {showModal && (
        <ProjectChecker openModal={showModal} setOpenModal={setShowModal} />
      )}
    </section>
  );
};

export default Hero;
