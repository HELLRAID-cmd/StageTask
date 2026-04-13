import "./About.scss";

const About = () => {
  return (
    <section className="sect-about">
      <div className="container">
        <div className="about page">
          <div className="about-text">
            <h2 className="about-text__title heading-secondary text-dark fw-bold">О проекте</h2>
            <div className="about-text__info">
              <p className="about-info__desc lead m-0 text-dark">
                Stage Task&nbsp;&mdash; это учебный проект, созданный для
                практики разработки веб-приложений.
              </p>
              <p className="about-info__desc lead m-0 text-dark">
                Приложение позволяет создавать проекты, добавлять задачи
                и&nbsp;отслеживать их&nbsp;выполнение. Основной упор сделан
                на&nbsp;удобство использования и&nbsp;понятный интерфейс.
              </p>
              <p className="about-info__desc lead m-0 text-dark">
                В&nbsp;процессе разработки были использованы современные
                технологии и&nbsp;подходы, включая работу с&nbsp;состоянием,
                роутингом и&nbsp;хранением данных в&nbsp;браузере.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
