import "./Form.scss"

const Form = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="d-flex flex-column w-50 form">
        <div className="mb-3 text-center">
          <label className="form-label fw-medium text-light" htmlFor="url">
            Сокращение URL
          </label>
          <input
            type="text"
            id="url"
            className="form-control"
            aria-describedby="URL"
            placeholder="Вставьте URL адрес"
          />
        </div>
        <div className="form-btns btns d-grid gap-4 row-gap-3 justify-content-center">
          <button type="submit" className="btn btn-danger text-light mt-2 col">
            Сократить URL
          </button>
          <button type="submit" className="btn btn-primary text-light mt-2 col p-3">
            Скопировать
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;