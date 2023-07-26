import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppComponent from "./components/AppComponent";

function App() {

  return (
          <BrowserRouter>
            <AppComponent/>
          </BrowserRouter>

  );
}

export default App;
