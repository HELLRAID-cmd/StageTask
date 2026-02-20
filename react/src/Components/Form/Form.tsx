import { useState } from "react";
import History from "../History/History";
import "./Form.scss";
import { useUrl } from "../Context/useUrl";
import useCopyToClipboard from "../Utils/useCopyToClipboard";

const Form = () => {
  const { url, setUrl, copy, setUrlHistory } = useUrl();
  const [err, setErr] = useState("");
  const [timerErr, setTimerErr] = useState(false);

  const urlPattern =
    /^(https?:\/\/)?(([a-z0-9-]+\.)+[a-z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/.*)?$/i;

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!urlPattern.test(url)) {
      setErr("Неверный URL");
      setTimerErr(true);

      setTimeout(() => {
        setTimerErr(false);
      }, 3000);

      return;
    }

    setUrlHistory(prev => [...prev, url]);
    setErr("");
    console.log("Сокращено", url);
  };

  // Копировать ссылку
  const copyClip = useCopyToClipboard();

  return (
    <div className="form-wrapper d-flex justify-content-center flex-column align-items-center vh-100">
      <form className="d-flex flex-column w-50 form" onSubmit={handleSubmit}>
        <div className="form-inner mb-3 text-center">
          <label className="form-label fw-medium text-light" htmlFor="url">
            Сокращение URL
          </label>
          {timerErr && (
            <div className="form-error invalid-feedback d-block text-danger p-2 bg-white w-25 rounded-2">
              {err}
            </div>
          )}
          {copy && (
            <div className="form-error invalid-feedback d-block text-primary p-2 bg-white w-25 rounded-2">
              Скопировано
            </div>
          )}
          <input
            type="text"
            id="url"
            className="form-control"
            placeholder="Вставьте URL адрес"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-btns btns d-grid gap-4 row-gap-3 justify-content-center">
          <button type="submit" className="btn btn-danger text-light mt-2 col">
            Сократить URL
          </button>
          <button
            type="button"
            className="btn btn-primary text-light mt-2 col p-3"
            onClick={() => copyClip(url)}
          >
            Скопировать
          </button>
        </div>
      </form>

      <History />
    </div>
  );
};

export default Form;
