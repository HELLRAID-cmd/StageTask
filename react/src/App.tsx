import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global/_reset.scss";
import "../styles/global/_typography.scss";
import "../styles/global/style.scss";
import "../styles/global/_antd.scss";
import "../styles/global/_container.scss";
import { BrowserRouter } from "react-router-dom";
import DndContextWrapper from "./Dnd";
import { Provider } from "./Components/Context/Provider";

function App() {

  return (
    <Provider>
      <BrowserRouter basename="/StageTask/">
        <DndContextWrapper/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
