import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global/_reset.scss";
import Form from "./Components/Form/Form";
import { UrlProvider } from './Components/Context/UrlContext';

function App() {
  return (
    <UrlProvider>
      <Form/>
    </UrlProvider>
  )
}

export default App
