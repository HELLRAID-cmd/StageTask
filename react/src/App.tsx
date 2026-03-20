import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global/_reset.scss";
import "../styles/global/_typography.scss";
import "../styles/global/style.scss";
import "../styles/global/_antd.scss";
import "../styles/global/_container.scss";
import { ProjectProvider } from "./Components/Context/Context";
import { BrowserRouter } from "react-router-dom";
import DndContextWrapper from "./Dnd";

function App() {

  return (
    <ProjectProvider>
      <BrowserRouter basename="/StageTask/">
        <DndContextWrapper/>
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
