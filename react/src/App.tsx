import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global/_reset.scss";
import "../styles/global/_antd.scss";
import "../styles/global/_container.scss";
import { ProjectProvider } from "./Components/Context/Context";
import { BrowserRouter as Router } from "react-router-dom";
import DndContextWrapper from "./Dnd";

function App() {

  return (
    <ProjectProvider>
      <Router basename="/StageTask">
        <DndContextWrapper/>
      </Router>
    </ProjectProvider>
  );
}

export default App;
