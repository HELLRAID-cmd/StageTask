import { useUrl } from "../Context/useUrl";
import useCopyToClipboard from "../Utils/useCopyToClipboard";
import "./History.scss";

const History = () => {
  const { urlHistory, setUrlHistory } = useUrl();

  const copyClip = useCopyToClipboard();

  const deleteItem = (id: number) => {
    setUrlHistory((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div className="history w-50 mb-5">
      <ul className="history-list list-group border-5 rounded-3">
        {urlHistory.map((url, index) => (
          <li
            className="history-list__item list-group-item align-items-center bg-transparent d-flex overflow-hidden"
            key={index}
          >
            <a
              href="#!"
              className="link-item text-light w-100 d-block p-3"
              target="_blank"
            >
              {url}
            </a>
            <button
              className="history-list__btn ms-auto d-block align-content-center h-100 p-3"
              onClick={() => copyClip(url)}
            >
              Скопировать
            </button>
            <button
              className="history-list__btn ms-auto d-block align-content-center bg-danger h-100 p-3"
              onClick={() => deleteItem(index)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
