import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global/_reset.scss";
import { Provider } from './Components/Context/Context';
import Task from './Components/Task/Task';

function App() {
  return (
    <Provider>
      <Task/>
    </Provider>
  )
}

export default App
