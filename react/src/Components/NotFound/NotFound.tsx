import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="sect-notfound">
      <div className="container">
        <div className="notfound">
          <img
            className="notfound-img"
            src="/notFound/notFound.png"
            width={300}
            height={300}
            alt="Страница не найдена"
          />
          <h1 className="notfound-title">Ой такой странице не существует!</h1>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
