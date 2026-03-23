import "./NotFound.scss";
import notFoundImg from "../../assets/notFound/notFound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="sect-notfound">
      <div className="container">
        <div className="notfound">
          <div className="notFound-top">
            <img
              className="notfound-top__img"
              src={notFoundImg}
              width={300}
              height={300}
              alt="Страница не найдена"
            />
            <h1 className="notfound-top__title">
              Ой, такой страницы не существует!
            </h1>
          </div>
          <div className="notfound-bottom">
            <Link className="notfound-bottom__link main" to={"/"}>
              Вернуться к главной страницы
            </Link>
            <Link className="notfound-bottom__link" to={"/myProject"}>
              Вернуться к проектам
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
