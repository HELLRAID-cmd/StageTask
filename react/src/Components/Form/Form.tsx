import { useState } from "react";
import History from "../History/History";
import "./Form.scss";

const Form = () => {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");

  const urlPattern =
    /^(https?:\/\/)?(([a-z0-9-]+\.)+[a-z]{2,10}|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/.*)?$/i;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!urlPattern.test(url)) {
      setErr("Неверный URL");
      return;
    }

    setErr("");
    console.log("Сокращено", url);
  };

  return (
    <div className="form-wrapper d-flex justify-content-center flex-column align-items-center vh-100">
      <form className="d-flex flex-column w-50 form" onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <label className="form-label fw-medium text-light" htmlFor="url">
            Сокращение URL
          </label>
          {err && <div className="invalid-feedback d-block">{err}</div>}
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
