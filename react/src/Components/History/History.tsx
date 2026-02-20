import "./History.scss";

const History = () => {
  return (
    <div className="history w-50">
      <ul className="history-list list-group border-5 rounded-3">
        <li className="history-list__item list-group-item align-items-center bg-transparent d-flex overflow-hidden">
          <a href="#!" className="link-item text-light ms-4">
            An item
          </a>
          <button className="history-list__btn ms-auto d-block align-content-center h-100 p-3">Скопировать</button>
        </li>
      </ul>
    </div>
  );
};

export default History;
