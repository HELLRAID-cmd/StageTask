import { useEffect, useState } from "react";
import heroImg50 from "../../../assets/Hero/hero-img-50.png";
import "./Hero.scss";
import ProjectChecker from "../ProjectsChecker/ProjectsChecker";
import { useProject } from "../../Context/Project/ProjectContext";
import Button from "../../../shared/ui/button";

const Hero = () => {
  const { projects, isProjectsEmpty, errorAPI, loading } = useProject();
  const [showModal, setShowModal] = useState(false);
  let content;

  //* Если ошибка с сервером показать ошибку
  if (errorAPI) {
    content = <Button variant="errorAPI">{errorAPI}</Button>;
    //* Если нет проекта(ов) показать кнопку с созданием
  } else if (isProjectsEmpty) {
    content = (
      <Button variant="link" href={"/create"}>
        Создать проект
      </Button>
    );
    //* Если есть проекты показать кнопку с проектами
  } else {
    content = (
      <Button variant="link" href={"/myProject"}>
        Мои проекты
      </Button>
    );
  }

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
            <p className="hero-text__subtitle heading-secondary">
              Cоздавай задачи. <br /> Управляй процессом. Организуй проекты и
              держи всё под контролем.
            </p>
            {loading ? <p className="hero-text__loading">Загрузка...</p> : content}
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
